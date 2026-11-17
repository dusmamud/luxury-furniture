import { error } from '@sveltejs/kit';
import { getProduct, products } from '../../../lib/data/products';
import type { PageLoad } from './$types';

export function entries() {
	return products.map((p) => ({ slug: p.slug }));
}

export const load: PageLoad = ({ params }) => {
	const product = getProduct(params.slug);
	if (!product) error(404, 'Product not found');
	return { product };
};
