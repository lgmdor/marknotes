<script>
	import SvelteMarkdown from 'svelte-markdown';
	import MdPreview from './MdPreview.svelte';
	import Dropdown from './Dropdown.svelte';
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

	const dropdownItems = [
		{ name: 'Edit', onclick: () => openEditor() },
		{ name: 'Delete', danger: true, onclick: () => deleteNote(note.id) }
	];

	const deleteNote = (id) => {
		db['notes'].delete(id);
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="note">
	<div class="wrap">
		<Dropdown menuItems={dropdownItems} />
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
		.wrap
			position: absolute
			top: vars.$misc-padding-small
			right: vars.$misc-padding-default
</style>
