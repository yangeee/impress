<template>
  <div id="impress" data-transition-duration="1000">
    <div class="step" data-scale="4" data-x="0" data-y="0">
        <h1>2D navigation</h1>

        <div>第一张图片</div>
    </div>

    <div id="contents" class="step" data-rel-x="1500" data-rel-y="1500" data-scale="1" data-x="0" data-y="0">
        <h1>Choosing a treat 第二张</h1>

        <ul>
            <li>You can choose your preferred treat from:
                <ul>
                <li>Ice cream</li>
                <li>Crisps</li>
                <li>Apple pie</li>
                </ul>
            </li>
            <li>We will make a structured pro's &amp; con's analysis to arrive at a conclusion</li>
        </ul>
    </div>

    <!-- Ice cream slides (3) -->
    <div id="icecream" class="step" data-x="200" data-y="20"
         data-goto-key-list="ArrowUp ArrowDown ArrowLeft ArrowRight"
         data-goto-next-list="contents icecream-pro contents crisps">
        <h1>Ice cream</h1>

        <ul>
            <li>Cold</li>
            <li>Creamy</li>
            <li>Vanilla or flavored</li>
            <li>Caramel sauce, jams &amp; other toppings</li>
        </ul>
    </div>
  </div>
  <div id="impress-toolbar"></div>

<div class="impress-progressbar"><div>
</div></div>
<div class="impress-progress"></div>

</template>


<script>
import "@/assets/css/impress-demo.css"
import { onMounted } from 'vue'
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  setup() {
    onMounted(() => {
      setTimeout(()=>{// eslint-disable-next-line no-undef 
      impress().init()},4000)
    })

    return {
    }
  }
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->


<style scoped>
#impress {
  margin-left: 210px;
}
div{
  cursor: pointer;
}
</style>
