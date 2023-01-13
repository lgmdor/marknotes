<script>
	import { Editor, rootCtx, defaultValueCtx, editorViewOptionsCtx } from '@milkdown/core';
	import { gfm } from '@milkdown/preset-gfm';
	import { nord } from '@milkdown/theme-nord';
	import { history } from '@milkdown/plugin-history';
	import { indent } from '@milkdown/plugin-indent';
	import { prism } from '@milkdown/plugin-prism';
	import { clipboard } from '@milkdown/plugin-clipboard';
	import { math } from '@milkdown/plugin-math';
	import { listener, listenerCtx } from '@milkdown/plugin-listener';
	import { onMount, onDestroy } from 'svelte';

	export let input;
	export let output = '';

	let wrapper;
	let editorCurr;

	$: output, makeEditor();

	const makeEditor = async () => {
		if (wrapper) {
			if (editorCurr) {
				await editorCurr.destroy();
			}
			editorCurr = await Editor.make()
				.config((ctx) => {
					if (output.length > 0) {
						ctx.set(defaultValueCtx, output);
						ctx.set(editorViewOptionsCtx, { editable: () => false });
					} else {
						ctx.set(defaultValueCtx, $input);
					}

					ctx.set(rootCtx, wrapper);
					ctx.get(listenerCtx).markdownUpdated((ctx, markdown, prevMarkdown) => {
						input.update((input) => markdown);
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
	};

	onMount(() => {
		makeEditor();
	});

	onDestroy(async () => {
		if (editorCurr) {
			await editorCurr.destroy();
		}
	});
</script>

<svelte:head>
	<link
		rel="stylesheet"
		href="https://cdnjs.cloudflare.com/ajax/libs/prism-themes/1.9.0/prism-material-oceanic.min.css"
	/>
</svelte:head>

<div bind:this={wrapper} class:transparentBg={output.length > 0} />

<style lang="sass">
@use '../../vars'

div
	height: 100%
	:global(.milkdown)
		height: 100%
		box-shadow: none
		background: transparent
		:global(.editor)
			height: 100%
			outline: none
			border: none
			padding: 0
			background: transparent
		:global(.editor>:first-child)
			margin-top: 0
		:global(.editor>:last-child)
			margin-bottom: 0
		:global(.editor .paragraph)
			margin: 0
		:global(.editor p)
			line-height: calc(1em + 1ex)
		:global(.heading)
			padding-bottom: 0.3em
			margin-top: 24px
			margin-bottom: 16px
		:global(.editor h1)
			border-bottom: 1px solid #ffffff22
			font-size: 2em
			letter-spacing: 0.25px
		:global(.editor h2)
			font-size: 1.5em
		:global(.editor h3)
			font-size: 1.25em
		:global(.editor h4)
			font-size: 1em
		:global(.editor h5)
			font-size: 0.875em
		:global(.editor h6)
			font-size: 0.85em
			color: vars.$color-text-3

		:global(p), :global(ul), :global(ol), :global(pre), :global(table), :global(hr)
			margin-bottom: 16px
</style>
