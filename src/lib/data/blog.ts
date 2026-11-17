// Journal articles — demo content for the Furniture journal.
// Shared by the /blog hub and the /blog/[slug] detail pages.
export type ArticleSection = { heading: string; body: string };

export type Article = {
	slug: string;
	title: string;
	excerpt: string;
	date: string;
	readTime: string;
	cover: string;
	coverAlt: string;
	pullQuote: string;
	sections: ArticleSection[];
	related: string[]; // product slugs
};

export const articles: Article[] = [
	{
		slug: 'how-to-choose-sofa-size',
		title: 'How to choose the right sofa size',
		excerpt:
			'Measure twice, buy once. The room rule, the two-thirds rule and the doorway test — everything you need before a three-seater comes home.',
		date: 'Nov 4, 2026',
		readTime: '6 min read',
		cover: '/images/modern-couch.webp',
		coverAlt: 'Modern grey three-seater couch with beige cushions beside a large green plant',
		pullQuote:
			'A sofa should fill the room, not fight it. If you can walk around it without turning sideways, the size is right.',
		sections: [
			{
				heading: 'Start by measuring the room',
				body: 'Tape measure first, shopping second. Measure the wall the sofa will sit against, then the depth from that wall to the nearest walkway or coffee table. Leave at least 30 inches of clear passage behind and beside the sofa — a room you cannot move through is a room you will not enjoy. Sketch the footprint on paper, or mark it on the floor with painter\u2019s tape and live with the outline for a day.'
			},
			{
				heading: 'The two-thirds rule',
				body: 'A classic designer rule: your sofa should be about two-thirds the length of the wall it sits on. On a 12-foot wall, an 8-foot (96-inch) sofa looks intentional; a 10-foot one crowds the room and a 6-foot one looks lost. The same proportion works for rugs — the rug should extend at least 6 inches beyond each side of the sofa so the seating area reads as one zone.'
			},
			{
				heading: 'Seat depth matters more than length',
				body: 'Two sofas can share the same width and feel completely different. A seat depth of 21–23 inches suits upright sitters and smaller rooms; 24–26 inches is the deep, curl-up-with-a-book zone our Modern Couch is built for. Sit the way you actually sit — knees at 90 degrees, feet flat — and check that the back supports your shoulders without pushing your head forward.'
			},
			{
				heading: 'Do the doorway test',
				body: 'The most common sizing mistake happens before the sofa reaches the living room. Measure every doorway, hallway turn and stairwell on the delivery path, and compare with the sofa\u2019s boxed dimensions — not its assembled ones. Our sofas ship in two boxes and assemble tool-free, which is why most of them fit through a standard 30-inch door. If a doorway is tight, our white-glove team will measure with you before delivery day.'
			},
			{
				heading: 'When in doubt, go one size down',
				body: 'A slightly smaller sofa with a good armchair beside it is almost always more comfortable than a sofa that dominates the room. You keep the walkways, you gain a second seat with its own personality, and the room stays flexible for the next rearrangement. Come try both in our Covington showroom — the tape measure is on us.'
			}
		],
		related: ['modern-couches', 'modern-chair']
	},
	{
		slug: 'style-small-living-room',
		title: '5 ways to style a small living room',
		excerpt:
			'Small rooms reward smart choices. Scale, legs, mirrors, vertical storage and one brave statement piece — five moves that make a compact living room feel generous.',
		date: 'Oct 21, 2026',
		readTime: '5 min read',
		cover: '/images/about-room.webp',
		coverAlt: 'A bright living room with a modern couch, plants and warm wooden furniture',
		pullQuote:
			'In a small room, every piece has to earn its floor space. If it does two jobs, it stays.',
		sections: [
			{
				heading: '1. Choose scale, not size',
				body: 'Small rooms do not need small furniture — they need furniture with the right proportions. A low, deep two-seater with slim arms seats two comfortably and leaves the sightlines open, while a bulky recliner eats the room. Look for pieces that sit low to the ground; the eye reads the space above them as extra air.'
			},
			{
				heading: '2. Let the floor show',
				body: 'Legs are your best friend. Sofas, chairs and shelving on raised legs let the floor run underneath, which makes the room feel larger than it is. Our Modern Chair stands on slim solid-oak legs for exactly this reason — you see floor, not furniture base, and the whole arrangement feels lighter.'
			},
			{
				heading: '3. Borrow light with mirrors',
				body: 'A large mirror opposite a window doubles the daylight and the sense of depth. Keep the frame simple and hang it at eye level, not above the sofa where it reflects the ceiling. A floor lamp in a warm tone beside the mirror adds a second layer of light for evenings.'
			},
			{
				heading: '4. Go vertical with storage',
				body: 'When floor space is scarce, the walls do the work. A tall open bookshelf holds books, plants and the things you love without claiming a square foot of floor. Keep the lower shelves for heavier items and the top ones for display — the eye travels up, and the room feels taller.'
			},
			{
				heading: '5. Pick one statement piece',
				body: 'Small rooms can handle drama — just one piece of it. A sculptural pendant, a bold swing chair or a single oversized plant gives the room a focal point and makes everything else feel intentional. One statement says style; five say clutter.'
			}
		],
		related: ['modern-chair', 'floor-lamp']
	},
	{
		slug: 'caring-for-solid-oak',
		title: 'Caring for solid oak: a simple guide',
		excerpt:
			'Solid oak ages beautifully if you give it a little attention. Dusting, spills, a yearly re-oil and a few coasters — that is the whole routine.',
		date: 'Oct 7, 2026',
		readTime: '4 min read',
		cover: '/images/dining-table.webp',
		coverAlt: 'A solid oak dining table styled with chairs in a warm dining room',
		pullQuote:
			'Oak is a living material. A little oil once a year is all it asks for in return for decades of dinners.',
		sections: [
			{
				heading: 'Dust little and often',
				body: 'A soft, dry cloth once a week is enough. Dust is mildly abrasive, so wiping it away regularly prevents the fine scratches that dull a finish over time. Avoid feather dusters — they move dust around more than they remove it — and skip silicone sprays, which build up a film that is hard to remove.'
			},
			{
				heading: 'Spills: blot, never rub',
				body: 'Water, wine and coffee are not emergencies if you act fast. Blot with a clean, dry cloth, working from the outside of the spill inward so it does not spread. For sticky spots, a cloth barely dampened with warm water does the job; dry the surface straight after. Never let water pool on the surface — standing water is what leaves rings.'
			},
			{
				heading: 'Re-oil once a year',
				body: 'An oiled oak surface needs one refresh a year, ideally in spring. Clean the table, let it dry, then apply a thin coat of hardwax oil with a lint-free cloth, following the grain. Leave it for a few hours, buff off the excess, and let it cure overnight. The whole job takes twenty minutes and keeps the wood fed, water-resistant and warm to the touch.'
			},
			{
				heading: 'Mind the sun and the heat',
				body: 'Direct sunlight fades any wood over time, so keep an oak table out of the harshest midday sun or draw the curtains during the brightest hours. Hot dishes and mugs want a trivet or a coaster — heat marks are the one kind of damage that is genuinely hard to undo. Felt pads under vases and centrepieces stop the small scratches that add up.'
			},
			{
				heading: 'Small marks are part of the story',
				body: 'Solid oak can be refreshed in a way veneer never can. A light scuff sands out with fine sandpaper and a dab of oil; a deeper dent can be steamed out with a damp cloth and a warm iron. That is the point of solid wood: it does not just survive family life, it gets better at it.'
			}
		],
		related: ['dining-table', 'bookshelf']
	}
];

export function getArticle(slug: string): Article | undefined {
	return articles.find((a) => a.slug === slug);
}
