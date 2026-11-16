/** Counts a number up when it scrolls into view (1400ms, ease-out cubic).
 * Reads data-target / data-decimals / data-suffix from the node.
 * Reduced-motion users get the final value immediately. */
export function countup(node: HTMLElement) {
	const target = parseFloat(node.dataset.target ?? '0');
	const decimals = parseInt(node.dataset.decimals ?? '0', 10);
	const suffix = node.dataset.suffix ?? '';
	const format = (v: number) => v.toFixed(decimals) + suffix;

	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
		node.textContent = format(target);
		return {};
	}

	let raf = 0;
	const io = new IntersectionObserver(
		(entries) => {
			for (const e of entries) {
				if (!e.isIntersecting) continue;
				io.disconnect();
				const start = performance.now();
				const dur = 1400;
				const tick = (now: number) => {
					const p = Math.min(1, (now - start) / dur);
					const eased = 1 - Math.pow(1 - p, 3);
					node.textContent = format(target * eased);
					if (p < 1) raf = requestAnimationFrame(tick);
				};
				raf = requestAnimationFrame(tick);
			}
		},
		{ threshold: 0.4 }
	);
	io.observe(node);
	return {
		destroy: () => {
			io.disconnect();
			cancelAnimationFrame(raf);
		}
	};
}
