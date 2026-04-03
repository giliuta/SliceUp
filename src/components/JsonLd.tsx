import { products, formatPrice } from "@/data/products";

export default function JsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "SliceUp",
    url: "https://sliceup.cy",
    description: "Premium dehydrated fruits and vegetables from Cyprus",
    address: { "@type": "PostalAddress", addressLocality: "Limassol", addressCountry: "CY" },
    contactPoint: { "@type": "ContactPoint", email: "hello@sliceup.cy" },
  };

  const productSchemas = products.slice(0, 6).map((p) => ({
    "@context": "https://schema.org",
    "@type": "Product",
    name: `SliceUp ${p.name}`,
    description: p.description,
    image: `https://sliceup.cy${p.images.pack}`,
    brand: { "@type": "Brand", name: "SliceUp" },
    offers: {
      "@type": "Offer",
      price: (p.price / 100).toFixed(2),
      priceCurrency: "EUR",
      availability: p.inStock ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
    },
  }));

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      {productSchemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}
    </>
  );
}
