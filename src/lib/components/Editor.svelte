<script>
	import { Editor, rootCtx, defaultValueCtx } from '@milkdown/core';
	import { gfm } from '@milkdown/preset-gfm';
	import { nord } from '@milkdown/theme-nord';
	import { history } from '@milkdown/plugin-history';
	import { indent } from '@milkdown/plugin-indent';
	import { prism } from '@milkdown/plugin-prism';
	import { clipboard } from '@milkdown/plugin-clipboard';
	import { math } from '@milkdown/plugin-math';
	import { listener, listenerCtx } from '@milkdown/plugin-listener';

	export let editorInput;

	function editor(dom) {
		Editor.make()
			.config((ctx) => {
				ctx.set(rootCtx, dom);
				ctx.set(defaultValueCtx, $editorInput);
				ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
					editorInput.update((input) => markdown);
				});
			})
			.use(nord)
			.use(gfm)
			.use(history)
			.use(indent)
			.use(prism)
			.use(clipboard)
			.use(math)
			.use(listener)
			.create();
	}
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-material-oceanic.min.css"
	/>
</svelte:head>

<div use:editor />

<style lang="sass">
@use '../../vars'

div
	height: 100%
	:global(.milkdown)
		height: 100%
		box-shadow: none
		:global(.editor)
			height: 100%
			outline: none
			border: none
			padding: 0
			background: vars.$color-dark-7
		:global(.editor>:first-child), :global(.editor>:last-child)
			margin: 0
		:global(.editor .paragraph)
			margin: 0
</style>
