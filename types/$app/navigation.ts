export async function goto(
	url: string | URL,
	opts?: {
		replaceState?: boolean;
		noScroll?: boolean;
		keepFocus?: boolean;
		state?: Record<string, any>;
		invalidate?: 'all' | 'all' | 'load' | 'leave' | 'none' | Array<string>;
	}
): Promise<void> {
	return Promise.resolve();
}

export async function invalidateAll(): Promise<void> {
	return Promise.resolve();
}

export async function preloadCode(
	url: string | string[],
): Promise<void> {
	return Promise.resolve();
}

export async function preloadData(url: string | URL | string[]): Promise<void> {
	return Promise.resolve();
}
