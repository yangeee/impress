<template>
  <canvas id="canvas" width="600" height="600" style="border:1px solid #ccc"></canvas>
</template>

<script>
  import {fabric} from 'fabric'
  import {onMounted, reactive} from 'vue';
  import json from '../canvas.json'

  export default {
    name: 'Demo',
    setup() {
      const data = reactive({
        x: 0,
        y: 0
      })
      // 初始化第一个场景
      const initCanvas = (scene,canvas) => {
        for (const element of scene.elements) {
          let fabricEle = new fabric[element.render](element.data)
          canvas.add(fabricEle)
        }
      }
      onMounted(() => {
        let canvas = new fabric.Canvas('canvas');
        fabric.Object.prototype.transparentCorners = false;
        initCanvas(json.scenes[0],canvas)

        const findObject = (x, y) => {
          canvas._objects.forEach(element => {
            element.animate({opacity: 0}, {
              duration: 2000,
              easing: fabric.util.ease.easeOutCubic,
              onChange: canvas.renderAndResetBound,
            });
            if (element.left < x && element.left + element.width > x && element.top < y && element.top + element.height > y) {
              var rect2 = new fabric.Rect({
                left: 60,
                top: 10,
                width: 100,
                height: 100,
                fill: 'green',
                angle: 45,
                padding: 10,
                stroke: 'green', // 边框颜色
                strokeWidth: 4, // 边框宽度
              });
              setTimeout(() => {
                canvas.clear()
                var canvas1 = new fabric.Canvas('canvas');
                canvas1.add(rect2)
              }, 2000)
            }
          });
        }
        canvas.on({
          'mouse:down': function (e) {
            findObject(e.pointer.x, e.pointer.y)
            console.log('111')
          }
        })
      })
      return {
        data
      }
    }
  }
</script>

<style>

</style>