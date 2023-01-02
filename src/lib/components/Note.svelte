<script>
	export let text;
</script>

<div class="note">
	{text}
</div>

<style lang="sass">
  @use './../../vars'

  .note
    min-height: vars.$size-8
    width: vars.$size-12
    border: vars.$misc-border-default
    border-radius: vars.$misc-borderRadius
    color: vars.$color-text-2
    padding: vars.$misc-padding
    cursor: pointer
    &:hover
      box-shadow: 0 4px 7px transparentize(vars.$color-dark-9, 0.2)
</style>
