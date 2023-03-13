<script>
import { RouterLink } from 'vue-router'

export default {
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
      <p>{{ name.charAt(0) }} {{ name.charAt(name.indexOf(' ') + 1) }}</p>
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

<style>
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
  box-shadow: inset 0 -3em 3em rgba(0, 0, 0, 0.1), 0 0 0 2px rgb(255, 255, 255),
    0.3em 0.3em 1em rgba(0, 0, 0, 0.3);
}

.user__avatar {
  height: 48px;
  width: 48px;
  border-radius: 50%;
  margin-right: 16px;
  background-color: #666;

  display: flex;
  align-items: center;
  justify-content: center;
}

.user__avatar p {
  margin: 0;
  color: #fff;
  font-weight: 700;
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
