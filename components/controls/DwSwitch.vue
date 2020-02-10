<template>
  <div class="switch-button-control">
    <div class="switch-button" :class="{ enabled: isEnabled }" @click="toggle">
      <div class="button"></div>
    </div>
    <div class="switch-button-label">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    model: {
      prop: "isEnabled",
      event: "toggle"
    },
    props: {
      isEnabled: Boolean
    },
    methods: {
      toggle: function() {
        this.$emit("toggle", !this.isEnabled);
      }
    }
  }
</script>

<style lang="scss" scoped>
  .switch-button-control {
    display: flex;
    flex-direction: row;
    align-items: center;

    .switch-button {
      $switch-button-height: 1.25em;
      $switch-button-color: var(--color);
      $switch-button-border-thickness: 2px;
      $switch-transition: all 0.3s ease-in-out;
      $switch-is-rounded: true;
      background: var(--dark-gray);
      height: $switch-button-height;
      display: flex;
      align-items: center;
      width: 2rem;
      border: $switch-button-border-thickness solid $switch-button-color;
      box-shadow: inset 0px 0px $switch-button-border-thickness 0px
      rgba(0, 0, 0, 0.33);
      border-radius: if($switch-is-rounded, $switch-button-height, 0);

      transition: $switch-transition;

      $button-side-length: calc(
        #{$switch-button-height} - (2 * #{$switch-button-border-thickness})
      );

      cursor: pointer;

      .button {
        height: $button-side-length;
        width: $button-side-length;
        border: $switch-button-border-thickness solid $switch-button-color;
        border-radius: if($switch-is-rounded, $button-side-length, 0);
        background: var(--white);
        transform: translateX(0.1rem);
        transition: $switch-transition;
      }

      &.enabled {
        background-color: var(--dark-blue);
        box-shadow: none;

        .button {
          background: var(--white);
          transform: translateX(
              calc(#{$button-side-length} + (-1 *#{$switch-button-border-thickness}))
          );
        }
      }
    }
  }
</style>
