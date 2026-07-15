'use client';

import { useEffect, useRef, useState } from 'react';

// Reveals an element (fade + slide up) the first time it scrolls into view.
// Plain IntersectionObserver keeps this dependency-free and cheap for a
// gallery grid with a couple dozen items.
export default function useScrollReveal({ threshold = 0.15, rootMargin = '0px 0px -10% 0px' } = {}) {
    const ref = useRef(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        if (typeof IntersectionObserver === 'undefined' || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            setIsVisible(true);
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.unobserve(node);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold, rootMargin]);

    return [ref, isVisible];
}
