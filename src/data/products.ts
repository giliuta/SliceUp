// src/data/products.ts
// SliceUp — Product Catalog (14 SKUs matching real pack photos)

export interface ProductTheme {
  background: string;
  backgroundDark: string;
  accent: string;
}

export interface ProductVideo {
  webm: string;
  mp4: string;
}

export interface ProductImages {
  pack: string;
  ingredients: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  weight: string;
  category: 'fruit' | 'vegetable' | 'citrus' | 'spice';
  theme: ProductTheme;
  video: ProductVideo;
  images: ProductImages;
  inStock: boolean;
  emoji: string;
  stripeProductId: string;
  stripePriceId: string;
}

export const products: Product[] = [
  {
    id: 'dragon-fruit',
    slug: 'dragon-fruit',
    name: 'Dragon Fruit',
    subtitle: 'Exotic Collection',
    description: 'Vivid pink dragon fruit chips with a delicate, mildly sweet flavor. A stunning superfood snack packed with antioxidants.',
    price: 1800,
    compareAtPrice: 2400,
    weight: '100g',
    category: 'fruit',
    theme: {
      background: '#C2185B',
      backgroundDark: '#9B1348',
      accent: '#FCE4EC',
    },
    video: { webm: '/videos/dragon-fruit.webm', mp4: '/videos/dragon-fruit.mp4' },
    images: { pack: '/images/products/pht-1.webp', ingredients: [] },
    inStock: true,
    emoji: '🐉',
    stripeProductId: '',
    stripePriceId: '',
  },
  {
    id: 'beetroot-chips',
    slug: 'beetroot-chips',
    name: 'Beetroot',
    subtitle: 'Veggie Collection',
    description: 'Vibrant beetroot chips — earthy, crunchy, and packed with antioxidants. A superfood snack with stunning natural color.',
    price: 1200,
    compareAtPrice: 1600,
    weight: '100g',
    category: 'vegetable',
    theme: {
      background: '#6B1D3B',
      backgroundDark: '#561830',
      accent: '#F5D6E3',
    },
    video: { webm: '/videos/beetroot.webm', mp4: '/videos/beetroot.mp4' },
    images: { pack: '/images/products/pht-2.webp', ingredients: [] },
    inStock: true,
    emoji: '🟣',
    stripeProductId: '',
    stripePriceId: '',
  },
  {
    id: 'orange-chips',
    slug: 'orange-chips',
    name: 'Orange',
    subtitle: 'Citrus Collection',
    description: 'Thin-sliced orange chips with a bittersweet citrus punch. Perfect for snacking, cocktail garnish, or gourmet plating.',
    price: 1300,
    compareAtPrice: 1800,
    weight: '100g',
    category: 'citrus',
    theme: {
      background: '#E36812',
      backgroundDark: '#C45810',
      accent: '#FFF0DD',
    },
    video: { webm: '/videos/orange.webm', mp4: '/videos/orange.mp4' },
    images: { pack: '/images/products/pht-3.webp', ingredients: [] },
    inStock: true,
    emoji: '🍊',
    stripeProductId: '',
    stripePriceId: '',
  },
  {
    id: 'mushroom-chips',
    slug: 'mushroom-chips',
    name: 'Mushroom',
    subtitle: 'Gourmet Collection',
    description: 'Savory dried mushroom chips with deep umami flavor. A gourmet snack for the sophisticated palate.',
    price: 1500,
    compareAtPrice: 2000,
    weight: '100g',
    category: 'vegetable',
    theme: {
      background: '#8D6E52',
      backgroundDark: '#6B5340',
      accent: '#F0E6D6',
    },
    video: { webm: '/videos/mushroom.webm', mp4: '/videos/mushroom.mp4' },
    images: { pack: '/images/products/pht-4.webp', ingredients: [] },
    inStock: true,
    emoji: '🍄',
    stripeProductId: '',
    stripePriceId: '',
  },
  {
    id: 'chilli-pepper',
    slug: 'chilli-pepper',
    name: 'Chilli Pepper',
    subtitle: 'Spice Collection',
    description: 'Fiery dried chilli peppers with intense heat and smoky depth. For those who like it hot — pure, no compromise.',
    price: 1400,
    compareAtPrice: 1900,
    weight: '100g',
    category: 'spice',
    theme: {
      background: '#C62828',
      backgroundDark: '#9E2020',
      accent: '#FFCDD2',
    },
    video: { webm: '/videos/chilli.webm', mp4: '/videos/chilli.mp4' },
    images: { pack: '/images/products/pht-5.webp', ingredients: [] },
    inStock: true,
    emoji: '🌶️',
    stripeProductId: '',
    stripePriceId: '',
  },
  {
    id: 'kiwi-chips',
    slug: 'kiwi-chips',
    name: 'Kiwi',
    subtitle: 'Exotic Collection',
    description: 'Tangy kiwi chips packed with vitamin C. A zesty, refreshing snack that brightens any moment of your day.',
    price: 1500,
    compareAtPrice: 2000,
    weight: '100g',
    category: 'fruit',
    theme: {
      background: '#5B8C2A',
      backgroundDark: '#4A7322',
      accent: '#E8F5D6',
    },
    video: { webm: '/videos/kiwi.webm', mp4: '/videos/kiwi.mp4' },
    images: { pack: '/images/products/pht-6.webp', ingredients: [] },
    inStock: true,
    emoji: '🥝',
    stripeProductId: '',
    stripePriceId: '',
  },
  {
    id: 'strawberry-slices',
    slug: 'strawberry-slices',
    name: 'Strawberry',
    subtitle: 'Berry Collection',
    description: 'Delicate strawberry slices, freeze-dried to preserve vibrant color and intense berry flavor. Light as air, bold in taste.',
    price: 1800,
    compareAtPrice: 2400,
    weight: '100g',
    category: 'fruit',
    theme: {
      background: '#C41E3A',
      backgroundDark: '#9E1830',
      accent: '#FFE0E6',
    },
    video: { webm: '/videos/strawberry.webm', mp4: '/videos/strawberry.mp4' },
    images: { pack: '/images/products/pht-7.webp', ingredients: [] },
    inStock: true,
    emoji: '🍓',
    stripeProductId: '',
    stripePriceId: '',
  },
  {
    id: 'persimmon-chips',
    slug: 'persimmon-chips',
    name: 'Persimmon',
    subtitle: 'Exotic Collection',
    description: 'Honey-sweet persimmon slices dried to caramel-like perfection. A rare delicacy with rich, warm flavor.',
    price: 1600,
    compareAtPrice: 2200,
    weight: '100g',
    category: 'fruit',
    theme: {
      background: '#D4760A',
      backgroundDark: '#B36308',
      accent: '#FFE8C2',
    },
    video: { webm: '/videos/persimmon.webm', mp4: '/videos/persimmon.mp4' },
    images: { pack: '/images/products/pht-8.webp', ingredients: [] },
    inStock: true,
    emoji: '🟠',
    stripeProductId: '',
    stripePriceId: '',
  },
  {
    id: 'pear-chips',
    slug: 'pear-chips',
    name: 'Pear',
    subtitle: 'Classic Collection',
    description: 'Gently dried pear slices with a honey-like sweetness. A refined, elegant snack that melts on your tongue.',
    price: 1400,
    compareAtPrice: 1900,
    weight: '100g',
    category: 'fruit',
    theme: {
      background: '#C4A817',
      backgroundDark: '#A38E14',
      accent: '#FFF8D6',
    },
    video: { webm: '/videos/pear.webm', mp4: '/videos/pear.mp4' },
    images: { pack: '/images/products/pht-9.webp', ingredients: [] },
    inStock: true,
    emoji: '🍐',
    stripeProductId: '',
    stripePriceId: '',
  },
  {
    id: 'lemon-chips',
    slug: 'lemon-chips',
    name: 'Lemon',
    subtitle: 'Citrus Collection',
    description: 'Zesty lemon slices with an intense citrus burst. Perfect for tea, cocktails, or a bold snack with a sour kick.',
    price: 1300,
    compareAtPrice: 1800,
    weight: '100g',
    category: 'citrus',
    theme: {
      background: '#C4A817',
      backgroundDark: '#A38E14',
      accent: '#FFFDE7',
    },
    video: { webm: '/videos/lemon.webm', mp4: '/videos/lemon.mp4' },
    images: { pack: '/images/products/pht-10.webp', ingredients: [] },
    inStock: true,
    emoji: '🍋',
    stripeProductId: '',
    stripePriceId: '',
  },
  {
    id: 'apple-chips',
    slug: 'apple-chips',
    name: 'Apple',
    subtitle: 'Classic Collection',
    description: 'Crispy apple chips with no added sugar. The perfect crunch, the pure taste of orchard-fresh apples. Light, healthy, addictive.',
    price: 1200,
    compareAtPrice: 1600,
    weight: '100g',
    category: 'fruit',
    theme: {
      background: '#7CB342',
      backgroundDark: '#639B35',
      accent: '#F1F8E9',
    },
    video: { webm: '/videos/apple.webm', mp4: '/videos/apple.mp4' },
    images: { pack: '/images/products/pht-11.webp', ingredients: [] },
    inStock: true,
    emoji: '🍏',
    stripeProductId: '',
    stripePriceId: '',
  },
  {
    id: 'grapefruit-chips',
    slug: 'grapefruit-chips',
    name: 'Grapefruit',
    subtitle: 'Citrus Collection',
    description: 'Bold grapefruit slices with a tangy-bitter edge. A refreshing citrus experience for adventurous snackers.',
    price: 1500,
    compareAtPrice: 2000,
    weight: '100g',
    category: 'citrus',
    theme: {
      background: '#D32F2F',
      backgroundDark: '#B52828',
      accent: '#FFCDD2',
    },
    video: { webm: '/videos/grapefruit.webm', mp4: '/videos/grapefruit.mp4' },
    images: { pack: '/images/products/pht-12.webp', ingredients: [] },
    inStock: true,
    emoji: '🩷',
    stripeProductId: '',
    stripePriceId: '',
  },
  {
    id: 'pineapple-rings',
    slug: 'pineapple-rings',
    name: 'Pineapple',
    subtitle: 'Tropical Collection',
    description: 'Sun-dried pineapple rings with a perfect balance of sweet and tangy. A tropical escape in every bite.',
    price: 1600,
    compareAtPrice: 2200,
    weight: '100g',
    category: 'fruit',
    theme: {
      background: '#D4A017',
      backgroundDark: '#B58814',
      accent: '#FFF9E0',
    },
    video: { webm: '/videos/pineapple.webm', mp4: '/videos/pineapple.mp4' },
    images: { pack: '/images/products/pht-13.webp', ingredients: [] },
    inStock: true,
    emoji: '🍍',
    stripeProductId: '',
    stripePriceId: '',
  },
  {
    id: 'lime-chips',
    slug: 'lime-chips',
    name: 'Lime',
    subtitle: 'Citrus Collection',
    description: 'Tart lime slices with a sharp, refreshing zing. A citrus lover\'s dream — perfect for drinks, cooking, or solo snacking.',
    price: 1300,
    compareAtPrice: 1800,
    weight: '100g',
    category: 'citrus',
    theme: {
      background: '#689F38',
      backgroundDark: '#558B2F',
      accent: '#F1F8E9',
    },
    video: { webm: '/videos/lime.webm', mp4: '/videos/lime.mp4' },
    images: { pack: '/images/products/pht-14.webp', ingredients: [] },
    inStock: true,
    emoji: '🟢',
    stripeProductId: '',
    stripePriceId: '',
  },
  {
    id: 'tomato-chips',
    slug: 'tomato-chips',
    name: 'Tomato',
    subtitle: 'Veggie Collection',
    description: 'Intense sun-dried tomato chips with a rich, umami depth. A Mediterranean-inspired snack full of concentrated flavor.',
    price: 1200,
    compareAtPrice: 1700,
    weight: '100g',
    category: 'vegetable',
    theme: {
      background: '#C62828',
      backgroundDark: '#9E2020',
      accent: '#FFCDD2',
    },
    video: { webm: '/videos/tomato.webm', mp4: '/videos/tomato.mp4' },
    images: { pack: '/images/products/pht-15.webp', ingredients: [] },
    inStock: true,
    emoji: '🍅',
    stripeProductId: '',
    stripePriceId: '',
  },
];

export function formatPrice(cents: number): string {
  return `€${(cents / 100).toFixed(2)}`;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find(p => p.slug === slug);
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter(p => p.category === category);
}
