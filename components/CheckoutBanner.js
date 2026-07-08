'use client';

import { useSearchParams } from 'next/navigation';

export default function CheckoutBanner() {
    const checkout = useSearchParams().get('checkout');

    if (checkout === 'success') {
        return (
            <p className="checkout-banner checkout-banner-success">
                Thank you — your purchase is confirmed. We&apos;ll be in touch about delivery shortly.
            </p>
        );
    }

    if (checkout === 'cancelled') {
        return (
            <p className="checkout-banner checkout-banner-cancelled">
                Checkout was cancelled — no payment was made.
            </p>
        );
    }

    return null;
}
