export interface Page {
	url: URL;
	params: Record<string, string>;
	route: { id: string | null };
	status: number;
	error: Error | null;
	data: unknown;
	form: unknown;
	state: unknown;
}

export const page: {
	subscribe: (run: (value: Page) => void) => () => void;
} = {} as any;

export const navigating: {
	subscribe: (run: (value: import('@sveltejs/kit').NavigationTarget | null) => void) => () => void;
} = {} as any;

export const updated: {
	subscribe: (run: (value: boolean) => void) => () => void;
} = {} as any;

export const session: {
	subscribe: (run: (value: any) => void) => () => void;
} = {} as any;
