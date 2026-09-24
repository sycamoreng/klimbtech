const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function json(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    if (req.method !== "POST") {
      return json({ error: "Method not allowed" }, 405);
    }

    const { name, work_email, enquiry_type } = await req.json().catch(() => ({}));

    if (typeof work_email !== "string" || !EMAIL_RE.test(work_email.trim())) {
      return json({ error: "A valid email is required" }, 400);
    }

    const isConsulting = enquiry_type === "consulting";
    const safeName = escapeHtml(typeof name === "string" && name.trim() ? name.trim().split(/\s+/)[0] : "there");
    const subject = isConsulting
      ? "We've received your consultation request — Klimb"
      : "We've received your demo request — Klimb";
    const intro = isConsulting
      ? "Thanks for reaching out about a technology consultation."
      : "Thanks for requesting a product demo.";

    const apiKey = Deno.env.get("RESEND_API_KEY");
    if (!apiKey) {
      // Pipeline is wired but no email provider key is configured yet.
      return json({ sent: false, reason: "email_not_configured" });
    }

    const from = Deno.env.get("CONFIRMATION_FROM") ?? "Klimb <onboarding@resend.dev>";
    const html = `
      <div style="font-family:ui-sans-serif,system-ui,Arial,sans-serif;max-width:520px;margin:0 auto;color:#0f172a">
        <h1 style="font-size:20px;margin:0 0 16px">Hi ${safeName},</h1>
        <p style="font-size:15px;line-height:1.6;color:#334155">${intro}</p>
        <p style="font-size:15px;line-height:1.6;color:#334155">
          A member of the Klimb team will get back to you shortly. If you need to add anything in the meantime,
          just reply to this email.
        </p>
        <p style="font-size:15px;line-height:1.6;color:#334155;margin-top:24px">— The Klimb team</p>
      </div>`;

    const resp = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [work_email.trim()],
        subject,
        html,
      }),
    });

    if (!resp.ok) {
      const detail = await resp.text().catch(() => "");
      return json({ sent: false, reason: "provider_error", detail }, 502);
    }

    return json({ sent: true });
  } catch (err) {
    return json({ error: err instanceof Error ? err.message : "Unexpected error" }, 500);
  }
});
