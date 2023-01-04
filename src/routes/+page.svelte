<script>
	import NoteEditor from '$lib/components/NoteEditor.svelte';
	import NoteList from '$lib/components/NoteList.svelte';
	import Menu from '$lib/components/Menu.svelte';
	import { isEditorVisible, db } from './../stores.js';

	export let data;

	const closeEditor = () => {
		isEditorVisible.update((isEditorVisible) => false);
	};

	db.update((db) => data.db);
</script>

<main>
	<NoteEditor on:closeEditor={closeEditor} />
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
