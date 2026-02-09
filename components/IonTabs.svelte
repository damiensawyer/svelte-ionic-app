<script>
	import { navigating, page } from '$app/stores';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';

	let {
		ionTabsDidChange = () => {},
		ionTabsWillChange = () => {},
		slot = 'bottom',
		tabs = [],
		children
	} = $props();

	let ionTabBarElement;
	let controller;

	const currentPage = get(page);
	const { pathname } = currentPage.url;
	const cleanedPath = pathname.replace(/\/+$/, '');
	const pathSplit = cleanedPath.split('/');
	let currentTabName = pathSplit[pathSplit.length - 1];
	let relativePath = cleanedPath.replace(currentTabName, '');

	$effect(() => {
		const nav = get(navigating);
		if (nav?.to) {
			tabs.forEach(async (tab) => {
				if (nav.to.url.pathname.includes(relativePath + tab.tab)) {
					currentTabName = tab.tab;
					await goto(nav.to.url.pathname);
					controller.select(tab.tab);
				}
			});
		}
	});

	onMount(async () => {
		controller = ionTabBarElement;
		controller.select(currentTabName);
	});

	const tabBarClick = async (selectedTab) => {
		currentTabName = selectedTab;
		await goto(relativePath + selectedTab);
		controller.select(selectedTab);
	};
</script>

<ion-tabs
	onionTabsDidChange={ionTabsDidChange}
	onionTabsWillChange={ionTabsWillChange}
	bind:this={ionTabBarElement}
>
	{@render children?.()}

	{#if slot === 'bottom' || slot === ''}
		<ion-tab-bar slot="bottom">
			{#each tabs as tab}
				<ion-tab-button
					tab={tab.tab}
					role="tab"
					tabindex="0"
					onkeydown={() => tabBarClick(tab.tab)}
					onclick={() => tabBarClick(tab.tab)}
				>
					<ion-label>{tab.label}</ion-label>
					<ion-icon icon={tab.icon}></ion-icon>
				</ion-tab-button>
			{/each}
		</ion-tab-bar>
	{/if}

	{#if slot === 'top'}
		<ion-tab-bar slot="top">
			{#each tabs as tab}
				<ion-tab-button
					tab={tab.tab}
					role="tab"
					tabindex="0"
					onkeydown={() => tabBarClick(tab.tab)}
					onclick={() => tabBarClick(tab.tab)}
				>
					<ion-label>{tab.label}</ion-label>
					<ion-icon icon={tab.icon}></ion-icon>
				</ion-tab-button>
			{/each}
		</ion-tab-bar>
	{/if}
</ion-tabs>
