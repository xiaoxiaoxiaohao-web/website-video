<template>
  <div class="anchor">
    <a-anchor @click="handleClick">
      <a-anchor-link href="live" title="直播" />
      <a-anchor-link  title="动画" />
      <a-anchor-link  title="番剧" />
      <a-anchor-link  title="国创" />
      <a-anchor-link  title="漫画" />
      <a-anchor-link  title="音乐" />
      <a-anchor-link  title="舞蹈" />
    </a-anchor>
  </div>
</template>

<script>
export default {
  name: 'anchor',
  data () {
    return {

    }
  },
  methods: {
    handleClick (e, link) {
      e.preventDefault()
      console.log(link)
      document.querySelector('.' + link.href).scrollIntoView(true)
    }
  }
}
</script>

<style scoped>
</style>
