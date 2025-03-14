import { useEffect, useState, useRef, RefObject } from 'react';
import { animationConfig } from '../utils/config';

interface ScrollAnimationOptions {
  threshold?: number;
  once?: boolean;
  rootMargin?: string;
  animateWhenVisible?: boolean;
}

/**
 * Custom hook for handling scroll-based animations
 * Uses Intersection Observer API for better performance
 */
export const useScrollAnimation = <T extends HTMLElement = HTMLDivElement>({
  threshold = animationConfig.intersectionObserver.threshold,
  once = animationConfig.intersectionObserver.once,
  rootMargin = animationConfig.intersectionObserver.rootMargin,
  animateWhenVisible = true
}: ScrollAnimationOptions = {}): [RefObject<T | null>, boolean] => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<T | null>(null);

  useEffect(() => {
    // Skip if animations are disabled or reduced motion is preferred
    if (!animationConfig.enabled || animationConfig.performance.reducedMotion) {
      setIsVisible(true);
      return;
    }

    const currentRef = ref.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update visibility state based on intersection
        const isIntersecting = entry.isIntersecting;
        
        if (animateWhenVisible) {
          setIsVisible(isIntersecting);
        } else {
          // If we only want to animate once when element becomes visible
          if (isIntersecting) {
            setIsVisible(true);
            
            // Disconnect observer if we only want to animate once
            if (once) {
              observer.disconnect();
            }
          }
        }
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold, rootMargin, once, animateWhenVisible]);

  return [ref, isVisible];
};

export default useScrollAnimation;
