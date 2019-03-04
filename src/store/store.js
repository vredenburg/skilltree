import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    skillTree: null
  },
  getters: {
    getSkillTreeDescription: state => {
      if(!state.skillTree) 
        return ""

      return state.skillTree.description;
    },
    getSkillTreeWidth: state => {
      if(!state.skillTree) 
        return ""

      let nodes = state.skillTree.skillTree.skillNodes
      let maxNodeDependenciesForSingleNode = 0
   
      for (let i in nodes) {
        if(nodes[i].requiredBy) {
          if(nodes[i].requiredBy.length > maxNodeDependenciesForSingleNode)
          maxNodeDependenciesForSingleNode = nodes[i].requiredBy.length
          }
        } 
        
      return maxNodeDependenciesForSingleNode
    },
    // unfinished
    getSkillTreeWithPositions: state => {
      if(!state.skillTree) 
        return;

      let nodes = state.skillTree.skillTree.skillNodes
      console.log(nodes)
      return nodes
    }
  },
  mutations: {
    setSkillTree(state,payload){
      state.skillTree = payload
    }
  },
  actions: {
    resetSkillTree(context) {
      context.commit('setSkillTree', null)
    },
    setSkillTree(context, payload) {
      return new Promise((resolve, reject) => {
        if(!payload.data.files.length) {
          reject()
        }
        else {
          const fileReader = new FileReader()
          fileReader.readAsText(payload.data.files[0])
          fileReader.onload = e => {
            let result = JSON.parse(e.target.result)
            console.log(result)
            let nodes = result.skillTree.skillNodes

            for (let i in nodes) {
              console.log(i)
              if(i == 0) {
                nodes[i].margin = 100
              }
              else if (nodes[i].requiredBy != null) {
                for (let j in nodes[i].requiredBy) {
                  nodes[nodes[i].requiredBy[j]].margin = nodes[i].margin / nodes[i].requiredBy.length
                }
              }
              console.log(nodes[i].margin)
            }
            result.skillTree.skillNodes = nodes
            context.commit('setSkillTree', result)
            console.log(context.state.skillTree)
            resolve()
          }  
        }
      })
    }
  }
})

export default store