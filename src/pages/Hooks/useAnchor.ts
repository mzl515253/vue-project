export default function useAnchor(_containerId?: string) {
  const scrollToRef = (refId: string) => {
    if (typeof document === 'undefined') return // SSR 兼容

    const ref = document.getElementById(refId)
    if (ref) {
      ref.scrollIntoView({ behavior: 'smooth' })
    } else {
      console.warn('scrollToRef: element not found for id:', refId)
    }
  }

  return {
    scrollToRef
  }
}
