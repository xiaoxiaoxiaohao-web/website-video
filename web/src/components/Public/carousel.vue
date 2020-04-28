<template>
  <div class="carousel">
    <a-carousel autoplay arrows>
      <div slot="prevArrow" slot-scope="props" class="custom-slick-arrow" style="left: 10px;zIndex: 1">
        <a-icon type="left-circle" />
      </div>
      <div slot="nextArrow" slot-scope="props" class="custom-slick-arrow" style="right: 10px">
        <a-icon type="right-circle" />
      </div>
      <div v-for="(value, index) in carouselData" :key="index">
        <!-- <img :src="require('@/assets/'+ value)" /> -->
        <img :src="'http://localhost:3001/carousel/' + value.name + '.jpg'" />
      </div>
    </a-carousel>
  </div>
</template>

<script>
export default {
  name: 'carousel',
  props: ['carouselData'],
  data () {
    return {
    }
  }
}
</script>

<style scoped>
.carousel {
  width: 100%;
  height: 100%;
}
.carousel img {
  width: 100%;
  height: 280px;
  /* object-fit:cover; */
  object-fit: fill;
}
.ant-carousel >>> .slick-slide {
  height: 100%;
  line-height: 100%;
  overflow: hidden;
}
.ant-carousel >>>.slick-dots {
  text-align: right;
  margin-bottom: 10px;
  padding-right: 10px;
}
.ant-carousel >>> .slick-dots li button {
  height: 12px;
  width: 12px;
  border-radius: 50%;
  background-color: #FFF;
  opacity: 1;
}
.ant-carousel >>> li.slick-active button{
  background-color: #1890ff ;
}

.ant-carousel >>> .custom-slick-arrow {
  width: 25px;
  height: 25px;
  font-size: 25px;
  color: #fff;
  background-color: rgba(18, 23, 29, 0.11);
  opacity: 0.3;
}
.ant-carousel >>> .custom-slick-arrow:before {
  display: none;
}
.ant-carousel >>> .custom-slick-arrow:hover {
  opacity: 0.5;
}
</style>
