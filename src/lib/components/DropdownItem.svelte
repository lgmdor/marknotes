<script>
	export let text;
	export let onclick = () => {};
	export let danger = false;
</script>

<li on:click={onclick} aria-hidden="true" class:danger>
	<span>{text}</span>
</li>

<style lang="sass">
  @use './../../vars'

li
  display: flex
  align-items: center
  justify-content: flex-start
  height: vars.$size-2
  font-size: 14px
  border-radius: vars.$misc-borderRadius
  padding: 10px 12px
  transition: background 60ms linear
  &.danger
    color: vars.$color-red
    &:hover
      background: transparentize(vars.$color-red, 0.9)
  &:hover
    background: vars.$color-dark-5

</style>
