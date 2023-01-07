<script>
	import { onMount } from 'svelte';
	import Button from './Button.svelte';
	import MdPreview from './MdPreview.svelte';
	import { isEditorVisible, editorInput, editorNoteKey } from '../../stores.js';
	import SvelteMarkdown from 'svelte-markdown';
	import { Note } from './../../classes.js';
	import { db } from '$src/db.js';

	const svelteMarkdownOptions = {
		//https://marked.js.org/using_advanced#options
		headerIds: false,
		breaks: true
	};

	const closeEditor = (e) => {
		isEditorVisible.update((isEditorVisible) => false);
		clearEditor();
	};

	let elInput;

	const saveNote = async () => {
		const note = new Note($editorInput);

		//https://dexie.org/docs/Table/Table.put()
		if ($editorNoteKey) {
			await db['notes'].put({ ...note, id: $editorNoteKey });
		} else {
			await db['notes'].add(note);
		}

		editorNoteKey.update((editorNoteKey) => null);
		closeEditor();
	};

	const clearEditor = () => editorInput.update((editorInput) => '');

	onMount(() => {
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
					bind:value={$editorInput}
					bind:this={elInput}
				/>
				<div class="wrap">
					<MdPreview>
						<SvelteMarkdown source={$editorInput} options={svelteMarkdownOptions} />
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
	z-index: 9
	position: fixed
	inset: 0
	display: flex
	align-items: center
	justify-content: center
	backdrop-filter: blur(2px) brightness(60%)
	.popup
		height: vars.$size-48
		width: calc(vars.$size-64 + vars.$size-16)
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
				padding: 16px
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
			padding: 0 16px
			.cancel
				margin-right: vars.$size-1
</style>
