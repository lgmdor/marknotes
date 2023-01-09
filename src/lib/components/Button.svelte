<script>
	export let text = 'Click';
	export let onclick = () => {};
	export let variant = 'default';
	export let fullWidth = false;
</script>

<button
	on:click={onclick}
	class:full-width={fullWidth}
	class:variant-default={variant === 'default'}
	class:variant-filled={variant === 'filled'}
	><div class="icon"><slot /></div>
	<span>{text}</span></button
>

<style lang="sass">
@use '../../vars'

button
  border: none
  padding: 0 18px
  height: 36px
  font-weight: 600
  font-size: 14px
  border-radius: vars.$misc-borderRadius
  line-height: 1
  user-select: none
  cursor: pointer
  transition: all 60ms linear
  min-width: vars.$size-6
  display: flex
  align-items: center
  justify-content: center
  &:active
    transform: translateY(1px)
  &.full-width
    width: 100%
  &.variant-default
    background: vars.$color-dark-6
    color: vars.$color-text-1
    border: vars.$misc-border-default
    &:hover
      background: transparentize(vars.$color-dark-4, 0.55)
  &.variant-filled
    background: vars.$color-main
    color: vars.$color-text-1
    &:hover
      background: darken(vars.$color-main, 6%)
  .icon :global(svg)
    height: 20px
    width: 20px
    stroke: #fff
    margin-right: 8px
</style>
