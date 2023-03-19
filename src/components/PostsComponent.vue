<script>
import axios from 'axios'
import SingleItem from './SingleItem.vue'
import AnimationComponent from './AnimationComponent.vue'

export default {
  components: {
    SingleItem,
    AnimationComponent
  },
  props: ['id'],
  data() {
    return {
      isLoading: true,
      isError: false,
      posts: [],
      page: 1,
      total_items: 0
    }
  },
  created() {
    this.getPosts()
  },
  methods: {
    getPosts() {
      axios
        .get(`http://localhost:8080/users/${this.id}/posts?_page=${this.page}`)
        .then((response) => {
          if (response.data?.length === 0) {
            throw new Error('No posts found')
          }
  
          this.posts = response.data

          if (!this.total_items) {
            this.total_items = Math.ceil(response.headers['x-total-count'] / 10)
          }
        })
        .catch((error) => {
          console.log(this.isError);
          this.isError = error.message
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    handlePageChange(page) {
      if (page === 'prev') {
        this.page = this.page - 1
      } else if (page === 'next') {
        this.page = this.page + 1
      } else {
        this.page = page
      }
      this.getPosts()
    }
  }
}
</script>

<template>
  <div class="item_list_wrapper">
    <div class="go-back">
      <RouterLink to="/">Go back</RouterLink>
    </div>
    <AnimationComponent v-if="isLoading" :type="'loading'" />
    <AnimationComponent v-else-if="isError" :type="'error'" :msg="isError" />
    <div class="item_list" v-else>
      <ul class="items__ul">
        <li class="posts__li" v-for="post in posts" :key="post.id">
          <SingleItem :type="'post'" :title="post.title" :body="post.body" />
        </li>
      </ul>
      <div class="pagination_buttons">
        <button
          class="pagination__button"
          @click="handlePageChange('prev')"
          :disabled="this.page === 1"
        >
          Prev
        </button>
        <button
          class="pagination__button"
          v-for="page_no in total_items"
          :key="page_no"
          :class="this.page === page_no ? 'active' : ''"
          @click="handlePageChange(page_no)"
        >
          {{ page_no }}
        </button>
        <button
          class="pagination__button"
          @click="handlePageChange('next')"
          :disabled="this.page === this.total_items"
        >
          Next
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.go-back {
  width: 100%;
  display: flex;
  justify-content: flex-start;
}

.pagination_buttons {
  display: flex;
  justify-content: center;
}
</style>