<template>
  <canvas id="canvas" width="1200" height="800" style="border:1px solid #ccc"></canvas>
</template>

<script>
  import { fabric } from 'fabric'
  import { onMounted, reactive } from 'vue';
  import json from '../canvas.json'

  export default {
    name: 'Demo',
    setup() {
      const data = reactive({
        x: 0,
        y: 0
      })
      let canvas
      const addRect = (item) => {
        console.log(item.left)
        let rect = new fabric.Rect({
          left: item.left,
          top: item.top,
          width: item.width,
          height: item.height,
          fill: item.fill,
          angle: item.angle,
          padding: item.padding,
          stroke: item.stroke, // 边框颜色
          strokeWidth: item.strokeWidth, // 边框宽度
        })
        return rect
      }
      const addText =  (value, item) =>{
        let text = new fabric.Textbox(value, {
          left: item.left, // 左上角位置
          top: item.top, // 左上角位置
          fontSize: item.fontSize,
          fill: item.color, // 字体颜色
          target: false,
        })
        return text
      }
      let items = json.scenes[0].elements
      function canvasInit() {
        canvas = new fabric.Canvas('canvas')
        fabric.Object.prototype.transparentCorners = false
        items.forEach(item => {
          switch (item.render) {
            case 'Image':
            fabric.Image.fromURL(item.url, (img, err) => {
              if(!err) {
                img.set({
                  left: item.data.left, // 左上角位置
                  top: item.data.top, // 左上角位置
                  width: item.data.width,
                  height: item.data.height,
                  target: false,
                  crossOrigin: 'anonymous' // 使用的图片跨域时，配置此参数，有时会失效
                })
                canvas.add(img)
              }
            })
            break
            case 'Text':
              canvas.add(addText(item.text, item.data))
              console.log(canvas)
              break
            case 'Rect':
              canvas.add(addRect(item.data))
              console.log(canvas)
              break
          }
        })
        canvas.on({'mouse:down': function(e) {
          findObject(e.pointer.x, e.pointer.y)
        }})
      }
      onMounted(() => {   
        canvasInit()
      })
      
      const findObject = (x, y) => {
        canvas._objects.forEach(element => {
          if(element.left < x && element.left + element.width > x && element.top < y && element.top + element.height > y ) {
            canvas._objects.forEach(element => {
              element.animate({opacity: 0} , {
              duration: 200,
              easing: fabric.util.ease.easeOutCubic,
              onChange: canvas.renderAndResetBound,
            })
          })
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
          },200)          
        }
      })
      }
      
      
      return {
        data
      }
    }
  }
</script>

<style>

</style>