'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

export default function ArtworkModal({ work, onClose }) {
    const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
    const [isCheckingOut, setIsCheckingOut] = useState(false);
    const [checkoutError, setCheckoutError] = useState(null);
    const isOpen = Boolean(work);

    useEffect(() => {
        setSelectedSizeIndex(0);
        setCheckoutError(null);
    }, [work]);

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Escape') onClose();
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [onClose]);

    const selectedSize = work?.sizes[selectedSizeIndex];

    const handleBuyNow = async () => {
        if (!work) return;
        setIsCheckingOut(true);
        setCheckoutError(null);
        try {
            const res = await fetch('/api/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ workId: work.id, sizeIndex: selectedSizeIndex }),
            });
            const data = await res.json();
            if (!res.ok || !data.url) {
                throw new Error(data.error || 'Unable to start checkout');
            }
            window.location.href = data.url;
        } catch (err) {
            setCheckoutError(err.message);
            setIsCheckingOut(false);
        }
    };

    const mailtoHref = work
        ? work.available
            ? `mailto:jadon@jadonschwahn.com?subject=${encodeURIComponent(`Inquiry: ${work.title} (${selectedSize?.label ?? ''})`)}`
            : 'mailto:jadon@jadonschwahn.com?subject=Commission Inquiry'
        : undefined;

    return (
        <div
            className={`modal-backdrop${isOpen ? ' open' : ''}`}
            aria-modal="true"
            role="dialog"
            aria-label="Artwork detail"
            onClick={(e) => {
                if (e.target === e.currentTarget) onClose();
            }}
        >
            <div className="modal">
                <div className="modal-artwork">
                    {work && (
                        work.image?.url ? (
                            <Image
                                src={work.image.url}
                                alt={work.image.alt || work.title}
                                width={work.image.width || 1200}
                                height={work.image.height || 1200}
                                sizes="(max-width: 900px) 100vw, 50vw"
                                style={{ width: '100%', height: 'auto', maxHeight: '85vh', objectFit: 'contain' }}
                                priority
                            />
                        ) : (
                            <svg
                                viewBox={work.svgViewBox}
                                xmlns="http://www.w3.org/2000/svg"
                                dangerouslySetInnerHTML={{ __html: work.svgContent }}
                            />
                        )
                    )}
                </div>
                <div className="modal-info">
                    <button className="modal-close" aria-label="Close" onClick={onClose}>✕</button>
                    <p className="modal-eyebrow">Selected Work</p>
                    <h2 className="modal-title">{work?.title}</h2>
                    {work && (
                        <>
                            <div className="modal-specs">
                                <div className="modal-spec">
                                    <span className="modal-spec-label">Medium</span>
                                    <span className="modal-spec-value">{work.medium}</span>
                                </div>
                                <div className="modal-spec">
                                    <span className="modal-spec-label">Year</span>
                                    <span className="modal-spec-value">{work.year}</span>
                                </div>
                                <div className="modal-spec" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '0.6rem' }}>
                                    <span className="modal-spec-label">Size</span>
                                    <div className="size-options">
                                        {work.sizes.map((size, i) => (
                                            <button
                                                key={size.label}
                                                className={`size-btn${i === selectedSizeIndex ? ' active' : ''}`}
                                                onClick={() => setSelectedSizeIndex(i)}
                                            >
                                                {size.label}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <p className="modal-description">{work.description}</p>
                            <div className="modal-availability">
                                <span className={`avail-dot${work.available ? '' : ' sold'}`} />
                                <span>{work.available ? 'Available' : 'Sold — Private Collection'}</span>
                            </div>
                            <p className="modal-price">{selectedSize?.price}</p>
                            <p className="modal-price-note">{work.priceNote}</p>
                            {checkoutError && <p className="modal-checkout-error">{checkoutError}</p>}
                            {work.available && (
                                <button className="modal-cta" onClick={handleBuyNow} disabled={isCheckingOut}>
                                    {isCheckingOut ? 'Redirecting to checkout…' : 'Buy Now'}
                                </button>
                            )}
                            <a href={mailtoHref} className={work.available ? 'modal-cta-secondary' : 'modal-cta'}>
                                {work.available ? 'Inquire About This Work' : 'Commission a Similar Work'}
                            </a>
                            <button className="modal-cta-secondary" onClick={onClose}>Back to Portfolio</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
