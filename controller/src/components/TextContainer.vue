<template>
<transition appear :name="transition" v-on:before-leave="test()">
  <div :class="['text-' + type]">
    <slot>Nothing to see here :/</slot>
  </div>
</transition>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'cartoon'
    }
  },
  computed: {
    transition () {
      if (this.type=="roll") {
        return 'roll';
      }
      return 'default';
    }
  },
  methods: {
    test() {
      console.log('CALLED');
    }
  }
}
</script>
