<script>
	// @ts-ignore
	import IconTrash from '$lib/assets/icon_trash.svg?component';
	// @ts-ignore
	import IconEdit from '$lib/assets/icon_edit.svg?component';
	import SvelteMarkdown from 'svelte-markdown';
	import MdPreview from './MdPreview.svelte';
	import Dropdown from './Dropdown.svelte';
	import DropdownItem from './DropdownItem.svelte';
	import { isPopupVisible, editorInput, editorNoteKey, editorNoteTags } from './../../stores.js';
	import { db } from '$src/db.js';
	import Editor from './Editor.svelte';

	export let note;

	const openPopup = () => {
		isPopupVisible.update((isPopupVisible) => true);
		editorInput.update((input) => note.text);
		editorNoteKey.update((key) => note.id);
		editorNoteTags.update((tags) => note.tags);
	};

	const svelteMarkdownOptions = {
		//https://marked.js.org/using_advanced#options
		headerIds: false,
		breaks: true
	};

	const deleteNote = () => {
		db['notes'].delete(note.id);
	};
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div class="note">
	<div class="top">
		<div class="wrap">
			<Dropdown>
				<DropdownItem text={'Edit'} onclick={openPopup}>
					<IconEdit />
				</DropdownItem>
				<DropdownItem text={'Delete'} onclick={deleteNote} danger={true}>
					<IconTrash />
				</DropdownItem>
			</Dropdown>
		</div>
		<Editor input={editorInput} output={note.text} />
	</div>
</div>

<style lang="sass">
	@use './../../vars'

	.note
		border: vars.$misc-border-default
		border-radius: vars.$misc-borderRadius
		color: vars.$color-text-2
		transition: boxs-shadow 60ms linear
		background: mix(vars.$color-dark-6, vars.$color-dark-7, 50%)
		position: relative
		min-height: calc(vars.$misc-padding-small * 2 + vars.$size-1 * 1.5 + 2px)
		.top
			padding: vars.$misc-padding-small vars.$misc-padding-default
			.wrap
				position: absolute
				top: vars.$misc-padding-small
				right: vars.$misc-padding-default
				z-index: 1
		/*.tags
			background: vars.$color-dark-7
			border-top: vars.$misc-border-default
			border-bottom-left-radius: vars.$misc-borderRadius
			border-bottom-right-radius: vars.$misc-borderRadius
			padding: vars.$misc-padding-small vars.$misc-padding-default
			display: flex
			align-items: center
			.no-tags
				font-size: 12px
				text-transform: uppercase
				color: vars.$color-text-3
				font-weight: bold
				letter-spacing: 0.25px
				height: 20px
				line-height: 18px
				display: flex
				align-items: center*/
</style>
