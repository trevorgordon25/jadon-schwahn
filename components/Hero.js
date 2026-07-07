'use client';

import { useState } from 'react';

const HERO_IMAGE = 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1800&q=80';

export default function Hero() {
    const [loaded, setLoaded] = useState(false);

    return (
        <section className="hero">
            <div
                className={`hero-bg${loaded ? ' loaded' : ''}`}
                style={{ backgroundImage: `url('${HERO_IMAGE}')` }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
                src={HERO_IMAGE}
                alt=""
                onLoad={() => setLoaded(true)}
                style={{ display: 'none' }}
            />
            <div className="hero-overlay" />
            <p className="hero-eyebrow">Painter &amp; Draftsman — Bozeman, MT</p>
            <h1 className="hero-title">Jadon<br /><em>Schwahn</em></h1>
            <p className="hero-subtitle">Works in oil, graphite, and charcoal — exploring light, stillness, and the weight of ordinary things.</p>
            <div className="hero-scroll">
                <span>Scroll</span>
                <div className="scroll-line" />
            </div>
        </section>
    );
}
