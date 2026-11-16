export type Collection = {
	slug: string;
	name: string;
	blurb: string;
	price: number;
	priceNote: string;
	image: string;
	alt: string;
	size: 'large' | 'wide' | 'small';
};

export const collections: Collection[] = [
	{
		slug: 'outdoor-lounge-chair',
		name: 'Outdoor Lounge Chair',
		blurb: 'Hand-woven rattan, cloud-soft cushions, made for slow evenings.',
		price: 899,
		priceNote: 'From $899 · 2-piece set',
		image: '/images/outdoor-lounge.webp',
		alt: 'Two beige woven outdoor lounge chairs with white cushions and a round wooden side table',
		size: 'large'
	},
	{
		slug: 'indoor-plants',
		name: 'Indoor Plants',
		blurb: 'Sculptural greenery in hand-finished pots, styled for your rooms.',
		price: 79,
		priceNote: 'From $79 · pot included',
		image: '/images/indoor-plants.webp',
		alt: 'Green fiddle-leaf plant in a dark pot against a burnt-orange wall',
		size: 'large'
	},
	{
		slug: 'modern-couches',
		name: 'Modern Couches',
		blurb: 'Deep seats, feather-wrapped cushions, fabric that survives real life.',
		price: 1299,
		priceNote: 'From $1,299 · 3-seater',
		image: '/images/modern-couch.webp',
		alt: 'Modern grey three-seater couch with beige cushions and a large green plant',
		size: 'wide'
	},
	{
		slug: 'modern-chair',
		name: 'Modern Chair',
		blurb: 'A sculpted accent chair with solid black legs.',
		price: 349,
		priceNote: 'From $349',
		image: '/images/modern-chair.jpg',
		alt: 'Modern white chair with black splayed legs',
		size: 'small'
	},
	{
		slug: 'bamboo-swing-chairs',
		name: 'Bamboo Swing Chairs',
		blurb: 'A hand-woven egg chair that floats — your reading nook, upgraded.',
		price: 499,
		priceNote: 'From $499',
		image: '/images/bamboo-swing.webp',
		alt: 'Bamboo egg swing chair hanging by a chain with cushions and a throw',
		size: 'small'
	},
	{
		slug: 'hanging-light',
		name: 'Hanging Light',
		blurb: 'Warm bronze dome pendant, hand-finished, dimmable glow.',
		price: 189,
		priceNote: 'From $189',
		image: '/images/hanging-light.jpg',
		alt: 'Brown dome pendant hanging light glowing warm',
		size: 'small'
	}
];
