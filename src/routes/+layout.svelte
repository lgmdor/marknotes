<slot />

<style lang="sass">
@use '../vars'

:global(*)
  margin: 0
  padding: 0
  box-sizing: border-box

:global(body)
  background: vars.$color-dark-7
  display: flex
  justify-content: flex-start
  align-items: center
  flex-direction: column
  font-family: "Roboto"
  padding-left: vars.$size-16
</style>
