<script>
	import { fly } from 'svelte/transition';
	import { onDestroy, onMount } from 'svelte';

	let {
		animation = { in: { x: 1000, duration: 300 }, out: { x: -1000, duration: 300 } },
		ionViewWillEnter = () => {},
		ionViewDidEnter = () => {},
		ionViewDidLeave = () => {},
		children
	} = $props();

	onMount(() => {
		ionViewDidEnter();
	});

	onDestroy(() => {
		ionViewDidLeave();
	});
</script>

<div class="ion-page" in:fly={animation.in} out:fly={animation.out}>
	{@render children?.()}
</div>
