import { error } from '@sveltejs/kit';
import { getRoom, productsInRoom, rooms } from '../../../lib/data/products';
import type { PageLoad } from './$types';

export function entries() {
	return rooms.map((r) => ({ slug: r.slug }));
}

export const load: PageLoad = ({ params }) => {
	const room = getRoom(params.slug);
	if (!room) error(404, 'Room not found');
	return { room, items: productsInRoom(room.slug) };
};
