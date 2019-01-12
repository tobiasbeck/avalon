<template>
<div class="knight-name">
    <label>Medieval Name</label>
    <b-button-group class="full-width">
      <b-button :variant="locEnabled == true ? 'bronze': 'secondary'" @click="locEnabled = true">Yes</b-button>
      <b-button :variant="locEnabled == false ? 'bronze': 'secondary'"  @click="locEnabled = false">No</b-button>
    </b-button-group>
    <template v-if="locEnabled == true">
    <label>Gender</label>
    <b-button-group class="full-width">
      <b-button :variant="locGender == 'm' ? 'bronze': 'secondary'" @click="locGender = 'm'">Male</b-button>
      <b-button :variant="locGender == 'f' ? 'bronze': 'secondary'"  @click="locGender = 'f'">Female</b-button>
    </b-button-group>
    </template>
    </div>  
</template>

<script>
export default {
  props: {
    enabled: {
      type: Boolean,
      default: false,
    },
    gender: {
      type: String,
      default: 'm'
    }
  },

  computed: {
    locEnabled: {
      get () {
        return this.enabled;
      }, 
      set (value) {
        this.$emit('update:enabled', value);
      }
    },
    locGender: {
      get () {
        return this.gender;
      }, 
      set (value) {
        this.$emit('update:gender', value);
      }
    }
  }
}
</script>

<style lang="less">
  .knight-name {
    margin-bottom:12px;
    label {
      font-weight: bold;
      margin-bottom: 0px;
      margin-top:12px;
      &:first-child {
        margin-top: 0px; 
      }
    }
    .full-width {
    width: 100%;
    .btn {
      width: 50%;
    }
  }
  }
  
</style>
