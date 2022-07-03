import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Layout from '@/views/Layout'
const Search = () => import('@/views/Search')
const Lookup = () => import('@/views/Lookup')
const My = () => import('@/views/My')
const Login = () => import('@/views/Login')
const Registe = () => import('@/views/Registe')
const MyCollection = () => import('@/views/MyCollection')
const Sent = () => import('@/views/Rent')
const Add = () => import('@/views/Add')
const Map = () => import('@/views/Map')
const City = () => import('@/views/City')
const RentSearch = () => import('@/views/Add/RentSearch')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [
      { path: 'home', component: Home },
      { path: 'search', component: Search },
      { path: 'lookup', component: Lookup },
      { path: 'my', component: My }
    ]
  },
  { path: '/login', component: Login },
  { path: '/', component: Home },
  { path: '/registe', component: Registe },
  { path: '/mycollection', component: MyCollection },
  {
    path: '/sent',
    component: Sent
  },
  { path: '/map', component: Map },
  { path: '/add', component: Add },
  { path: '/city', component: City },
  { path: '/rentsearch', component: RentSearch }
]

const router = new VueRouter({
  routes
})

export default router
