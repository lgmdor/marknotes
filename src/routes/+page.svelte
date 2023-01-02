<script>
	import Note from '$lib/components/Note.svelte';
	import Button from '$lib/components/Button.svelte';
	import NoteAddPopup from '$lib/components/NoteAddPopup.svelte';
	import { notes } from './../stores.js';

	let showPopup = false;
</script>

<Button text="New Note" />

{#if showPopup}
	<NoteAddPopup />
{/if}
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
