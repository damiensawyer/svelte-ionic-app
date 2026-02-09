<script lang="ts">
	import { mount, onMount } from 'svelte';

	let {
		root,
		animated = true,
		animation = undefined,
		rootParams = undefined,
		swipeGesture = undefined,
		onionNavDidChange = undefined,
		onionNavWillChange = undefined
	}: {
		root: any;
		animated?: boolean;
		animation?: ((baseEl: any, opts?: any) => Animation) | undefined;
		rootParams?: undefined | { [key: string]: any };
		swipeGesture?: boolean | undefined;
		onionNavDidChange?: ((e: any) => void) | undefined;
		onionNavWillChange?: ((e: any) => void) | undefined;
	} = $props();

	let ionNav: HTMLIonNavElement | undefined = $state(undefined);
	let rootComponent: HTMLElement | undefined = $state(undefined);

	const createHTMLCompFromSvelte = (
		component: any,
		componentProps: { [key: string]: any } = {}
	) => {
		const divWrapper = document.createElement('div');
		divWrapper.id = 'id' + Date.now();

		let navContent = document.createElement('div');
		navContent.id = divWrapper.id + '-content';
		navContent.style.height = '100%';

		divWrapper.appendChild(navContent);
		document.body.appendChild(divWrapper);

		mount(component, {
			target: navContent,
			props: { ...componentProps, ionNav }
		});

		return divWrapper;
	};

	onMount(() => {
		rootComponent = createHTMLCompFromSvelte(root, {});
	});
</script>

<ion-nav
	bind:this={ionNav}
	{animated}
	{animation}
	root-params={rootParams}
	swipe-gesture={swipeGesture}
	root={rootComponent}
	onionNavDidChange={onionNavDidChange}
	onionNavWillChange={onionNavWillChange}
></ion-nav>
