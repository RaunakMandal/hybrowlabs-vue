import { createRouter, createWebHistory } from 'vue-router'
import UsersVue from '../views/UsersView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:pathMatch(.*)*',
      redirect: '/users'
    },
    {
      path: '/users',
      name: 'users',
      component: UsersVue
    },
    {
      path: '/users/:id/posts',
      name: 'posts',
      props: route => ({ id: Number(route.params.id) }),
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/PostsView.vue')
    }
  ]
})

export default router
