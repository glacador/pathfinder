import { NextResponse } from 'next/server';
import { headers } from 'next/headers';
import crypto from 'crypto';

// Verify Lemon Squeezy webhook signature
function verifySignature(payload: string, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac('sha256', secret);
  const digest = hmac.update(payload).digest('hex');
  return crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(digest));
}

export async function POST(request: Request) {
  const body = await request.text();
  const headersList = headers();
  const signature = headersList.get('x-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  // Verify webhook signature
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET || '';
  if (!verifySignature(body, signature, secret)) {
    console.error('Webhook signature verification failed');
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const event = JSON.parse(body);
  const eventName = event.meta.event_name;

  // Handle order completed event
  if (eventName === 'order_created') {
    const customData = event.meta.custom_data || {};
    const { user_id: userId, tier, result_id: resultId } = customData;

    // Update user's tier in your database
    console.log(`User ${userId} upgraded to ${tier} for result ${resultId}`);

    // TODO: Implement your database update logic here
    // await updateUserTier(userId, tier);

    // TODO: Send confirmation email
    // const customerEmail = event.data.attributes.user_email;
    // await sendUpgradeEmail(customerEmail, tier, resultId);
  }

  // Handle subscription events if needed
  if (eventName === 'subscription_created') {
    // Handle subscription creation
  }

  if (eventName === 'subscription_cancelled') {
    // Handle subscription cancellation
  }

  return NextResponse.json({ received: true });
}
