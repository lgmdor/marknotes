<script>
	import SvelteMarkdown from 'svelte-markdown';
	import MdPreview from './MdPreview.svelte';
	import Dropdown from './Dropdown.svelte';
	import { isEditorVisible, editorInput } from './../../stores.js';

	export let note;

	const openEditor = () => {
		isEditorVisible.update((isEditorVisible) => true);
		editorInput.update((editorInput) => note.text);
	};

	const svelteMarkdownOptions = {
		//https://marked.js.org/using_advanced#options
		headerIds: false,
		breaks: true
	};

	const dropdownItems = [
		{ name: 'Edit', onclick: () => openEditor() },
		{ name: 'Delete', danger: true, onclick: () => {} }
	];
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
		border: vars.$misc-border-dark
		border-radius: vars.$misc-borderRadius
		color: vars.$color-text-2
		transition: boxs-shadow 60ms linear
		background: transparentize(vars.$color-dark-6, 0.8)
		padding: vars.$misc-padding-small vars.$misc-padding-default
		position: relative
		&:hover
			box-shadow: vars.$misc-boxShadow
		.wrap
			position: absolute
			top: vars.$misc-padding-small
			right: vars.$misc-padding-default
</style>
