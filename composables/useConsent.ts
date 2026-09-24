const STORAGE_KEY = 'klimb-cookie-consent'

export type ConsentChoice = 'accepted' | 'declined' | null

// Shared, reactive consent state. Persisted to localStorage so the choice
// survives reloads, and exposed through useState so every component (the banner,
// the footer link, the analytics loader) reads the same value.
export function useConsent() {
  const choice = useState<ConsentChoice>('cookie-consent', () => null)

  function load() {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      choice.value = stored === 'accepted' || stored === 'declined' ? stored : null
    } catch {
      choice.value = null
    }
  }

  function set(next: 'accepted' | 'declined') {
    choice.value = next
    try {
      localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* storage unavailable — keep the choice for this session only */
    }
  }

  function reset() {
    choice.value = null
    try {
      localStorage.removeItem(STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }

  const hasDecided = computed(() => choice.value !== null)
  const analyticsAllowed = computed(() => choice.value === 'accepted')

  return { choice, hasDecided, analyticsAllowed, load, set, reset }
}
