import { useEffect, useRef, useState } from "react";

export function useInView(threshold = 0.2) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold },
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}
