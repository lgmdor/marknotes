<script>
	import Note from '$lib/components/Note.svelte';
	import { liveQuery } from 'dexie';
	import { db } from '$src/db.js';
	import Masonry from 'svelte-bricks';

	let notes;

	const tags = liveQuery(() => db['tags'].toArray());

	const updateNotes = () => {
		if ($tags) {
			notes = liveQuery(() =>
				db['notes']
					.filter((note) =>
						note.tags.some((tagNote) =>
							$tags.filter((tagFilter) => tagFilter.isActive).some((tag) => tag.name === tagNote)
						)
					)
					.toArray()
			);
		}
	};

	$: $tags, updateNotes();

	// https://www.npmjs.com/package/svelte-bricks#Props
	const settings = {
		minColWidth: 216,
		maxColWidth: 320,
		gap: 32,
		animate: false
	};

	//$: $tags, updateNotesActive();
	//$: $notes, updateNotesActive();
</script>

<section>
	{#if $notes && $tags && $notes.length > 0}
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
