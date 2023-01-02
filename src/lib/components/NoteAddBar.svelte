<script>
	import { notes } from './../../stores.js';

	let noteText = '';

	const addNote = (e) => {
		if (e.key === 'Enter') {
			notes.update((notes) => [...notes, noteText]);
			console.log($notes);
			clearInput();
		}
	};

	const clearInput = () => {
		noteText = '';
	};
</script>

<div class="bar">
	<input type="text" placeholder="Add note..." bind:value={noteText} on:keydown={addNote} />
</div>

<style lang="sass">
@use './../../vars'

.bar
  height: vars.$size-2
  width: 50vw
  border: vars.$misc-border-default
  border-radius: vars.$misc-borderRadius
  input
    height: 100%
    outline: none
    border: none
    width: 80%
    background: transparent
    color: vars.$color-text-2
    padding: 0 vars.$misc-padding
</style>
