<script>
	import SvelteMarkdown from 'svelte-markdown';
	import MdPreview from './MdPreview.svelte';
	import Dropdown from './Dropdown.svelte';
	import { isEditorVisible, editorInput } from './../../stores.js';

	export let text;

	const openEditor = () => {
		isEditorVisible.update((isEditorVisible) => true);
		editorInput.update((editorInput) => text);
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
	<div class="top">
		<div class="title">Title</div>
		<Dropdown menuItems={dropdownItems} />
	</div>
	<div class="bottom">
		<MdPreview><SvelteMarkdown source={text} options={svelteMarkdownOptions} /></MdPreview>
	</div>
</div>

<style lang="sass">
  @use './../../vars'

  .note
    border: vars.$misc-border-dark
    border-radius: vars.$misc-borderRadius
    color: vars.$color-text-2
    transition: boxs-shadow 60ms linear
    background: transparentize(vars.$color-dark-6, 0.8)
    &:hover
      box-shadow: vars.$misc-boxShadow
    .top
      width: 100%
      border-bottom: vars.$misc-border-dark
      display: flex
      justify-content: space-between
      align-items: center
      padding: 10px vars.$size-1
      .title
        font-weight: bold
        height: vars.$misc-padding-big
        display: flex
        align-items: center
        justify-content: center
    .bottom
      padding: vars.$misc-padding-default
</style>
