import { error } from '@sveltejs/kit';
import { categories, getCategory, productsInCategory } from '../../../lib/data/products';
import type { PageLoad } from './$types';

export function entries() {
	return categories.map((c) => ({ slug: c.slug }));
}

export const load: PageLoad = ({ params }) => {
	const category = getCategory(params.slug);
	if (!category) error(404, 'Category not found');
	return { category, items: productsInCategory(category.slug) };
};
