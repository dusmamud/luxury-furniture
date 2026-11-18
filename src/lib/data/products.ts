// Product catalog — 10 pieces across 5 categories and 5 rooms.
// Prices, stock, reviews and delivery times are demo data for the client preview.
export type Review = {
	author: string;
	rating: number;
	title: string;
	body: string;
	date: string;
};

export type Product = {
	id: string;
	slug: string;
	name: string;
	price: number;
	compareAt?: number;
	category: string;
	room: string;
	rating: number;
	reviewCount: number;
	badge?: string;
	cutout: string;
	photo: string;
	alt: string;
	blurb: string;
	description: string;
	features: string[];
	dimensions: { label: string; value: string }[];
	materials: string;
	weight: string;
	assembly: string;
	care: string;
	deliveryDays: string;
	warranty: string;
	stock: number;
	optionLabel: string;
	option: { choices: string[]; priceDeltas?: number[] };
	seedReviews: Review[];
	frequentlyBoughtTogether: string[];
};

export type Category = { slug: string; name: string; blurb: string; cutout: string };
export type Room = { slug: string; name: string; blurb: string; photo: string };

export const categories: Category[] = [
	{ slug: 'sofas', name: 'Sofas & Couches', blurb: 'Deep seats, feather-wrapped cushions, fabric that survives real life.', cutout: 'modern-sofa' },
	{ slug: 'chairs', name: 'Chairs', blurb: 'Sculpted accent chairs and woven loungers for slow evenings.', cutout: 'modern-chair' },
	{ slug: 'tables', name: 'Tables', blurb: 'Solid oak dining tables, made to gather around for decades.', cutout: 'dining-table' },
	{ slug: 'lighting', name: 'Lighting', blurb: 'Warm, hand-finished pendants and lamps that set the room.', cutout: 'hanging-light' },
	{ slug: 'storage', name: 'Storage', blurb: 'Open shelving in solid oak — display what you love, hide the rest.', cutout: 'bookshelf' },
	{ slug: 'bedroom', name: 'Bedroom', blurb: 'Upholstered beds and calm, hotel-soft pieces for better sleep.', cutout: 'bed' },
	{ slug: 'outdoor', name: 'Outdoor', blurb: 'Hand-woven rattan built for patios, porches and slow evenings.', cutout: 'outdoor-chairs' },
	{ slug: 'decor', name: 'Decor & Plants', blurb: 'Sculptural greenery in hand-finished pots, styled for your rooms.', cutout: 'plant' }
];

export const rooms: Room[] = [
	{ slug: 'living-room', name: 'Living Room', blurb: 'Sofas, chairs and light for the room you live in most.', photo: '/images/modern-couch.webp' },
	{ slug: 'bedroom', name: 'Bedroom', blurb: 'Calm, hotel-soft pieces for slower mornings.', photo: '/images/bed.webp' },
	{ slug: 'dining-room', name: 'Dining Room', blurb: 'Tables and pendants made for long dinners.', photo: '/images/dining-table.webp' },
	{ slug: 'outdoor', name: 'Outdoor', blurb: 'Rattan loungers and swing chairs for open air.', photo: '/images/outdoor-lounge.webp' },
	{ slug: 'office', name: 'Home Office', blurb: 'Shelving and light that make work feel considered.', photo: '/images/bookshelf.webp' }
];

export const products: Product[] = [
	{
		id: 'modern-couches',
		slug: 'modern-couches',
		name: 'Modern Couch',
		price: 1299,
		compareAt: 1599,
		category: 'sofas',
		room: 'living-room',
		rating: 4.9,
		reviewCount: 412,
		badge: 'Bestseller',
		cutout: 'modern-sofa',
		photo: '/images/modern-couch.webp',
		alt: 'Modern grey three-seater couch with beige cushions and a large green plant',
		blurb: 'Deep seats, feather-wrapped cushions, fabric that survives real life.',
		description:
			'Our best-loved three-seater, built around one idea: a couch should invite you to stay. The frame is kiln-dried hardwood, the cushions are feather-wrapped high-resilience foam, and the fabric is a stain-resistant weave that shrugs off red wine and muddy paws. It arrives in two boxes and assembles in fifteen minutes, no tools beyond the ones in the box.',
		features: ['Kiln-dried hardwood frame, 10-year warranty', 'Feather-wrapped, reversible seat cushions', 'Stain-resistant performance fabric', 'Solid oak legs, removable and replaceable'],
		dimensions: [
			{ label: 'Width', value: '84 in' },
			{ label: 'Depth', value: '38 in' },
			{ label: 'Height', value: '33 in' },
			{ label: 'Seat depth', value: '24 in' }
		],
		materials: 'Kiln-dried hardwood frame, high-resilience foam, feather blend, performance polyester fabric, solid oak legs',
		weight: '98 lb',
		assembly: '15 minutes, tool-free — legs twist on by hand',
		care: 'Vacuum weekly; blot spills immediately; cushion covers are machine-washable on cold',
		deliveryDays: '3–5 business days',
		warranty: '10-year frame warranty, 2-year fabric warranty',
		stock: 14,
		optionLabel: 'Fabric',
		option: { choices: ['Stone Grey', 'Warm Sand', 'Forest Green', 'Midnight Blue'], priceDeltas: [0, 0, 80, 80] },
		seedReviews: [
			{ author: 'Maya R.', rating: 5, title: 'Worth every dollar', body: 'We have owned it for eight months and it still looks new. The cushions have not sagged at all, and the fabric really does wipe clean.', date: 'Oct 2026' },
			{ author: 'Daniel K.', rating: 5, title: 'Assembly was genuinely 15 minutes', body: 'Two boxes, no tools, and it was done before the delivery team left. Deep seat, perfect for movie nights.', date: 'Sep 2026' }
		],
		frequentlyBoughtTogether: ['modern-chair', 'floor-lamp', 'indoor-plants']
	},
	{
		id: 'outdoor-lounge-chair',
		slug: 'outdoor-lounge-chair',
		name: 'Outdoor Lounge Chair',
		price: 899,
		category: 'outdoor',
		room: 'outdoor',
		rating: 4.8,
		reviewCount: 238,
		badge: '2-piece set',
		cutout: 'outdoor-chairs',
		photo: '/images/outdoor-lounge.webp',
		alt: 'Two beige woven outdoor lounge chairs with white cushions and a round wooden side table',
		blurb: 'Hand-woven rattan, cloud-soft cushions, made for slow evenings.',
		description:
			'A pair of hand-woven rattan loungers with quick-dry, cloud-soft cushions and a matching round side table. The weave is UV-stabilised and weather-resistant, so the set lives outside all season and still looks new next spring.',
		features: ['Hand-woven, UV-stabilised rattan', 'Quick-dry cushions with removable covers', 'Round teak side table included', 'Weather-resistant, all-season use'],
		dimensions: [
			{ label: 'Chair width', value: '30 in' },
			{ label: 'Chair depth', value: '32 in' },
			{ label: 'Chair height', value: '31 in' },
			{ label: 'Table diameter', value: '18 in' }
		],
		materials: 'Powder-coated aluminium frame, PE rattan weave, solution-dyed acrylic cushions, teak table top',
		weight: '52 lb (set)',
		assembly: '10 minutes — cushions on, table legs on',
		care: 'Hose down or wipe with mild soap; store cushions indoors in heavy rain',
		deliveryDays: '3–5 business days',
		warranty: '5-year frame warranty, 2-year cushion warranty',
		stock: 9,
		optionLabel: 'Weave',
		option: { choices: ['Natural Rattan', 'Charcoal', 'Sand'], priceDeltas: [0, 0, 0] },
		seedReviews: [
			{ author: 'Priya S.', rating: 5, title: 'Our porch is now our favourite room', body: 'The cushions are genuinely comfortable, not just decorative. Survived a full summer of rain and sun without fading.', date: 'Aug 2026' },
			{ author: 'Tom W.', rating: 4, title: 'Beautiful, slightly low', body: 'Gorgeous weave and the table is the perfect size. The seat is a touch low for taller guests, but the comfort makes up for it.', date: 'Jul 2026' }
		],
		frequentlyBoughtTogether: ['bamboo-swing-chair', 'indoor-plants']
	},
	{
		id: 'modern-chair',
		slug: 'modern-chair',
		name: 'Modern Chair',
		price: 349,
		category: 'chairs',
		room: 'living-room',
		rating: 4.7,
		reviewCount: 186,
		cutout: 'modern-chair',
		photo: '/images/modern-chair.jpg',
		alt: 'Modern white chair with black splayed legs',
		blurb: 'A sculpted accent chair with solid black legs.',
		description:
			'A sculpted accent chair that works anywhere — beside the couch, at a desk, or alone in a reading corner. The moulded seat is upholstered in a soft bouclé, and the splayed black legs are solid beech, angled for stability on rugs and hard floors alike.',
		features: ['Moulded, ergonomically curved seat', 'Soft bouclé upholstery', 'Solid beech legs in matte black', 'Stacks with nothing — made to be seen'],
		dimensions: [
			{ label: 'Width', value: '26 in' },
			{ label: 'Depth', value: '24 in' },
			{ label: 'Height', value: '31 in' },
			{ label: 'Seat height', value: '18 in' }
		],
		materials: 'Moulded plywood shell, bouclé polyester, solid beech legs',
		weight: '19 lb',
		assembly: 'None — arrives fully assembled',
		care: 'Brush bouclé gently; spot-clean with mild soap and water',
		deliveryDays: '2–4 business days',
		warranty: '5-year frame warranty',
		stock: 22,
		optionLabel: 'Upholstery',
		option: { choices: ['Ivory Bouclé', 'Oatmeal', 'Sage'], priceDeltas: [0, 0, 30] },
		seedReviews: [
			{ author: 'Hannah L.', rating: 5, title: 'The chair everyone asks about', body: 'It looks like it cost three times the price. Comfortable enough for an hour of reading, and the legs have not wobbled once.', date: 'Oct 2026' },
			{ author: 'Marcus B.', rating: 4, title: 'Great accent piece', body: 'Firm seat, which I like. The bouclé sheds a little in the first weeks — a lint roller handles it.', date: 'Aug 2026' }
		],
		frequentlyBoughtTogether: ['modern-couches', 'floor-lamp']
	},
	{
		id: 'bamboo-swing-chair',
		slug: 'bamboo-swing-chair',
		name: 'Bamboo Swing Chair',
		price: 499,
		category: 'chairs',
		room: 'living-room',
		rating: 4.8,
		reviewCount: 154,
		badge: 'New',
		cutout: 'swing-chair',
		photo: '/images/bamboo-swing.webp',
		alt: 'Bamboo egg swing chair hanging by a chain with cushions and a throw',
		blurb: 'A hand-woven egg chair that floats — your reading nook, upgraded.',
		description:
			'Hand-woven bamboo in a floating egg shape, hung from a powder-coated steel stand — no ceiling mount needed. Deep seat, plush cushions and a throw included. It gently sways, holds up to 250 lb, and turns any corner into the best seat in the house.',
		features: ['Hand-woven natural bamboo', 'Free-standing steel frame — no ceiling mount', 'Plush cushions and throw included', 'Holds up to 250 lb'],
		dimensions: [
			{ label: 'Width', value: '41 in' },
			{ label: 'Depth', value: '38 in' },
			{ label: 'Height', value: '78 in' },
			{ label: 'Seat depth', value: '22 in' }
		],
		materials: 'Natural bamboo weave, powder-coated steel frame, cotton cushions',
		weight: '68 lb',
		assembly: '20 minutes — frame bolts together, chair hangs on the hook',
		care: 'Dust the weave; cushion covers machine-washable on cold',
		deliveryDays: '4–6 business days',
		warranty: '3-year frame warranty',
		stock: 7,
		optionLabel: 'Finish',
		option: { choices: ['Natural Bamboo', 'Walnut Stain'], priceDeltas: [0, 40] },
		seedReviews: [
			{ author: 'Sofia M.', rating: 5, title: 'My reading nook is now sacred', body: 'The sway is gentle and the cushions are deep. My kids fight over it every evening — I should have bought two.', date: 'Sep 2026' },
			{ author: 'James P.', rating: 5, title: 'Sturdy and beautiful', body: 'Was worried about stability, but the stand is rock solid. Assembly took twenty minutes with one person.', date: 'Jul 2026' }
		],
		frequentlyBoughtTogether: ['indoor-plants', 'floor-lamp']
	},
	{
		id: 'hanging-light',
		slug: 'hanging-light',
		name: 'Hanging Pendant Light',
		price: 189,
		category: 'lighting',
		room: 'dining-room',
		rating: 4.9,
		reviewCount: 321,
		cutout: 'hanging-light',
		photo: '/images/hanging-light.jpg',
		alt: 'Brown dome pendant hanging light glowing warm',
		blurb: 'Warm bronze dome pendant, hand-finished, dimmable glow.',
		description:
			'A hand-spun bronze dome pendant that throws a warm, focused pool of light — perfect over a dining table or kitchen island. Dimmable with any standard dimmer, the cord adjusts from 24 to 72 inches, and the hand-finished patina means no two are exactly alike.',
		features: ['Hand-spun bronze dome, patina finish', 'Dimmable — works with standard dimmers', 'Adjustable cord, 24–72 in', 'E26 socket, LED bulb included'],
		dimensions: [
			{ label: 'Dome diameter', value: '16 in' },
			{ label: 'Dome height', value: '10 in' },
			{ label: 'Cord', value: '24–72 in adjustable' }
		],
		materials: 'Spun bronze, brass fittings, fabric-wrapped cord',
		weight: '6 lb',
		assembly: '15 minutes — hardwired, or use a plug-in kit (sold separately)',
		care: 'Dust with a dry cloth; never use abrasive cleaners on the patina',
		deliveryDays: '2–4 business days',
		warranty: '3-year warranty',
		stock: 31,
		optionLabel: 'Finish',
		option: { choices: ['Bronze', 'Brushed Brass', 'Matte Black'], priceDeltas: [0, 20, 0] },
		seedReviews: [
			{ author: 'Elena V.', rating: 5, title: 'The glow is perfect', body: 'We hung three over the island and the light is warm without being yellow. The patina looks far more expensive than the price.', date: 'Oct 2026' },
			{ author: 'Chris D.', rating: 5, title: 'Easy install', body: 'Cord adjustment is simple and the included bulb is a nice touch. Dimmer works flawlessly.', date: 'Aug 2026' }
		],
		frequentlyBoughtTogether: ['dining-table', 'modern-couches']
	},
	{
		id: 'indoor-plants',
		slug: 'indoor-plants',
		name: 'Fiddle-Leaf Indoor Plant',
		price: 79,
		category: 'decor',
		room: 'living-room',
		rating: 4.6,
		reviewCount: 98,
		cutout: 'plant',
		photo: '/images/indoor-plants.webp',
		alt: 'Green fiddle-leaf plant in a dark grey pot',
		blurb: 'Sculptural greenery in hand-finished pots, styled for your rooms.',
		description:
			'A nursery-grown fiddle-leaf fig, 3–4 ft tall, shipped in a hand-finished ceramic pot with a care card. Fiddle-leafs love bright, indirect light and a weekly water — and this one arrives healthy, with a 30-day grow guarantee.',
		features: ['Nursery-grown, 3–4 ft tall', 'Hand-finished ceramic pot included', 'Care card and watering guide', '30-day grow guarantee'],
		dimensions: [
			{ label: 'Height', value: '36–48 in' },
			{ label: 'Pot diameter', value: '10 in' }
		],
		materials: 'Live fiddle-leaf fig, glazed ceramic pot, drainage tray',
		weight: '12 lb',
		assembly: 'None — unbox, place, water lightly',
		care: 'Bright indirect light; water when the top inch of soil is dry',
		deliveryDays: '2–3 business days',
		warranty: '30-day grow guarantee',
		stock: 40,
		optionLabel: 'Pot',
		option: { choices: ['Charcoal Ceramic', 'Terracotta', 'Cream'], priceDeltas: [0, 0, 0] },
		seedReviews: [
			{ author: 'Nina A.', rating: 5, title: 'Arrived perfect', body: 'I was nervous about shipping a live plant, but it arrived healthy with not a single damaged leaf. Two months on, it has grown six new leaves.', date: 'Sep 2026' },
			{ author: 'Omar F.', rating: 4, title: 'Beautiful plant', body: 'Gorgeous pot and a very full plant. Fiddle-leafs are dramatic — it dropped two leaves in the first week, then settled happily.', date: 'Jul 2026' }
		],
		frequentlyBoughtTogether: ['modern-couches', 'bamboo-swing-chair']
	},
	{
		id: 'dining-table',
		slug: 'dining-table',
		name: 'Haven Oak Dining Table',
		price: 1499,
		compareAt: 1799,
		category: 'tables',
		room: 'dining-room',
		rating: 4.9,
		reviewCount: 167,
		badge: 'Bestseller',
		cutout: 'dining-table',
		photo: '/images/dining-table.webp',
		alt: 'Solid oak dining table for six with clean straight legs',
		blurb: 'Solid oak, seats six, made to gather around for decades.',
		description:
			'A six-seat dining table in solid white oak, finished with a hard-wax oil that shows the grain and shrugs off spills. The apron is mortise-and-tenon joined — no wobble, ever — and the top is thick enough to be refinished for generations.',
		features: ['Solid white oak top, 1.5 in thick', 'Mortise-and-tenon apron — no wobble', 'Hard-wax oil finish, food-safe', 'Seats six comfortably'],
		dimensions: [
			{ label: 'Length', value: '72 in' },
			{ label: 'Width', value: '36 in' },
			{ label: 'Height', value: '30 in' },
			{ label: 'Top thickness', value: '1.5 in' }
		],
		materials: 'Solid white oak, hard-wax oil finish',
		weight: '121 lb',
		assembly: '25 minutes — legs bolt on with the included wrench',
		care: 'Wipe with a damp cloth; re-oil once a year to keep the grain rich',
		deliveryDays: '4–6 business days',
		warranty: '10-year structural warranty',
		stock: 8,
		optionLabel: 'Finish',
		option: { choices: ['Natural Oak', 'Smoked Oak', 'Walnut Stain'], priceDeltas: [0, 120, 150] },
		seedReviews: [
			{ author: 'Rachel T.', rating: 5, title: 'The table our house needed', body: 'The grain is beautiful and the finish feels like furniture, not plastic. Six chairs fit with room to spare.', date: 'Oct 2026' },
			{ author: 'Ben H.', rating: 5, title: 'Solid as a rock', body: 'No wobble at all, even when the kids climb on it. The oil finish already survived a red-wine spill.', date: 'Sep 2026' }
		],
		frequentlyBoughtTogether: ['hanging-light', 'modern-chair']
	},
	{
		id: 'bed',
		slug: 'bed',
		name: 'Cloudrest Upholstered Bed',
		price: 1899,
		category: 'bedroom',
		room: 'bedroom',
		rating: 4.8,
		reviewCount: 143,
		badge: 'New',
		cutout: 'bed',
		photo: '/images/bed.webp',
		alt: 'Modern upholstered queen bed with tall beige fabric headboard and white bedding',
		blurb: 'A tall, soft headboard and a frame built for better sleep.',
		description:
			'A queen bed with a tall, softly padded headboard in oatmeal bouclé, built on a solid wood slatted base — no box spring needed. The headboard is the right height for reading in bed, and the frame sits low and calm, so the room feels bigger.',
		features: ['Tall padded headboard, oatmeal bouclé', 'Solid wood slatted base — no box spring needed', 'Fits standard queen mattresses', 'Low, calm profile'],
		dimensions: [
			{ label: 'Length', value: '86 in' },
			{ label: 'Width', value: '64 in' },
			{ label: 'Headboard height', value: '52 in' },
			{ label: 'Mattress', value: 'Queen 60 × 80 in' }
		],
		materials: 'Kiln-dried hardwood frame, bouclé polyester, high-density foam headboard',
		weight: '132 lb',
		assembly: '30 minutes — slats roll out, headboard bolts on',
		care: 'Vacuum the headboard monthly; spot-clean bouclé with mild soap',
		deliveryDays: '5–7 business days',
		warranty: '10-year frame warranty',
		stock: 6,
		optionLabel: 'Fabric',
		option: { choices: ['Oatmeal Bouclé', 'Stone Grey', 'Forest Velvet'], priceDeltas: [0, 0, 180] },
		seedReviews: [
			{ author: 'Laura G.', rating: 5, title: 'Hotel bed at home', body: 'The headboard is so comfortable for reading that we stay up too late. The frame is silent — zero creaks.', date: 'Oct 2026' },
			{ author: 'Sam N.', rating: 4, title: 'Beautiful and solid', body: 'Assembly was straightforward. The bouclé is lighter in person than on screen — still lovely.', date: 'Sep 2026' }
		],
		frequentlyBoughtTogether: ['floor-lamp', 'indoor-plants']
	},
	{
		id: 'bookshelf',
		slug: 'bookshelf',
		name: 'Arcadia Oak Bookshelf',
		price: 649,
		category: 'storage',
		room: 'office',
		rating: 4.8,
		reviewCount: 121,
		cutout: 'bookshelf',
		photo: '/images/bookshelf.webp',
		alt: 'Tall modern oak bookshelf with five open shelves, books and a small vase',
		blurb: 'Five open shelves in solid oak — display what you love.',
		description:
			'A tall, five-shelf bookcase in solid oak with a slim, ladder-style frame. Shelves are fixed at generous heights for art books and records, and the open back keeps the room light. Wall-anchoring hardware is included.',
		features: ['Five open shelves, art-book height', 'Solid oak frame, slim profile', 'Open back — keeps rooms light', 'Wall anchor included'],
		dimensions: [
			{ label: 'Height', value: '72 in' },
			{ label: 'Width', value: '28 in' },
			{ label: 'Depth', value: '12 in' },
			{ label: 'Shelf clearance', value: '13 in' }
		],
		materials: 'Solid oak frame, oak-veneer shelves',
		weight: '54 lb',
		assembly: '20 minutes — frame bolts together, shelves drop in',
		care: 'Dust with a dry cloth; avoid direct sun on the oak',
		deliveryDays: '3–5 business days',
		warranty: '5-year warranty',
		stock: 12,
		optionLabel: 'Finish',
		option: { choices: ['Natural Oak', 'Smoked Oak'], priceDeltas: [0, 60] },
		seedReviews: [
			{ author: 'Alex C.', rating: 5, title: 'Perfect for records', body: 'The shelf heights fit LPs and art books exactly. It looks far more expensive than it was.', date: 'Sep 2026' },
			{ author: 'Grace Y.', rating: 5, title: 'Sturdy and light', body: 'Anchored to the wall in five minutes. The open back makes our small office feel bigger.', date: 'Aug 2026' }
		],
		frequentlyBoughtTogether: ['floor-lamp', 'indoor-plants']
	},
	{
		id: 'floor-lamp',
		slug: 'floor-lamp',
		name: 'Tripod Floor Lamp',
		price: 249,
		category: 'lighting',
		room: 'living-room',
		rating: 4.7,
		reviewCount: 89,
		cutout: 'floor-lamp',
		photo: '/images/floor-lamp.webp',
		alt: 'Modern tripod floor lamp with dark wooden legs and a large white drum shade',
		blurb: 'Three solid legs, a warm drum shade, light that flatters the room.',
		description:
			'A tripod floor lamp with three solid dark-wood legs and a large linen drum shade. The warm LED bulb is included and dimmable, and the brass fittings add a quiet touch of luxury. It stands steady on rugs and hard floors, and the shade throws light up and down — no harsh glare.',
		features: ['Solid dark-wood tripod legs', 'Linen drum shade, warm glow', 'Dimmable LED bulb included', 'Brass fittings'],
		dimensions: [
			{ label: 'Height', value: '62 in' },
			{ label: 'Shade diameter', value: '18 in' },
			{ label: 'Base spread', value: '24 in' }
		],
		materials: 'Solid beech legs, linen shade, brass fittings',
		weight: '14 lb',
		assembly: '10 minutes — legs screw in, shade clips on',
		care: 'Dust the shade with a dry cloth; wipe legs with a damp cloth',
		deliveryDays: '2–4 business days',
		warranty: '3-year warranty',
		stock: 18,
		optionLabel: 'Shade',
		option: { choices: ['White Linen', 'Natural Linen', 'Charcoal'], priceDeltas: [0, 0, 20] },
		seedReviews: [
			{ author: 'Ivy Z.', rating: 5, title: 'Warm light, no glare', body: 'The shade diffuses beautifully — our living room finally feels finished. Sturdy on our thick rug.', date: 'Oct 2026' },
			{ author: 'Noah E.', rating: 4, title: 'Great value', body: 'Looks like a designer lamp. The dimmer switch is on the cord, which took a day to get used to.', date: 'Aug 2026' }
		],
		frequentlyBoughtTogether: ['modern-couches', 'bookshelf']
	}
];

export function getProduct(id: string): Product | undefined {
	return products.find((p) => p.id === id || p.slug === id);
}

export function getCategory(slug: string): Category | undefined {
	return categories.find((c) => c.slug === slug);
}

export function getRoom(slug: string): Room | undefined {
	return rooms.find((r) => r.slug === slug);
}

export function productsInCategory(slug: string): Product[] {
	return products.filter((p) => p.category === slug);
}

export function productsInRoom(slug: string): Product[] {
	return products.filter((p) => p.room === slug);
}

export function formatPrice(n: number): string {
	return '$' + n.toLocaleString('en-US');
}

/** Monthly financing figure beside the price (12 months, 0% APR demo). */
export function monthlyPrice(n: number): string {
	return '$' + Math.round(n / 12).toLocaleString('en-US');
}

// --- Responsive photo metadata -------------------------------------------
// The big room photos are 1920px wide but shown at 256–600px. Right-sized
// variants (-800 / -1200 WebP, same folder) keep the original as the 2x
// fallback. Small photos (modern-chair.jpg, hanging-light.jpg, bamboo-swing)
// are already small enough and have no variants.
export type PhotoMeta = { w: number; h: number; variants: number[] };

export const photoMeta: Record<string, PhotoMeta> = {
	'/images/modern-couch.webp': { w: 1920, h: 1280, variants: [800, 1200] },
	'/images/outdoor-lounge.webp': { w: 1920, h: 1280, variants: [800, 1200] },
	'/images/hero-sofa.webp': { w: 1920, h: 1280, variants: [800, 1200] },
	'/images/about-room.webp': { w: 1920, h: 1280, variants: [800, 1200] },
	'/images/bed.webp': { w: 1920, h: 1280, variants: [800, 1200] },
	'/images/dining-table.webp': { w: 1920, h: 1280, variants: [800, 1200] },
	'/images/floor-lamp.webp': { w: 1920, h: 1280, variants: [800, 1200] },
	'/images/bookshelf.webp': { w: 1280, h: 1920, variants: [800, 1200] },
	'/images/indoor-plants.webp': { w: 900, h: 2098, variants: [800] },
	// Small photos: no variants needed, but dims are recorded so <img> tags
	// can carry width/height.
	'/images/modern-chair.jpg': { w: 800, h: 800, variants: [] },
	'/images/hanging-light.jpg': { w: 800, h: 800, variants: [] },
	'/images/bamboo-swing.webp': { w: 700, h: 714, variants: [] }
};

/** srcset for a photo, or undefined when it has no variants. */
export function photoSrcset(photo: string): string | undefined {
	const m = photoMeta[photo];
	if (!m || m.variants.length === 0) return undefined;
	const stem = photo.replace(/\.webp$/, '');
	const parts = m.variants.map((v) => `${stem}-${v}.webp ${v}w`);
	parts.push(`${photo} ${m.w}w`);
	return parts.join(', ');
}

/** Intrinsic dimensions for a photo, or undefined when unknown. */
export function photoDims(photo: string): { width: number; height: number } | undefined {
	const m = photoMeta[photo];
	return m ? { width: m.w, height: m.h } : undefined;
}

/** SKU for structured data — stable, store-defined (no invented GTIN). */
export function productSku(p: Product): string {
	return `FUR-${p.slug.toUpperCase()}`;
}
