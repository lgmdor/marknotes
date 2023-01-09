<script>
	import Popup from '$src/lib/components/Popup.svelte';
	import NoteList from '$lib/components/NoteList.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import { isPopupVisible } from './../stores.js';

	//export let data;
</script>

<main>
	{#if $isPopupVisible}
		<Popup />
	{/if}
	<Menu />
	<NoteList />
</main>

<style lang="sass">
	@use '../vars'

	main
		display: flex
		min-height: 100vh
		width: 100%
</style>
