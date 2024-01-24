import { fabric } from 'fabric'
import {
  backgroundColor,
  barFill,
  barShadow,
  barStroke,
  barText,
  chairFill,
  chairShadow,
  chairStroke,
  grid,
  lineStroke,
  tableFill,
  tableShadow,
  tableStroke,
  wallFill,
  wallShadow,
  wallStroke
} from './data'

export const generateId = (): string => {
  return Math.random().toString(36).slice(2, 8)
}

export const snapToGrid = (target: fabric.Object): void => {
  target.set({
    left: (Math.round(target.left / (grid / 2)) * grid) / 2,
    top: (Math.round(target.top / (grid / 2)) * grid) / 2
  })
}

export const checkBoundingBox = (canvas: fabric.Canvas, e: fabric.IEvent): void => {
  const obj = e.target

  if (!obj) {
    return
  }
  obj.setCoords()

  const objBoundingBox = obj.getBoundingRect()
  if (objBoundingBox.top < 0) {
    obj.set('top', 0)
    obj.setCoords()
  }
  if (objBoundingBox.left > canvas.width - objBoundingBox.width) {
    obj.set('left', canvas.width - objBoundingBox.width)
    obj.setCoords()
  }
  if (objBoundingBox.top > canvas.height - objBoundingBox.height) {
    obj.set('top', canvas.height - objBoundingBox.height)
    obj.setCoords()
  }
  if (objBoundingBox.left < 0) {
    obj.set('left', 0)
    obj.setCoords()
  }
}

export const sendLinesToBack = (canvas: fabric.Canvas): void => {
  canvas.getObjects().map((o) => {
    if (o.type === 'line') {
      canvas.sendToBack(o)
    }
  })
}

export const initCanvas = (canvas: fabric.Canvas): void => {
  //canvas = new fabric.Canvas('canvas')
  canvas.backgroundColor = backgroundColor

  for (let i = 0; i < canvas.width / grid; i++) {
    const lineX = new fabric.Line([0, i * grid, canvas.width, i * grid], {
      stroke: lineStroke,
      selectable: false,
      type: 'line'
    })
    const lineY = new fabric.Line([i * grid, 0, i * grid, canvas.height], {
      stroke: lineStroke,
      selectable: false,
      type: 'line'
    })
    sendLinesToBack(canvas)
    canvas.add(lineX)
    canvas.add(lineY)
  }
  /*
  canvas.on('object:moving', function (e) {
    snapToGrid(e.target)
  })

  canvas.on('object:scaling', function (e) {
    if (e.target.scaleX > 5) {
      e.target.scaleX = 5
    }
    if (e.target.scaleY > 5) {
      e.target.scaleY = 5
    }
    if (!e.target.strokeWidthUnscaled && e.target.strokeWidth) {
      e.target.strokeWidthUnscaled = e.target.strokeWidth
    }
    if (e.target.strokeWidthUnscaled) {
      e.target.strokeWidth = e.target.strokeWidthUnscaled / e.target.scaleX
      if (e.target.strokeWidth === e.target.strokeWidthUnscaled) {
        e.target.strokeWidth = e.target.strokeWidthUnscaled / e.target.scaleY
      }
    }
  })

  canvas.on('object:modified', function (e) {
    e.target.scaleX = e.target.scaleX >= 0.25 ? Math.round(e.target.scaleX * 2) / 2 : 0.5
    e.target.scaleY = e.target.scaleY >= 0.25 ? Math.round(e.target.scaleY * 2) / 2 : 0.5
    snapToGrid(e.target)
    if (e.target.type === 'rect') {
      canvas.bringToFront(e.target)
    } else {
      canvas.sendToBack(e.target)
    }
    sendLinesToBack(canvas)
  })

  canvas.on('object:moving', function (e) {
    checkBoundingBox(canvas, e)
  })
  canvas.on('object:rotating', function (e) {
    checkBoundingBox(canvas, e)
  })
  canvas.on('object:scaling', function (e) {
    checkBoundingBox(canvas, e)
  })*/
}

export const resizeCanvas = (
  canvas: HTMLCanvasElement,
  widthInput: string | null,
  heightInput: string | null
): void => {
  const width = widthInput ? parseInt(widthInput, 10) : 302
  const height = heightInput ? parseInt(heightInput, 10) : 812

  canvas.width = width
  canvas.height = height

  //return { newWidth: width, newHeight: height }
}

export const addRect = (
  canvas: fabric.Canvas,
  number: number,
  left: number,
  top: number,
  width: number,
  height: number
): fabric.Group => {
  const id = generateId()
  const o = new fabric.Rect({
    width: width,
    height: height,
    fill: tableFill,
    stroke: tableStroke,
    strokeWidth: 2,
    shadow: tableShadow,
    originX: 'center',
    originY: 'center',
    centeredRotation: true,
    snapAngle: 45,
    selectable: true
  })
  const t = new fabric.IText(number.toString(), {
    fontFamily: 'Calibri',
    fontSize: 14,
    fill: '#fff',
    textAlign: 'center',
    originX: 'center',
    originY: 'center'
  })
  const g = new fabric.Group([o, t], {
    left: left,
    top: top,
    centeredRotation: true,
    snapAngle: 45,
    selectable: true,
    customType: 'table',
    id: id,
    number: number
  })
  canvas.add(g)
  //number++
  return g
}

export const addCircle = (
  canvas: fabric.Canvas,
  number: number,
  left: number,
  top: number,
  radius: number
): fabric.Group => {
  const id = generateId()
  const o = new fabric.Circle({
    radius: radius,
    fill: tableFill,
    stroke: tableStroke,
    strokeWidth: 2,
    shadow: tableShadow,
    originX: 'center',
    originY: 'center',
    centeredRotation: true
  })
  const t = new fabric.IText(number.toString(), {
    fontFamily: 'Calibri',
    fontSize: 14,
    fill: '#fff',
    textAlign: 'center',
    originX: 'center',
    originY: 'center'
  })
  const g = new fabric.Group([o, t], {
    left: left,
    top: top,
    centeredRotation: true,
    snapAngle: 45,
    selectable: true,
    customType: 'table',
    id: id,
    number: number
  })
  canvas.add(g)
  //number++
  return g
}

export const addTriangle = (
  canvas: fabric.Canvas,
  number: number,
  left: number,
  top: number,
  radius: number
): fabric.Group => {
  const id = generateId()
  const o = new fabric.Triangle({
    radius: radius,
    fill: tableFill,
    stroke: tableStroke,
    strokeWidth: 2,
    shadow: tableShadow,
    originX: 'center',
    originY: 'center',
    centeredRotation: true
  })
  const t = new fabric.IText(number.toString(), {
    fontFamily: 'Calibri',
    fontSize: 14,
    fill: '#fff',
    textAlign: 'center',
    originX: 'center',
    originY: 'center'
  })
  const g = new fabric.Group([o, t], {
    left: left,
    top: top,
    centeredRotation: true,
    snapAngle: 45,
    selectable: true,
    customType: 'table',
    id: id,
    number: number
  })
  canvas.add(g)
  number++
  return g
}

export const addChair = (canvas: fabric.Canvas, left: number, top: number): fabric.Rect => {
  const o = new fabric.Rect({
    left: left,
    top: top,
    width: 30,
    height: 30,
    fill: chairFill,
    stroke: chairStroke,
    strokeWidth: 2,
    shadow: chairShadow,
    originX: 'left',
    originY: 'top',
    centeredRotation: true,
    snapAngle: 45,
    selectable: true,
    type: 'chair',
    id: generateId()
  })
  canvas.add(o)
  return o
}

export const addBar = (
  canvas: fabric.Canvas,
  left: number,
  top: number,
  width: number,
  height: number
): fabric.Group => {
  const o = new fabric.Rect({
    width: width,
    height: height,
    fill: barFill,
    stroke: barStroke,
    strokeWidth: 2,
    shadow: barShadow,
    originX: 'center',
    originY: 'center',
    type: 'bar',
    id: generateId()
  })
  const t = new fabric.IText(barText, {
    fontFamily: 'Calibri',
    fontSize: 14,
    fill: '#fff',
    textAlign: 'center',
    originX: 'center',
    originY: 'center'
  })
  const g = new fabric.Group([o, t], {
    left: left,
    top: top,
    centeredRotation: true,
    snapAngle: 45,
    selectable: true,
    customType: 'bar'
  })
  canvas.add(g)
  return g
}

export const addWall = (
  canvas: fabric.Canvas,
  left: number,
  top: number,
  width: number,
  height: number
): fabric.Rect => {
  const o = new fabric.Rect({
    left: left,
    top: top,
    width: width,
    height: height,
    fill: wallFill,
    stroke: wallStroke,
    strokeWidth: 2,
    shadow: wallShadow,
    originX: 'left',
    originY: 'top',
    centeredRotation: true,
    snapAngle: 45,
    selectable: true,
    type: 'wall',
    id: generateId()
  })
  canvas.add(o)
  return o
}

export const formatTime = (val: number): string => {
  const hours = Math.floor(val / 60)
  const minutes = val % 60
  const englishHours = hours > 12 ? hours - 12 : hours

  const normal = hours + ':' + minutes + (minutes === 0 ? '0' : '')
  const english =
    englishHours + ':' + minutes + (minutes === 0 ? '0' : '') + ' ' + (hours > 12 ? 'PM' : 'AM')

  return normal + ' (' + english + ')'
}

export const addDefaultObjects = (canvas: fabric.Canvas, number: number): void => {
  addChair(canvas, 15, 105)
  addChair(canvas, 15, 135)
  addChair(canvas, 75, 105)
  addChair(canvas, 75, 135)
  addChair(canvas, 225, 75)
  addChair(canvas, 255, 75)
  addChair(canvas, 225, 135)
  addChair(canvas, 255, 135)
  addChair(canvas, 225, 195)
  addChair(canvas, 255, 195)
  addChair(canvas, 225, 255)
  addChair(canvas, 255, 255)
  addChair(canvas, 15, 195)
  addChair(canvas, 45, 195)
  addChair(canvas, 15, 255)
  addChair(canvas, 45, 255)
  addChair(canvas, 15, 315)
  addChair(canvas, 45, 315)
  addChair(canvas, 15, 375)
  addChair(canvas, 45, 375)
  addChair(canvas, 225, 315)
  addChair(canvas, 255, 315)
  addChair(canvas, 225, 375)
  addChair(canvas, 255, 375)
  addChair(canvas, 15, 435)
  addChair(canvas, 15, 495)
  addChair(canvas, 15, 555)
  addChair(canvas, 15, 615)
  addChair(canvas, 225, 615)
  addChair(canvas, 255, 615)
  addChair(canvas, 195, 495)
  addChair(canvas, 195, 525)
  addChair(canvas, 255, 495)
  addChair(canvas, 255, 525)
  addChair(canvas, 225, 675)
  addChair(canvas, 255, 675)

  addRect(canvas, number, 30, 90, 60, 90)
  addRect(canvas, number, 210, 90, 90, 60)
  addRect(canvas, number, 210, 210, 90, 60)
  addRect(canvas, number, 0, 210, 90, 60)
  addRect(canvas, number, 0, 330, 90, 60)
  addRect(canvas, number, 210, 330, 90, 60)
  addRect(canvas, number, 0, 450, 60, 60)
  addRect(canvas, number, 0, 570, 60, 60)
  addRect(canvas, number, 210, 480, 60, 90)
  addRect(canvas, number, 210, 630, 90, 60)

  addBar(canvas, 120, 0, 180, 60)

  addWall(canvas, 120, 510, 60, 60)
}

export const handleShapeClick =
  (canvas: fabric.Canvas, number: number, shapeType: string) => () => {
    let o

    switch (shapeType) {
      case 'rectangle':
        o = addRect(canvas, number, 0, 0, 60, 60)
        break
      case 'circle':
        o = addCircle(canvas, number, 0, 0, 30)
        break
      case 'triangle':
        o = addTriangle(canvas, number, 0, 0, 30)
        break
      case 'chair':
        o = addChair(canvas, 0, 0)
        break
      case 'bar':
        o = addBar(canvas, 0, 0, 180, 60)
        break
      case 'wall':
        o = addWall(canvas, 0, 0, 60, 180)
        break
      default:
        break
    }

    if (o) {
      canvas.setActiveObject(o)
    }
  }

export const handleRemoveClick = (canvas: fabric.Canvas): void => {
  const o = canvas.getActiveObject()
  if (o) {
    o.remove()
    canvas.remove(o)
    canvas.discardActiveObject()
    canvas.renderAll()
  }
}

export const handleCustomerModeClick = (canvas: fabric.Canvas): void => {
  canvas.getObjects().forEach((o) => {
    o.hasControls = false
    o.lockMovementX = true
    o.lockMovementY = true

    if (o.type === 'chair' || o.type === 'bar' || o.type === 'wall') {
      o.selectable = false
    }

    o.borderColor = '#38A62E'
    o.borderScaleFactor = 2.5
  })

  canvas.selection = false
  canvas.hoverCursor = 'pointer'
  canvas.discardActiveObject()
  canvas.renderAll()

  document.querySelector('.admin-menu')?.classList.add('hidden')
  document.querySelector('.customer-menu')?.classList.remove('hidden')
}

export const handleAdminModeClick = (canvas: fabric.Canvas): void => {
  canvas.getObjects().forEach((o) => {
    o.hasControls = true
    o.lockMovementX = false
    o.lockMovementY = false

    if (o.type === 'chair' || o.type === 'bar' || o.type === 'wall') {
      o.selectable = true
    }

    o.borderColor = 'rgba(102, 153, 255, 0.75)'
    o.borderScaleFactor = 1
  })

  canvas.selection = true
  canvas.hoverCursor = 'move'
  canvas.discardActiveObject()
  canvas.renderAll()

  document.querySelector('.admin-menu')?.classList.remove('hidden')
  document.querySelector('.customer-menu')?.classList.add('hidden')
}

export const slider: HTMLDivElement = document.getElementById('slider') as HTMLDivElement
