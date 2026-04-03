import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(key);

  const { items } = await req.json() as {
    items: { id: string; name: string; price: number; quantity: number; image?: string }[];
  };

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: items.map((item) => ({
      price_data: {
        currency: "eur",
        product_data: { name: item.name, ...(item.image ? { images: [item.image] } : {}) },
        unit_amount: item.price,
      },
      quantity: item.quantity,
    })),
    success_url: `${req.nextUrl.origin}/success`,
    cancel_url: `${req.nextUrl.origin}/?canceled=true`,
  });

  return NextResponse.json({ url: session.url });
}
