import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
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
