import { createRouter, createWebHistory } from 'vue-router'
import Incomes from '../pages/Incomes.vue'
import Orders from '../pages/Orders.vue'
import Sales from '../pages/Sales.vue'
import Stocks from '../pages/Stocks.vue'

const routes = [
  {
    path: '/',
    redirect: '/incomes'
  },
  {
    path: '/incomes',
    name: 'Incomes',
    component: Incomes
  },
  {
    path: '/orders',
    name: 'Orders',
    component: Orders
  },
  {
    path: '/sales',
    name: 'Sales',
    component: Sales
  },
  {
    path: '/stocks',
    name: 'Stocks',
    component: Stocks
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router