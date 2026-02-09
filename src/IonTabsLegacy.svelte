<script lang="ts">
	import { onMount } from 'svelte';
	import * as ionIcons from 'ionicons/icons';

	let {
		tabs,
		selected = undefined,
		ionTabsDidChange = (_event: any) => {},
		ionNavWillLoad = (_event: any) => {},
		ionTabsWillChange = (_event: any) => {},
		slot = 'bottom'
	}: {
		tabs: any[];
		selected?: string | undefined;
		ionTabsDidChange?: (event: any) => void;
		ionNavWillLoad?: (event: any) => void;
		ionTabsWillChange?: (event: any) => void;
		slot?: string;
	} = $props();

	let ionTabBarElement: any;
	let tries = 0;
	let controller: any;

	const selectTab = async () => {
		if (controller?.select) {
			controller.select(selected).then(async () => {
				await controller.getSelected();
			});
		}
		if (tries < 5) {
			setTimeout(() => {
				tries++;
				selectTab();
			}, 5);
		}
	};

	onMount(() => {
		controller = ionTabBarElement;
		if (selected) selectTab();
	});

	console.warn(
		'IonTabsLegacy used - will be deprecated in the future - https://github.com/Tommertom/ionic-svelte-tabs-howto'
	);
</script>

<ion-tabs
	onionTabsDidChange={ionTabsDidChange}
	onionNavWillLoad={ionNavWillLoad}
	onionTabsWillChange={ionTabsWillChange}
	bind:this={ionTabBarElement}
>
	{#each tabs as tab}
		<ion-tab tab={tab.tab}>
			<tab.component />
		</ion-tab>
	{/each}

	{#if slot === 'bottom' || slot === ''}
		<ion-tab-bar slot="bottom" selected-tab={selected}>
			{#each tabs as tab}
				<ion-tab-button tab={tab.tab}>
					<ion-label>{tab.label}</ion-label>
					<ion-icon icon={ionIcons[tab.icon]}></ion-icon>
				</ion-tab-button>
			{/each}
		</ion-tab-bar>
	{/if}

	{#if slot === 'top'}
		<ion-tab-bar slot="top" selected-tab={selected}>
			{#each tabs as tab}
				<ion-tab-button tab={tab.tab}>
					<ion-label>{tab.label}</ion-label>
					<ion-icon icon={ionIcons[tab.icon]}></ion-icon>
				</ion-tab-button>
			{/each}
		</ion-tab-bar>
	{/if}
</ion-tabs>
