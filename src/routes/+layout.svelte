<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import 'iconify-icon';
	import '../styles/app.css';
	import '../styles/utilities.css';
	import Footer from '$lib/components/Footer.svelte';
	import { browser } from '$app/environment';
	import cartStore from '$lib/stores/cart.svelte';
	import { onMount, untrack } from 'svelte';
	import responsiveStore from '../lib/stores/responsive.svelte';

	const { children } = $props();

	$effect(() => {
		if (browser && !cartStore.loaded) {
			cartStore.load();
		}
	});

	onMount(() => {
		responsiveStore.checkIfMobile();
		if (browser) {
			window.addEventListener('resize', responsiveStore.checkIfMobile);
		}

		return () => {
			window.removeEventListener('resize', responsiveStore.checkIfMobile);
		};
	});
</script>

<div class="layout">
	<Navbar />
	<div class="content">
		{@render children()}
	</div>
	<Footer />
</div>

<style>
	.layout {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.content {
		flex: 1;
		padding-top: 60px;
	}
</style>
