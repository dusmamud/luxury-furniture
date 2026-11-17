// Shared shop state (Svelte 5 runes) — cart, wishlist, auth, orders, promo, toast.
// Everything is stored locally in the browser (localStorage): demo storefront,
// no backend, so orders and accounts live on the device.
import { formatPrice, getProduct, products, type Review } from './products';

export type CartItem = { id: string; qty: number; variant?: string; priceDelta?: number };

export function variantDelta(product: { option: { choices: string[]; priceDeltas?: number[] } }, variant?: string): number {
	if (!variant) return 0;
	const idx = product.option.choices.indexOf(variant);
	return product.option.priceDeltas?.[idx] ?? 0;
}

export function lineUnitPrice(item: CartItem): number {
	const p = getProduct(item.id);
	return p ? p.price + (item.priceDelta ?? 0) : 0;
}

export type Address = {
	name: string;
	email: string;
	phone: string;
	address: string;
	city: string;
	state: string;
	zip: string;
};

export type OrderItem = {
	id: string;
	name: string;
	price: number;
	src: string;
	qty: number;
	variant?: string;
};

export type Order = {
	id: string;
	email: string;
	items: OrderItem[];
	subtotal: number;
	discount: number;
	shipping: number;
	total: number;
	address: Address;
	payment: string;
	delivery: string;
	placedAt: number;
	status: 'active' | 'cancelled';
	notes?: string;
	giftWrap?: boolean;
};

export type SavedAddress = Address & { id: string; label: string; isDefault: boolean };

export type User = { name: string; email: string; passHash: string };

export const FREE_SHIPPING_OVER = 499;
export const SHIPPING_FEE = 49;
export const WHITE_GLOVE_FEE = 99;
export const GIFT_WRAP_FEE = 5;

/** Demo promo codes: WELCOME10 = 10% off, FREESHIP = free shipping. */
export const PROMOS: Record<string, { type: 'percent' | 'ship'; value: number; label: string }> = {
	WELCOME10: { type: 'percent', value: 10, label: '10% off applied' },
	FREESHIP: { type: 'ship', value: 0, label: 'Free shipping applied' }
};

export const ORDER_STEPS = ['Placed', 'Processing', 'Shipped', 'Out for delivery', 'Delivered'] as const;

export function formatDate(ts: number): string {
	return new Date(ts).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
}

function read<T>(key: string, fallback: T): T {
	if (typeof window === 'undefined') return fallback;
	try {
		const raw = localStorage.getItem(key);
		return raw ? (JSON.parse(raw) as T) : fallback;
	} catch {
		return fallback;
	}
}

function write(key: string, value: unknown) {
	if (typeof window === 'undefined') return;
	try {
		localStorage.setItem(key, JSON.stringify(value));
	} catch {
		// Storage full or unavailable — the in-memory state still works.
	}
}

export type AddToCartOpts = { variant?: string; silent?: boolean; openDrawer?: boolean };

class ShopState {
	cart = $state<CartItem[]>([]);
	wishlist = $state<Set<string>>(new Set());
	user = $state<User | null>(null);
	orders = $state<Order[]>([]);
	addresses = $state<SavedAddress[]>([]);
	promoCode = $state('');
	toastMsg = $state('');
	toastId = $state(0);
	drawerOpen = $state(false);
	recentIds = $state<string[]>([]);
	private userReviews = $state<Record<string, Review[]>>({});
	private toastTimer: ReturnType<typeof setTimeout> | undefined;

	constructor() {
		this.cart = read<CartItem[]>('furniture_cart', []);
		this.wishlist = new Set(read<string[]>('furniture_wishlist', []));
		this.orders = read<Order[]>('furniture_orders', []).map((o) => ({ ...o, status: o.status ?? 'active' }));
		this.addresses = read<SavedAddress[]>('furniture_addresses', []);
		this.recentIds = read<string[]>('furniture_recent', []);
		this.userReviews = read<Record<string, Review[]>>('furniture_reviews', {});
		const sessionEmail = read<string | null>('furniture_session', null);
		if (sessionEmail) {
			const users = read<User[]>('furniture_users', []);
			this.user = users.find((u) => u.email === sessionEmail) ?? null;
		}
	}

	get cartCount(): number {
		return this.cart.reduce((n, item) => n + item.qty, 0);
	}

	get cartSubtotal(): number {
		return this.cart.reduce((sum, item) => sum + lineUnitPrice(item) * item.qty, 0);
	}

	get cartDiscount(): number {
		const promo = PROMOS[this.promoCode];
		if (promo?.type === 'percent') return (this.cartSubtotal * promo.value) / 100;
		return 0;
	}

	get cartShipping(): number {
		if (this.cart.length === 0) return 0;
		if (PROMOS[this.promoCode]?.type === 'ship') return 0;
		return this.cartSubtotal - this.cartDiscount >= FREE_SHIPPING_OVER ? 0 : SHIPPING_FEE;
	}

	get cartTotal(): number {
		return Math.max(0, this.cartSubtotal - this.cartDiscount + this.cartShipping);
	}

	get wishlistCount(): number {
		return this.wishlist.size;
	}

	get recentProducts() {
		return this.recentIds.map((id) => getProduct(id)).filter((p): p is NonNullable<typeof p> => Boolean(p));
	}

	openCart() {
		this.drawerOpen = true;
	}

	closeCart() {
		this.drawerOpen = false;
	}

	addToCart(id: string, qty = 1, opts: AddToCartOpts = {}) {
		const product = getProduct(id);
		if (!product) return;
		const variant = opts.variant ?? product.option.choices[0];
		const priceDelta = variantDelta(product, variant);
		const line = this.cart.find((c) => c.id === id && (c.variant ?? '') === (variant ?? ''));
		const nextQty = (line?.qty ?? 0) + qty;
		if (line) line.qty = Math.min(nextQty, product.stock);
		else this.cart.push({ id, qty: Math.min(qty, product.stock), variant, priceDelta });
		this.cart = [...this.cart];
		write('furniture_cart', this.cart);
		if (opts.silent) return;
		if (opts.openDrawer === false) this.showToast(`${product.name} added to bag`);
		else this.drawerOpen = true;
	}

	updateQty(id: string, qty: number, variant?: string) {
		const product = getProduct(id);
		if (!product) return;
		if (qty <= 0) return this.removeFromCart(id, variant);
		const line = this.cart.find((c) => c.id === id && (c.variant ?? '') === (variant ?? ''));
		if (line) line.qty = Math.min(qty, product.stock);
		this.cart = [...this.cart];
		write('furniture_cart', this.cart);
	}

	removeFromCart(id: string, variant?: string) {
		this.cart = this.cart.filter((c) => !(c.id === id && (c.variant ?? '') === (variant ?? '')));
		write('furniture_cart', this.cart);
	}

	clearCart() {
		this.cart = [];
		this.promoCode = '';
		write('furniture_cart', this.cart);
	}

	toggleWishlist(id: string) {
		const product = getProduct(id);
		if (this.wishlist.has(id)) {
			this.wishlist.delete(id);
			if (product) this.showToast(`${product.name} removed from wishlist`);
		} else {
			this.wishlist.add(id);
			if (product) this.showToast(`${product.name} saved to wishlist`);
		}
		this.wishlist = new Set(this.wishlist);
		write('furniture_wishlist', [...this.wishlist]);
	}

	isWished(id: string) {
		return this.wishlist.has(id);
	}

	trackView(id: string) {
		this.recentIds = [id, ...this.recentIds.filter((x) => x !== id)].slice(0, 8);
		write('furniture_recent', this.recentIds);
	}

	getReviews(id: string): Review[] {
		const product = getProduct(id);
		return [...(this.userReviews[id] ?? []), ...(product?.seedReviews ?? [])];
	}

	addReview(id: string, review: Omit<Review, 'date'>) {
		const full: Review = { ...review, date: formatDate(Date.now()) };
		this.userReviews[id] = [full, ...(this.userReviews[id] ?? [])];
		write('furniture_reviews', this.userReviews);
	}

	applyPromo(code: string): boolean {
		const key = code.trim().toUpperCase();
		if (PROMOS[key]) {
			this.promoCode = key;
			this.showToast(PROMOS[key].label);
			return true;
		}
		return false;
	}

	clearPromo() {
		this.promoCode = '';
	}

	showToast(msg: string) {
		this.toastMsg = msg;
		this.toastId += 1;
		clearTimeout(this.toastTimer);
		this.toastTimer = setTimeout(() => {
			this.toastMsg = '';
		}, 2600);
	}

	private hashPass(pw: string): string {
		let h = 5381;
		for (let i = 0; i < pw.length; i++) h = ((h << 5) + h + pw.charCodeAt(i)) >>> 0;
		return 'djb2-' + h.toString(16);
	}

	signup(name: string, email: string, password: string): { ok: boolean; error?: string } {
		const cleanEmail = email.trim().toLowerCase();
		const users = read<User[]>('furniture_users', []);
		if (users.some((u) => u.email === cleanEmail)) {
			return { ok: false, error: 'An account with this email already exists. Try logging in.' };
		}
		const user: User = { name: name.trim(), email: cleanEmail, passHash: this.hashPass(password) };
		users.push(user);
		write('furniture_users', users);
		write('furniture_session', cleanEmail);
		this.user = user;
		this.showToast(`Welcome to Furniture, ${user.name}!`);
		return { ok: true };
	}

	login(email: string, password: string): { ok: boolean; error?: string } {
		const cleanEmail = email.trim().toLowerCase();
		const users = read<User[]>('furniture_users', []);
		const user = users.find((u) => u.email === cleanEmail);
		if (!user || user.passHash !== this.hashPass(password)) {
			return { ok: false, error: 'Incorrect email or password. Please try again.' };
		}
		write('furniture_session', cleanEmail);
		this.user = user;
		this.showToast(`Welcome back, ${user.name}!`);
		return { ok: true };
	}

	logout() {
		write('furniture_session', null);
		this.user = null;
		this.showToast('You have been logged out.');
	}

	updateProfile(name: string): boolean {
		if (!this.user) return false;
		const clean = name.trim();
		if (clean.length < 2) return false;
		const users = read<User[]>('furniture_users', []);
		const record = users.find((u) => u.email === this.user!.email);
		if (!record) return false;
		record.name = clean;
		write('furniture_users', users);
		this.user = { ...this.user, name: clean };
		this.showToast('Profile updated');
		return true;
	}

	changePassword(current: string, next: string): { ok: boolean; error?: string } {
		if (!this.user) return { ok: false, error: 'Please log in first.' };
		if (next.length < 6) return { ok: false, error: 'New password must be at least 6 characters.' };
		const users = read<User[]>('furniture_users', []);
		const record = users.find((u) => u.email === this.user!.email);
		if (!record || record.passHash !== this.hashPass(current)) {
			return { ok: false, error: 'Current password is incorrect.' };
		}
		record.passHash = this.hashPass(next);
		write('furniture_users', users);
		this.user = { ...record };
		this.showToast('Password changed');
		return { ok: true };
	}

	private persistAddresses() {
		write('furniture_addresses', this.addresses);
	}

	addAddress(a: Omit<SavedAddress, 'id' | 'isDefault'>): SavedAddress {
		const entry: SavedAddress = {
			...a,
			id: 'AD' + Date.now().toString(36).toUpperCase(),
			isDefault: this.addresses.length === 0
		};
		this.addresses = [...this.addresses, entry];
		this.persistAddresses();
		return entry;
	}

	removeAddress(id: string) {
		const wasDefault = this.addresses.find((a) => a.id === id)?.isDefault;
		this.addresses = this.addresses.filter((a) => a.id !== id);
		if (wasDefault && this.addresses.length > 0) this.addresses[0].isDefault = true;
		this.addresses = [...this.addresses];
		this.persistAddresses();
	}

	setDefaultAddress(id: string) {
		this.addresses = this.addresses.map((a) => ({ ...a, isDefault: a.id === id }));
		this.persistAddresses();
	}

	get defaultAddress(): SavedAddress | undefined {
		return this.addresses.find((a) => a.isDefault) ?? this.addresses[0];
	}

	placeOrder(
		address: Address,
		payment: string,
		delivery: string,
		opts: { notes?: string; giftWrap?: boolean } = {}
	): Order | null {
		if (this.cart.length === 0) return null;
		const giftWrap = opts.giftWrap === true;
		const deliveryFee = delivery === 'White glove' ? WHITE_GLOVE_FEE : delivery === 'Standard' ? this.cartShipping : 0;
		const items: OrderItem[] = this.cart
			.map((c): OrderItem | null => {
				const p = getProduct(c.id);
				return p
					? { id: p.id, name: p.name, price: p.price + (c.priceDelta ?? 0), src: `/images/cutouts/${p.cutout}.avif`, qty: c.qty, variant: c.variant }
					: null;
			})
			.filter((x): x is OrderItem => x !== null);
		const order: Order = {
			id: 'FU' + Date.now().toString(36).toUpperCase(),
			email: address.email.trim().toLowerCase(),
			items,
			subtotal: this.cartSubtotal,
			discount: this.cartDiscount,
			shipping: deliveryFee,
			total: Math.max(0, this.cartSubtotal - this.cartDiscount + deliveryFee + (giftWrap ? GIFT_WRAP_FEE : 0)),
			address,
			payment,
			delivery,
			placedAt: Date.now(),
			status: 'active',
			notes: opts.notes?.trim() ? opts.notes.trim() : undefined,
			giftWrap: giftWrap || undefined
		};
		this.orders = [order, ...this.orders];
		write('furniture_orders', this.orders);
		this.clearCart();
		return order;
	}

	cancelOrder(id: string): boolean {
		const order = this.orders.find((o) => o.id === id);
		if (!order || order.status !== 'active') return false;
		if (this.orderStep(order) >= 2) return false;
		order.status = 'cancelled';
		this.orders = [...this.orders];
		write('furniture_orders', this.orders);
		this.showToast(`Order ${order.id} cancelled`);
		return true;
	}

	isCancellable(order: Order): boolean {
		return order.status === 'active' && this.orderStep(order) < 2;
	}

	myOrders(): Order[] {
		if (!this.user) return [];
		return this.orders.filter((o) => o.email === this.user!.email);
	}

	findOrder(id: string): Order | undefined {
		return this.orders.find((o) => o.id.toUpperCase() === id.trim().toUpperCase());
	}

	orderStep(order: Order): number {
		const hours = (Date.now() - order.placedAt) / 3_600_000;
		if (hours < 1) return 0;
		if (hours < 24) return 1;
		if (hours < 72) return 2;
		if (hours < 96) return 3;
		return 4;
	}

	estimatedDelivery(order: Order): string {
		return formatDate(order.placedAt + 4 * 24 * 3_600_000);
	}
}

export const shop = new ShopState();

export { formatPrice, products };
