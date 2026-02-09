<script>
	import { mount, onMount } from 'svelte';

	let {
		root,
		animated = true,
		animation = undefined,
		rootParams = undefined,
		swipeGesture = undefined,
		onionNavDidChange = undefined,
		onionNavWillChange = undefined
	} = $props();

	let ionNav = $state(undefined);
	let rootComponent = $state(undefined);

	const createHTMLCompFromSvelte = (component, componentProps = {}) => {
		const divWrapper = document.createElement('div');
		divWrapper.id = 'id' + Date.now();

		let navContent = document.createElement('div');
		divWrapper.appendChild(navContent);
		document.body.appendChild(divWrapper);

		mount(component, { target: navContent, props: componentProps });
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
