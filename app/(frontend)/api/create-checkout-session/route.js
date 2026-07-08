import { NextResponse } from 'next/server';
import { stripe, parsePriceToCents } from '@/lib/stripe';
import { getWorkById } from '@/lib/payload';

export async function POST(request) {
    const { workId, sizeIndex } = await request.json();

    if (!workId || typeof sizeIndex !== 'number') {
        return NextResponse.json({ error: 'workId and sizeIndex are required' }, { status: 400 });
    }

    const work = await getWorkById(workId);
    if (!work || !work.available) {
        return NextResponse.json({ error: 'This work is not available for purchase' }, { status: 404 });
    }

    const size = work.sizes?.[sizeIndex];
    const unitAmount = size ? parsePriceToCents(size.price) : null;
    if (!size || !unitAmount) {
        return NextResponse.json({ error: 'Invalid size selection' }, { status: 400 });
    }

    const origin = request.headers.get('origin') || new URL(request.url).origin;
    const imageUrl = work.image?.url
        ? (work.image.url.startsWith('http') ? work.image.url : `${origin}${work.image.url}`)
        : undefined;

    const session = await stripe.checkout.sessions.create({
        mode: 'payment',
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    unit_amount: unitAmount,
                    product_data: {
                        name: `${work.title} — ${size.label}`,
                        images: imageUrl ? [imageUrl] : undefined,
                    },
                },
                quantity: 1,
            },
        ],
        success_url: `${origin}/?checkout=success&work=${work.id}`,
        cancel_url: `${origin}/?checkout=cancelled&work=${work.id}`,
        metadata: {
            workId: String(work.id),
            sizeLabel: size.label,
        },
    });

    return NextResponse.json({ url: session.url });
}
