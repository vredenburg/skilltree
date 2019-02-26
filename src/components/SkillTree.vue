<template>
  <div class="hello">
    <h1>SkillTree</h1>
    <div v-if="skillTree !== null" class="skill-tree-container">
      <p>{{getSkillTreeWidth}}</p>
      <skill-tree-node v-for="node in getSkillTreeWithPositions" 
        :key="node.id" 
        :name="node.name" 
        :skillLevels="node.skillLevels" 
        :requiredBy="node.requiredBy"
        :margin="node.margin">
      </skill-tree-node>
    </div>
    <file-upload-form />
  </div>
</template>

<script>
import FileUploadForm from '@/components/FileUploadForm'
import SkillTreeNode from '@/components/SkillTreeNode'
import { mapGetters, mapState } from 'vuex'

export default {
  name: 'SkillTree',
  components: {
    FileUploadForm,
    SkillTreeNode
  },
  props: {
    msg: String
  },
  computed: {
    ...mapState([
      'skillTree'
    ]),
    ...mapGetters([
      'getSkillTreeWidth',
      'getSkillTreeWithPositions'
    ])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .skill-tree-container {
    display: flex;
    flex-flow: row wrap;
    justify-content: center;
  }
</style>
