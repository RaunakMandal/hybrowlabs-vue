<script>
export default {
  name: 'SingleItem',
  props: {
    type: {
      type: String,
      required: true
    },
    id: {
      type: Number
    },
    name: {
      type: String
    },
    email: {
      type: String
    },
    avatarUrl: {
      type: String
    },
    title: {
      type: String
    },
    body: {
      type: String
    }
  }
}
</script>

<template>
  <router-link
    :to="{
      name: 'posts',
      params: {
        id: id
      }
    }"
    class="container"
    v-if="type === 'user'"
  >
    <div class="user__avatar">
      <img :src="avatarUrl" alt="avatar"  />
    </div>
    <div class="user__info">
      <h2>{{ name }}</h2>
      <p>{{ email }}</p>
    </div>
  </router-link>
  <div class="container" v-else>
    <div class="post__info">
      <h2>{{ title }}</h2>
      <p>{{ body }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  padding: 16px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-bottom: 16px;
  cursor: pointer;
}

.container:hover {
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.2);
}

.user__avatar {
  height: 48px;
  width: 48px;
  margin-right: 16px;

  display: flex;
  align-items: center;
  justify-content: center;
}

.user__avatar img {
  height: 100%;
  width: 100%;
  border-radius: 50%;
}

.user__info h2 {
  margin: 0;
  font-size: 1.2rem;
}

.user__info p {
  margin: 0;
  font-size: 0.8rem;
  color: #666;
}

.post__info h2 {
  margin: 0;
  font-size: 1.2rem;
}

.post__info p {
  margin: 0;
  font-size: 0.8rem;
  color: #666;
}
</style>
