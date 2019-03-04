<template>
  <div class="hello">
    <h1>SkillTree</h1>
    <file-upload-form 
      @reset="resetForm"
      @filesChange="filesChange"
      :currentStatus="this.currentStatus"
    />
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
  </div>
</template>

<script>
import FileUploadForm from '@/components/FileUploadForm'
import SkillTreeNode from '@/components/SkillTreeNode'
import store from '@/store/store'
import { mapGetters, mapState } from 'vuex'

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
  name: 'SkillTree',
  components: {
    FileUploadForm,
    SkillTreeNode
  },
  props: {
    msg: String
  },
  data() {
    return {
      currentStatus: STATUS_INITIAL
    }
  },
  computed: {
    ...mapState([
      'skillTree'
    ]),
    ...mapGetters([
      'getSkillTreeWidth',
      'getSkillTreeWithPositions'
    ])
  },
  methods: {
    resetForm() {
      this.currentStatus = STATUS_INITIAL

      store.dispatch({
      type: 'resetSkillTree'
      })
    },
    filesChange(files) {
      this.currentStatus = STATUS_SAVING

      store.dispatch({
      type: 'setSkillTree',
      data: { files }
      })
      .then(() => {
        this.currentStatus = STATUS_SUCCESS
      })
    }
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
