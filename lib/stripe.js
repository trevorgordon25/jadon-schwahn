import Stripe from 'stripe';

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export function parsePriceToCents(priceText) {
    const numeric = Number(String(priceText).replace(/[^0-9.]/g, ''));
    if (!Number.isFinite(numeric)) return null;
    return Math.round(numeric * 100);
}
