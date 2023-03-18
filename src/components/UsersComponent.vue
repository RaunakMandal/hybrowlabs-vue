<script>
import SingleItem from './SingleItem.vue'
import axios from 'axios'
export default {
  components: {
    SingleItem
  },

  data() {
    return {
      loading: true,
      users: [],
      error: false,
      sortColumn: 'name',
      sortDirection: 'asc'
    }
  },
  async created() {
    await axios
      .get(`https://jsonplaceholder.typicode.com/users`)
      .then((response) => {
        // console.log(response.data);
        this.users = response.data
      })
      .catch((error) => {
        this.error = error
        console.log(error)
      })
      .finally(() => {
        this.loading = false
      })
  },
  methods: {
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
  <div class="users__list">
    <div class="loading" v-if="loading">Loading...</div>
    <div class="error" v-else-if="error">{{ error }}</div>
    <div class="sort__row" v-else>
      <select class="sort__colname" v-model="sortColumn">
        <option value="name">Name</option>
        <option value="email">Email</option>
      </select>
      <select class="sort__dir" v-model="sortDirection">
        <option value="asc">Ascending</option>
        <option value="desc">Descending</option>
      </select>
    </div>
    <ul class="users__ul" v-if="!loading && !error">
      <li class="users__li" v-for="user in users" :key="user.id">
        <SingleItem
          :type="'user'"
          :id="user.id"
          :name="user.name"
          :email="user.email"
          :avatar-url="user.avatar_url"
        />
      </li>
    </ul>
  </div>
</template>

<style>
.users__list {
  display: flex;
  flex-direction: column;
  justify-content: center;

  padding: 24px 48px;
}

.users__ul {
  list-style: none;
  padding: 0;
}

.sort__row {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  height: 28px;
}

.sort__colname {
  margin-right: 16px;
}

@media only screen and (min-width:320px) and (max-width:768px){
  .users__list {
    padding: 16px 24px;
  }
}
</style>
