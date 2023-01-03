<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import Button from './Button.svelte';
	import { notes } from './../../stores.js';
	import SvelteMarkdown from 'svelte-markdown';

	export let isPopupVisible = false;

	const dispatch = createEventDispatcher();

	const hidePopup = (e) => {
		dispatch('hidePopup');
		clearEditor();
	};

	let mdInput = '';

	let elInput;

	const saveNote = () => {
		notes.update((notes) => [...notes, mdInput]);
		hidePopup();
	};

	const clearEditor = () => (mdInput = '');

	onMount(() => {
		//console heult hier
		elInput.addEventListener('keydown', (e) => {
			if (e.key === 'Tab') {
				e.preventDefault();

				elInput.setRangeText('    ', elInput.selectionStart, elInput.selectionStart, 'end');
			}
		});
	});
</script>

{#if isPopupVisible}
	<div class="bg" on:click|self={hidePopup} aria-hidden="true">
		<div class="popup">
			<div class="main">
				<textarea
					class="editor"
					placeholder="Write something..."
					bind:value={mdInput}
					bind:this={elInput}
				/>
				<div class="preview">
					<SvelteMarkdown source={mdInput} />
				</div>
			</div>
			<div class="bottom">
				<div class="cancel">
					<Button text={'Cancel'} onclick={hidePopup} />
				</div>
				<Button variant={'filled'} text={'Save'} onclick={saveNote} />
			</div>
		</div>
	</div>
{/if}

<style lang="sass">
@use '../../vars'

$color-bg: vars.$color-dark-7

.bg
	position: fixed
	inset: 0
	background: transparentize(vars.$color-dark-8, 0.4)
	display: flex
	align-items: center
	justify-content: center
	.popup
		height: vars.$size-48
		width: vars.$size-64
		background: $color-bg
		color: vars.$color-text-2
		border-radius: vars.$misc-borderRadius
		border: vars.$misc-border-dark
		display: flex
		flex-direction: column
		box-shadow: vars.$misc-boxShadow
		.main
			display: flex
			flex: 1
			.editor, .preview
				flex: 1
				padding: vars.$misc-padding-default
			.editor
				resize: none
				background: $color-bg
				border: none
				outline: none
				font-family: "Lato"
				color: vars.$color-text-2
				font-size: 1rem
			.preview
				border-left: vars.$misc-border-dark
				line-height: 1.6
		.bottom
			height: vars.$size-4
			display: flex
			justify-content: flex-end
			align-items: center
			border-top: vars.$misc-border-dark
			padding: 0 vars.$misc-padding-default
			.cancel
				margin-right: vars.$size-1
</style>
