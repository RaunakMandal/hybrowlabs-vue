<script>
import axios from 'axios'
import SingleItem from './SingleItem.vue'
import AnimationComponent from './AnimationComponent.vue'

export default {
  components: {
    SingleItem,
    AnimationComponent
  },

  data() {
    return {
      isLoading: true,
      users: [],
      isError: false,
      sortColumn: 'name',
      sortDirection: 'asc',
      page: 1,
      total_items: 0
    }
  },
  created() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      axios
        .get(`${import.meta.env.VITE_API_URL}/users?_page=${this.page}`)
        .then((response) => {
          if (!response.data) {
            throw new Error('No users found')
          }

          this.users = response.data

          if (!this.total_items) {
            this.total_items = Math.ceil(response.headers['x-total-count'] / 10)
          }

          this.sortUsers()
        })
        .catch((error) => {
          this.isLoading = error
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    sortUsers() {
      // TODO: Sort logic to be changed
      this.users.sort((a, b) => {
        if (this.sortDirection === 'asc') {
          if (a[this.sortColumn] < b[this.sortColumn]) {
            return -1
          }
          if (a[this.sortColumn] > b[this.sortColumn]) {
            return 1
          }
          return 0
        } else {
          if (a[this.sortColumn] < b[this.sortColumn]) {
            return 1
          }
          if (a[this.sortColumn] > b[this.sortColumn]) {
            return -1
          }
          return 0
        }
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
      this.getUsers()
    }
  },
  watch: {
    sortColumn() {
      this.sortUsers()
    },
    sortDirection() {
      this.sortUsers()
    }
  }
}
</script>

<template>
  <div class="item_list_wrapper">
    <AnimationComponent v-if="isLoading" :type="'loading'" />
    <AnimationComponent v-else-if="isError" :type="'error'" :msg="isError" />
    <div class="item_list" v-else>
      <div class="sort__row">
        <select class="sort__colname" v-model="sortColumn">
          <option value="name">Name</option>
          <option value="email">Email</option>
        </select>
        <select class="sort__dir" v-model="sortDirection">
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <ul class="items__ul">
        <li class="users__li" v-for="user in users" :key="user.id">
          <SingleItem
            :type="'user'"
            :id="user.id"
            :name="user.name"
            :email="user.email"
            :avatar-url="user.avatar"
          />
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
