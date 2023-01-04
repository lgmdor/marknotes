<script>
	import Button from '$lib/components/Button.svelte';
	import NoteEditor from '$lib/components/NoteEditor.svelte';
	import NoteList from '$lib/components/NoteList.svelte';
	import { isEditorVisible, db } from './../stores.js';

	export let data;

	const openEditor = (e) => {
		isEditorVisible.update((isEditorVisible) => true);
	};
	const closeEditor = () => {
		isEditorVisible.update((isEditorVisible) => false);
	};

	db.update((db) => data.db);
</script>

<Button text="New Note" onclick={openEditor} variant={'filled'} />

<NoteEditor on:closeEditor={closeEditor} />

<NoteList />

<style lang="sass">
	@use '../vars'
</style>
