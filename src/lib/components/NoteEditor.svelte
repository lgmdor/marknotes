<script>
	import { onMount } from 'svelte';
	import Button from './Button.svelte';
	import MdPreview from './MdPreview.svelte';
	import { isEditorVisible, db, notesLocal } from '../../stores.js';
	import SvelteMarkdown from 'svelte-markdown';

	const svelteMarkdownOptions = {
		//https://marked.js.org/using_advanced#options
		headerIds: false
	};

	const closeEditor = (e) => {
		isEditorVisible.update((isEditorVisible) => false);
		clearEditor();
	};

	export let mdInput = '';

	let elInput;

	const saveNote = () => {
		notesLocal.update(($notesLocal) => [...$notesLocal, mdInput]);

		$db.transaction('notes', 'readwrite').objectStore('notes').add(mdInput, Math.random());

		closeEditor();
	};

	const clearEditor = () => (mdInput = '');

	onMount(() => {
		//console heult hier
		/**elInput.addEventListener('keydown', (e) => {
			if (e.key === 'Tab') {
				e.preventDefault();

				elInput.setRangeText('    ', elInput.selectionStart, elInput.selectionStart, 'end');
			}
		});*/
	});
</script>

{#if $isEditorVisible}
	<!--<div class="bg" on:click|self={closeEditor} aria-hidden="true">-->
	<div class="bg" aria-hidden="true">
		<div class="popup">
			<div class="main">
				<textarea
					class="md-editor"
					placeholder="Write something..."
					bind:value={mdInput}
					bind:this={elInput}
				/>
				<div class="wrap">
					<MdPreview>
						<SvelteMarkdown source={mdInput} options={svelteMarkdownOptions} />
					</MdPreview>
				</div>
			</div>
			<div class="bottom">
				<div class="cancel">
					<Button text={'Cancel'} onclick={closeEditor} />
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
			.md-editor, .wrap
				flex: 1
				padding: vars.$misc-padding-default
			.md-editor
				resize: none
				background: $color-bg
				border: none
				outline: none
				font-family: "Roboto Slab"
				color: vars.$color-text-2
				font-size: 1rem
				line-height: calc(1em + 1ex)
				//white-space: pre
			.wrap
				border-left: vars.$misc-border-dark
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
