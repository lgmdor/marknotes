<script>
	import Note from '$lib/components/Note.svelte';
	import { isEditorVisible, db, notesLocal } from './../../stores.js';
	import { onMount } from 'svelte';

	const openEditor = () => {
		isEditorVisible.update((isEditorVisible) => true);
	};

	let notesDB;

	const loadNotes = () => {
		const trans = $db.transaction('notes').objectStore('notes').getAll();

		trans.onsuccess = (e) => {
			notesDB = [...trans.result];
		};
	};

	onMount(() => {
		loadNotes();
	});
</script>

<section>
	{#if notesDB || $notesLocal.length > 0}
		{#each [...notesDB, ...$notesLocal].reverse() as note}
			<Note text={note} on:openEditor={openEditor} />
		{/each}
	{/if}
</section>

<style lang="sass">
	@use '../../vars'

section
	padding: vars.$size-4
	display: grid
	grid-gap: vars.$size-2
	grid-template-columns: repeat(auto-fill, vars.$size-20)
	grid-auto-rows: minmax(min-content, max-content)
	width: 100%
</style>
