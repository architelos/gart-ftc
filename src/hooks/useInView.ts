import { useEffect, useRef, useState } from "react";

interface UseInViewOptions {
  threshold?: number;
  rootMargin?: string; // for gallery nonsense
  once?: boolean;
}

function useInView(options: UseInViewOptions = {}) {
  const { threshold = 0.3, rootMargin = "0px", once = true } = options;

  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const wasInView = useRef(false);

  useEffect(() => {
    if (!ref.current) return;

    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (once && wasInView.current) return;

        setInView(entry.isIntersecting);

        if (entry.isIntersecting && once) {
          wasInView.current = true;
          if (ref.current) observer.unobserve(ref.current);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(ref.current);

    return () => observer.disconnect();
  }, [threshold, rootMargin, once]);

  return { ref, inView };
}

export default useInView;
