import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';
import { markWorkSold } from '@/lib/payload';

export async function POST(request) {
    const signature = request.headers.get('stripe-signature');
    const payloadText = await request.text();

    let event;
    try {
        event = stripe.webhooks.constructEvent(payloadText, signature, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return NextResponse.json({ error: `Webhook signature verification failed: ${err.message}` }, { status: 400 });
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const workId = session.metadata?.workId;
        if (workId) {
            await markWorkSold(workId);
        }
    }

    return NextResponse.json({ received: true });
}
