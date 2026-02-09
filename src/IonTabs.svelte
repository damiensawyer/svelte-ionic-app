<script lang="ts">
	import { onMount } from 'svelte';
	import { page } from '$app/stores';
	import { goto } from '$app/navigation';
	import { get } from 'svelte/store';

	let {
		ionTabsDidChange = () => {},
		ionTabsWillChange = () => {},
		slot = 'bottom',
		tabs = [],
		children
	}: {
		ionTabsDidChange?: () => void;
		ionTabsWillChange?: () => void;
		slot?: string;
		tabs: { label: string; icon: string; tab: string }[];
		children?: any;
	} = $props();

	let ionTabBarElement: HTMLIonTabsElement;
	let controller: HTMLIonTabsElement;

	onMount(async () => {
		controller = ionTabBarElement;
		const currentPage = get(page);
		const { pathname } = currentPage.url;
		let tabInPathName = pathname.split('/').at(-1);

		if (tabInPathName && tabs.length > 0) {
			if (!tabs.map((tab) => tab.tab).includes(tabInPathName)) {
				await goto(tabInPathName + '/' + tabs[0]?.tab);
				controller.select(tabs[0]?.tab);
			}
		} else {
			console.warn('Incorrect route or no tabs supplied for IonTabs', currentPage.url, tabs);
			goto('/');
		}
	});

	const tabBarClick = async (selectedTab: string) => {
		await goto(selectedTab);
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
