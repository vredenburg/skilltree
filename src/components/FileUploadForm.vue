<template>
  <div class="upload-form">
    <form enctype="multipart/form-data" novalidate v-if="isInitial || isSaving">
      <h1>Upload images</h1>
      <div class="dropbox">
        <input type="file" :disabled="isSaving" @change="filesChange($event.target.files); fileCount = $event.target.files.length" accept=".json" class="input-file">
        <p v-if="isInitial">
          Drag your file(s) here to begin<br> or click to browse
        </p>
        <p v-if="isSaving">
          Uploading {{ fileCount }} files...
        </p>
      </div>
    </form>
  </div>
</template>

<script>
import store from '@/store/store'

const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

export default {
  name: 'FileUploadForm',
  props: {
    
  },
  data() {
    return {
      currentStatus: null
    }
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED
    },

  },
  methods: {
    reset() {
      this.currentStatus = STATUS_INITIAL
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
  },
  mounted() {
    this.reset();
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
  .dropbox {
    outline: 2px dashed grey; /* the dash box */
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; /* minimum height */
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; /* invisible but it's there! */
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>



