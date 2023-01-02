<script>
	import NoteAddBar from '$lib/components/NoteAddBar.svelte';
	import Note from '$lib/components/Note.svelte';
	import { notes } from './../stores.js';
</script>

<NoteAddBar />
<section>
	{#each $notes.reverse() as note (note)}
		<Note text={note} />
	{/each}
</section>

<style lang="sass">
  @use '../vars'

section
  padding: 0 vars.$size-2
  display: grid
  grid-gap: vars.$size-1
  grid-template-columns: repeat(auto-fill, vars.$size-12)
  width: 100%
  margin-top: vars.$size-4
</style>
