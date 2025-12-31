import { NextResponse } from 'next/server';
import { PRICING_TIERS } from '@/types/pricing';

const LEMONSQUEEZY_API_URL = 'https://api.lemonsqueezy.com/v1';

export async function POST(request: Request) {
  try {
    const { tier, userId, email, resultId } = await request.json();

    const tierData = PRICING_TIERS.find((t) => t.tier === tier);
    if (!tierData || tierData.price === 0) {
      return NextResponse.json({ error: 'Invalid tier' }, { status: 400 });
    }

    // Get the variant ID for this tier from environment variables
    const variantIds: Record<string, string> = {
      basic: process.env.LEMONSQUEEZY_VARIANT_BASIC || '',
      premium: process.env.LEMONSQUEEZY_VARIANT_PREMIUM || '',
      professional: process.env.LEMONSQUEEZY_VARIANT_PROFESSIONAL || '',
      executive: process.env.LEMONSQUEEZY_VARIANT_EXECUTIVE || '',
    };

    const variantId = variantIds[tier];
    if (!variantId) {
      return NextResponse.json({ error: 'Variant not configured' }, { status: 400 });
    }

    // Create Lemon Squeezy checkout
    const response = await fetch(`${LEMONSQUEEZY_API_URL}/checkouts`, {
      method: 'POST',
      headers: {
        'Accept': 'application/vnd.api+json',
        'Content-Type': 'application/vnd.api+json',
        'Authorization': `Bearer ${process.env.LEMONSQUEEZY_API_KEY}`,
      },
      body: JSON.stringify({
        data: {
          type: 'checkouts',
          attributes: {
            checkout_data: {
              email: email,
              custom: {
                user_id: userId,
                result_id: resultId,
                tier: tier,
              },
            },
            product_options: {
              redirect_url: `${process.env.NEXT_PUBLIC_URL}/results/${resultId}?upgraded=true&tier=${tier}`,
            },
          },
          relationships: {
            store: {
              data: {
                type: 'stores',
                id: process.env.LEMONSQUEEZY_STORE_ID,
              },
            },
            variant: {
              data: {
                type: 'variants',
                id: variantId,
              },
            },
          },
        },
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.error('Lemon Squeezy error:', data);
      return NextResponse.json(
        { error: 'Failed to create checkout' },
        { status: 500 }
      );
    }

    const checkoutUrl = data.data.attributes.url;

    return NextResponse.json({ url: checkoutUrl });
  } catch (error) {
    console.error('Checkout error:', error);
    return NextResponse.json(
      { error: 'Failed to create checkout session' },
      { status: 500 }
    );
  }
}
