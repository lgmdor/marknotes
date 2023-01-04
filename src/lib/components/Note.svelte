<script>
	import SvelteMarkdown from 'svelte-markdown';
	import MdPreview from './MdPreview.svelte';
	import { isEditorVisible, editorInput } from './../../stores.js';

	export let text;

	const openEditor = (e) => {
		isEditorVisible.update((isEditorVisible) => true);
		editorInput.update((editorInput) => text);
	};

	const svelteMarkdownOptions = {
		//https://marked.js.org/using_advanced#options
		headerIds: false,
		breaks: true
	};
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="note" on:click={openEditor}>
	<div class="top">
		<div class="title">Title</div>
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
    cursor: pointer
    transition: boxs-shadow 60ms linear
    background: transparentize(vars.$color-dark-6, 0.8)
    &:hover
      box-shadow: vars.$misc-boxShadow
    .top
      width: 100%
      border-bottom: vars.$misc-border-dark
      .title
        font-weight: bold
    .top, .bottom
      padding: vars.$misc-padding-default
</style>
