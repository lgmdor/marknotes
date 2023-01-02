<script>
	export let text = 'Click';
	export let onclick = () => {};
</script>

<button on:click={onclick}>{text}</button>

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
  &:active
    transform: translateY(1px)
</style>
