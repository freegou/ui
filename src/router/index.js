import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/components/Login'
import Navigation from '@/components/Navigation'
import Category from '@/components/Category'
import Product from '@/components/Product'
import ShopMap from '@/components/ShopMap'
import ShopList from '@/components/ShopList'
import ShopShelf from '@/components/ShopShelf'
import ShopUnit from '@/components/ShopUnit'
import ShopStock from '@/components/ShopStock'
import Admin from '@/components/Admin'
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/nav',
      name: 'navigation',
      component: Navigation,
      children: [
        {
          path: 'category',
          component: Category
        },
        {
          path: 'product',
          component: Product
        },
        {
          path: 'map',
          component: ShopMap
        },
        {
          path: 'shoplist',
          component: ShopList
        },
        {
          path: 'shelf/:id',
          name: 'shelf',
          component: ShopShelf
        },
        {
          path: 'unit/:id/:pid',
          name: 'unit',
          component: ShopUnit
        },
        {
          path: 'stock/:id',
          name: 'stock',
          component: ShopStock
        },
        {
          path: 'admin',
          component: Admin
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (localStorage.getItem('token')) {
      next()
    } else {
      next({
        path: '/'
      })
    }

  } else {
    next() // make sure to always call next()!
  }
})

export default router
