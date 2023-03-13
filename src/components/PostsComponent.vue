<script>
import axios from 'axios'
import SingleItem from './SingleItem.vue'

export default {
  components: {
    SingleItem
  },
  props: ['id'],
  data() {
    return {
      loading: true,
      error: false,
      posts: []
    }
  },
  async created() {
    console.log(this.id)
    await axios
      .get(`https://jsonplaceholder.typicode.com/users/${this.id}/posts`)
      .then((response) => {
        this.posts = response.data
      })
      .catch((error) => {
        this.error = error
        console.log(error)
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>

<template>
  <div class="posts__list">
    <RouterLink to="/">Go back</RouterLink>
    <div class="loading" v-if="loading">Loading...</div>
    <div class="error" v-else-if="error">{{ error }}</div>
    <ul class="posts__ul" v-else>
      <li class="posts__li" v-for="post in posts" :key="post.id">
        <SingleItem :type="'post'" :title="post.title" :body="post.body" />
      </li>
    </ul>
  </div>
</template>

<style>
.posts__list {
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 24px 48px;
}

.posts__ul {
  list-style: none;
  padding: 0;
}
</style>
