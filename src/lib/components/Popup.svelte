<script>
	import Button from './Button.svelte';
	import MdPreview from './MdPreview.svelte';
	import Multiselect from './Multiselect.svelte';
	import { isPopupVisible, editorNoteKey, editorInput } from '$src/stores.js';
	import SvelteMarkdown from 'svelte-markdown';
	import { Note } from '$src/classes.js';
	import { db } from '$src/db.js';
	import { liveQuery } from 'dexie';
	import Editor from './Editor.svelte';

	const svelteMarkdownOptions = {
		//https://marked.js.org/using_advanced#options
		headerIds: false,
		breaks: true
	};

	const closePopup = (e) => {
		isPopupVisible.update((isPopupVisible) => false);
		editorInput.update((input) => '');
		selectedTags = [];
	};

	const saveNote = async () => {
		const note = new Note($editorInput, selectedTags);
		let id;

		//https://dexie.org/docs/Table/Table.put()
		if ($editorNoteKey) {
			id = await db['notes'].put({ ...note, id: $editorNoteKey });
		} else {
			id = await db['notes'].add(note);
		}

		if (note.text.length == 0) {
			await db['notes'].delete(id);
		}

		editorNoteKey.update((editorNoteKey) => null);
		closePopup();
	};

	let selectedTags = [];

	const tags = liveQuery(() => db['tags'].toArray());

	const addTag = async (name) => {
		await db['tags'].add({ name });
	};

	const updateTags = (e) => {
		selectedTags = e.detail.selectedItems;
	};
</script>

{#if $isPopupVisible}
	<!--<div class="bg" on:click|self={closePopup} aria-hidden="true">-->
	<div class="bg" aria-hidden="true">
		<div class="popup">
			<div class="main">
				<div class="wrap">
					<Editor />
				</div>
				<div class="wrap">
					<MdPreview>
						<SvelteMarkdown source={$editorInput} options={svelteMarkdownOptions} />
					</MdPreview>
				</div>
			</div>
			<div class="bottom">
				<Multiselect
					items={tags}
					itemKeyName={'id'}
					itemTextName={'name'}
					addItem={addTag}
					on:selectionchange={updateTags}
				/>
				<div class="btns">
					<div class="cancel">
						<Button text={'Cancel'} onclick={closePopup} />
					</div>
					<Button variant={'filled'} text={'Save'} onclick={saveNote} />
				</div>
			</div>
		</div>
	</div>
{/if}

<style lang="sass">
@use '../../vars'


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
		background: vars.$color-dark-7
		color: vars.$color-text-2
		border-radius: vars.$misc-borderRadius
		border: vars.$misc-border-dark
		display: flex
		flex-direction: column
		box-shadow: vars.$misc-boxShadow
		.main
			display: flex
			flex: 1
			.wrap
				flex: 1
				padding: 16px
				border-left: vars.$misc-border-dark
		.bottom
			height: vars.$size-4
			display: flex
			justify-content: space-between
			align-items: center
			border-top: vars.$misc-border-dark
			padding: 0 16px
			.btns
				display: flex
				.cancel
					margin-right: vars.$size-1
</style>