<script>
import loading from '@/assets/anim/loading.json'
import notfound from '@/assets/anim/notfound.json'

export default {
  name: 'AnimationComponent',
  props: {
    type: {
      type: String,
      required: true
    },
    msg: {
      type: String
    }
  },
  data() {
    return {
      loading,
      notfound
    }
  }
}
</script>

<template>
  <div class="animation">
    <lottie-animation
      v-if="type === 'loading'"
      :animation-data="loading"
      :auto-play="true"
      :loop="true"
      :speed="1"
      ref="anim"
    />
    <span v-else-if="type === 'error'">
      <lottie-animation
        :animation-data="notfound"
        :auto-play="true"
        :loop="true"
        :speed="1"
        ref="anim"
      />
      <p>{{ msg }}</p>
    </span>
  </div>
</template>

<style scoped>
.animation {
    display: flex;
    flex: 1;
    justify-content: center;
    align-items: center;
    text-align: center;
    width: 300px;
}
</style>