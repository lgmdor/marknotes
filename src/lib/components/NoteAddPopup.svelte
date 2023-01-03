<script>
	import { createEventDispatcher, onMount } from 'svelte';
	import MarkdownIt from 'markdown-it';
	import Button from './Button.svelte';
	import { notes } from './../../stores.js';

	export let isPopupVisible = false;

	const dispatch = createEventDispatcher();
	const hidePopup = (e) => dispatch('hidePopup');

	//--------
	const md = new MarkdownIt();

	let mdInput,
		mdOutput = '';

	let elInput, elOutput;

	$: mdInput, updateMdOutput();

	const updateMdOutput = () => {
		if (elOutput) {
			elOutput.innerHTML = md.render(mdInput);
		}
	};

	const saveNote = () => {
		notes.update((notes) => [...notes, mdInput]);
		hidePopup();
	};

	onMount(() => {
		elInput.addEventListener('keydown', (e) => {
			console.log(e.key);
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
					placeholder="Enter text..."
					bind:value={mdInput}
					bind:this={elInput}
				/>
				<div class="preview" bind:this={elOutput} />
			</div>
			<div class="bottom">
				<div class="cancel">
					<Button text={'Cancel'} />
				</div>
				<Button variant={'filled'} text={'Save'} onclick={saveNote} />
			</div>
		</div>
	</div>
{/if}

<style lang="sass">
@use '../../vars'

$color-bg: vars.$color-dark-7
$color-border: vars.$color-dark-6

.bg
	position: fixed
	inset: 0
	background: transparentize(vars.$color-dark-8, 0.6)
	display: flex
	align-items: center
	justify-content: center
	.popup
		height: vars.$size-48
		width: vars.$size-64
		background: $color-bg
		color: vars.$color-text-2
		border-radius: vars.$misc-borderRadius
		border: 1px solid vars.$color-dark-6
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
				border-left: 1px solid $color-border
				line-height: 1.6
		.bottom
			height: vars.$size-4
			display: flex
			justify-content: flex-end
			align-items: center
			border-top: 1px solid $color-border
			padding: 0 vars.$misc-padding-default
			.cancel
				margin-right: vars.$size-1
</style>
