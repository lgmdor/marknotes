<script>
	import Note from '$lib/components/Note.svelte';
	import { isEditorVisible } from './../../stores.js';
	import { liveQuery } from 'dexie';
	import { db } from '$src/db.js';
	import Masonry from 'svelte-bricks';

	const openEditor = () => {
		isEditorVisible.update((isEditorVisible) => true);
	};

	let notes = liveQuery(() => db['notes'].toArray());

	// https://www.npmjs.com/package/svelte-bricks#Props
	const settings = {
		minColWidth: 216,
		maxColWidth: 320,
		gap: 32,
		animate: false
	};
</script>

<section>
	{#if $notes?.length > 0}
		<Masonry items={$notes} {...settings} let:item>
			<Note note={item} />
		</Masonry>
	{/if}
</section>

<style lang="sass">
	@use '../../vars'

section
	padding: vars.$size-4
	width: 100%
	:global(div.masonry)
		justify-content: flex-start
</style>
