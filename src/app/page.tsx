"use client";

import { useState, useCallback } from "react";
import { products } from "@/data/products";
import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = products[activeIndex];

  const handleProductChange = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  return (
    <main className="relative">
      <Nav />
      <HeroSection
        product={activeProduct}
        products={products}
        activeIndex={activeIndex}
        onProductChange={handleProductChange}
      />
      <CartDrawer />
    </main>
  );
}
