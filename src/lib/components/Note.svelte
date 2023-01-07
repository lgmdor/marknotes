<script>
	import SvelteMarkdown from 'svelte-markdown';
	import MdPreview from './MdPreview.svelte';
	import Dropdown from './Dropdown.svelte';
	import DropdownItem from './DropdownItem.svelte';
	import { isEditorVisible, editorInput, editorNoteKey } from './../../stores.js';
	import { db } from '$src/db.js';

	export let note;

	const openEditor = () => {
		isEditorVisible.update((isEditorVisible) => true);
		editorInput.update((editorInput) => note.text);
		editorNoteKey.update((editorNoteKey) => note.id);
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

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="note">
	<div class="wrap">
		<Dropdown>
			<DropdownItem text={'Edit'} onclick={openEditor} />
			<DropdownItem text={'Delete'} onclick={deleteNote} danger={true} />
		</Dropdown>
	</div>
	<MdPreview><SvelteMarkdown source={note.text} options={svelteMarkdownOptions} /></MdPreview>
</div>

<style lang="sass">
	@use './../../vars'

	.note
		border: vars.$misc-border-default
		border-radius: vars.$misc-borderRadius
		color: vars.$color-text-2
		transition: boxs-shadow 60ms linear
		background: mix(vars.$color-dark-6, vars.$color-dark-7, 50%)
		padding: vars.$misc-padding-small vars.$misc-padding-default
		position: relative
		min-height: calc(vars.$misc-padding-small * 2 + vars.$size-1 * 1.5 + 2px)
		.wrap
			position: absolute
			top: vars.$misc-padding-small
			right: vars.$misc-padding-default
</style>
