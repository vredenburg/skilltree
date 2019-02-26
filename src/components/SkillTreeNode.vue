<template>
  <div class="node" v-bind:style="{ marginLeft: margin + '%', marginRight: margin + '%'  }">
    <p>{{name}}</p>
  </div>
</template>

<script>
export default {
  name: 'SkillTreeNode',
  props: {
    name: String,
    skillLevels: Object,
    requiredBy: Array,
    margin: Number
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .node {
    width:100px;
    height: 100px;
    background:red;
    border-radius: 50px;
  }
</style>
