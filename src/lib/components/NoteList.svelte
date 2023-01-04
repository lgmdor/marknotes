<script>
	import Note from '$lib/components/Note.svelte';
	import { isEditorVisible, db, notesLocal } from './../../stores.js';
	import { onMount } from 'svelte';

	const openEditor = () => {
		isEditorVisible.update((isEditorVisible) => true);
	};

	let notes;

	const loadNotes = () => {
		const trans = $db.transaction('notes').objectStore('notes').getAll();

		trans.onsuccess = (e) => {
			notes = [...trans.result, ...$notesLocal];
		};
	};

	onMount(() => {
		loadNotes();
	});
</script>

<section>
	{#if notes}
		{#each [...notes, ...$notesLocal].reverse() as note}
			<Note text={note} on:openEditor={openEditor} />
		{/each}
	{/if}
</section>

<style lang="sass">
  @use '../../vars'

section
  padding: 0 vars.$size-2
  display: grid
  grid-gap: vars.$size-1
  grid-template-columns: repeat(auto-fill, vars.$size-16)
  width: 100%
  margin-top: vars.$size-4
</style>
