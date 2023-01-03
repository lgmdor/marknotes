<script>
	import MarkdownIt from 'markdown-it';

	const md = new MarkdownIt();

	export let text;
</script>

<div class="note">
	{@html md.render(text)}
</div>

<style lang="sass">
  @use './../../vars'

  .note
    min-height: vars.$size-8
    width: vars.$size-12
    border: vars.$misc-border-default
    border-radius: vars.$misc-borderRadius
    color: vars.$color-text-2
    padding: vars.$misc-padding-default
    cursor: pointer
    transition: boxs-shadow 60ms linear
    &:hover
      box-shadow: vars.$misc-boxShadow
</style>
