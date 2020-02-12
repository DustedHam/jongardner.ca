import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/pages/Home'
import Lovac from '@/pages/Lovac'
import Finley from '@/pages/Finley'
import MeshGeneration from '@/pages/MeshGeneration'
import Latticelight from '@/pages/Latticelight'
import GhostFort from '@/pages/GhostFort'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/lovac',
      name: 'Lovac',
      component: Lovac
    },
    {
      path: '/finley',
      name: 'Finley',
      component: Finley
    },
    {
      path: '/meshgeneration',
      name: 'MeshGeneration',
      component: MeshGeneration
    },
    {
      path: '/latticelight',
      name: 'Latticelight',
      component: Latticelight
    },
    {
      path: '/ghostfort',
      name: 'GhostFort',
      component: GhostFort
    }
  ]
})
