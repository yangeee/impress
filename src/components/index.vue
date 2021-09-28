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
          target: item.target,
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
          target: item.target,
        })
        return text
      }
      const observeBoolean = (property) => {
        for(let i = 0; i < canvas._objects.length; i++) {
          canvas.item(i)[property] = false;
        }
        canvas.renderAll();
      }
      async function canvasInit(index) {        
        let items = json.scenes[index].elements
        canvas = new fabric.Canvas('canvas')
        await canvasBgInit(canvas)
        fabric.Object.prototype.transparentCorners = false
        items.forEach(item => {
          switchRender(item)
        })
        observeBoolean('hasControls')
        observeBoolean('hasBorders');
        observeBoolean('selectable')
        observeBoolean('evented');
        canvas.on({'mouse:down': function(e) {
          findObject(e.pointer.x, e.pointer.y)
        }})
      }
      function canvasBgInit(canvas) {
        return new Promise((res)=>{
          const img = new Image()
          img.src = json.background
          img.onload = function () {
            console.log(1)
            let imgInstance = new fabric.Image(img, {
              left: 0,
              top: 0,
              target: 1
            })
            canvas.add(imgInstance)
            res()
          }
        })
      }
      onMounted(() => {
        canvasInit(0)
      })
      const resetScene = () => {
        let objArr = canvas.getObjects()
        for(let i=1; i<objArr.length;i++) {
          let element = objArr[i]
          canvas.remove(element)
        }
      }
      function switchRender(item){
        switch (item.render) {
          case 'Image':
            fabric.Image.fromURL(item.url, (img, err) => {
              if(!err) {
                img.set({
                  left: item.data.left, // 左上角位置
                  top: item.data.top, // 左上角位置
                  width: item.data.width,
                  height: item.data.height,
                  target: item.data.target,
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
      }
      const renderScene = (targetIndex) => {
        let objArr = json.scenes[targetIndex].elements
        for(let i=0; i<objArr.length;i++) {
          switchRender(objArr[i])
        }
      }
      const findObject = (x, y) => {
        let objArr = canvas.getObjects()
          for(let i=1; i<objArr.length;i++){
            let element = objArr[i]
            if(element.left < x && element.left + element.width > x && element.top < y && element.top + element.height > y && element.target !== -1) {
              const targetIndex = element.target
              resetScene()
              renderScene(targetIndex)
            }
          }
      }
      
      
      return {
        data
      }
    }
  }
</script>

<style>

</style>