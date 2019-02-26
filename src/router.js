import Vue from 'vue'
import Router from 'vue-router'
import SkillTree from '@/components/SkillTree'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/SkillTree',
      name: 'SkillTree',
      component: SkillTree
      //props: true
    }
  ]
})