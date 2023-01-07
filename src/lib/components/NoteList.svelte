<script>
	import Note from '$lib/components/Note.svelte';
	import { isEditorVisible } from './../../stores.js';
	import { liveQuery } from 'dexie';
	import { db } from '$src/db.js';

	const openEditor = () => {
		isEditorVisible.update((isEditorVisible) => true);
	};

	let notes = liveQuery(() => db['notes'].toArray());
</script>

<section>
	{#if true}
		{#each $notes?.reverse() || [] as note (note.id)}
			<Note {note} on:openEditor={openEditor} />
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
