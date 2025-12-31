import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { PRICING_TIERS } from '@/types/pricing';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-06-20',
});

export async function POST(request: Request) {
  try {
    const { tier, userId, email, resultId } = await request.json();

    const tierData = PRICING_TIERS.find((t) => t.tier === tier);
    if (!tierData || tierData.price === 0) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: `PathFinder ${tierData.name}`,
              description: tierData.tagline,
            },
            unit_amount: Math.round(tierData.price * 100),
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_URL}/results/${resultId}?upgraded=true&tier=${tier}`,
      cancel_url: `${process.env.NEXT_PUBLIC_URL}/pricing?cancelled=true`,
      customer_email: email,
      metadata: {
        userId,
        tier,
        resultId,
      },
    });

    return NextResponse.json({ sessionId: session.id, url: session.url });
  } catch (error) {
    console.error('Stripe error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
