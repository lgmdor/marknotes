<script>
	import { notes } from './../../stores.js';
	import { onMount } from 'svelte';

	let noteTitle,
		noteText = '';

	let isBarExpanded = false;
	let textarea;

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

	const expandBar = (e) => {
		isBarExpanded = true;
	};

	const shrinkBar = () => {
		isBarExpanded = false;
	};
</script>

<div class="bar">
	{#if isBarExpanded}
		<input type="text" placeholder="Title" bind:value={noteTitle} />
	{/if}
	<div
		class="textarea"
		contenteditable="true"
		role="textbox"
		placeholder="Add note..."
		on:keydown={addNote}
		on:click|self={expandBar}
		on:focusout={shrinkBar}
		bind:innerHTML={noteText}
	/>
	{#if isBarExpanded}
		<div class="icons">oki</div>
	{/if}
</div>

<style lang="sass">
@use './../../vars'

.bar
	width: vars.$size-32
	border: vars.$misc-border-default
	border-radius: vars.$misc-borderRadius
	display: flex
	flex-direction: column
	input, .textarea
		outline: none
		border: none
		color: vars.$color-text-2
		padding: vars.$misc-padding-default
		background: transparent
		font-size: 1rem
	input
		font-size: 1.2rem
		padding-bottom: 0
	.textarea
		font-family: "Lato"
		font-size: 1rem
		resize: none
		cursor: text
		&:empty::before
			content: "Take a note..."
	input::placeholder,
	.textarea:empty::before
		color: vars.$color-dark-2
		font-weight: bold
	.icons
		padding-left: vars.$misc-padding-default
		padding-right: vars.$misc-padding-default
		padding-bottom: vars.$misc-padding-default
</style>
