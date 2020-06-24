// 简易柱状图，不做校验
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")

const kong = Object.create(null)

function Bar({ xAxis, sourceData }) {
    // 数据
    this.sourceData = sourceData
    // x轴
    this.xAxis = xAxis
    this.beginPoint = [20, canvas.height / 3 * 2]
    this.xLen = 400
    this.yLen = 350
    this.scaleLen = 5
    this.gap = 10
    this.barColor = 'red',
    this.axisColor = '#000',
    this.xLabelStyle = {

    }
    this.yLabelStyle = {

    }
    this.initParmas()
}

// 做一些初始化参数的获取
Bar.prototype.initParmas = function() {
    const { sourceData } = this
    const { beginPoint, scaleLen } = this
    this.dataLen = this.sourceData.length
    this.scaleDistance = Math.floor(this.xLen / this.dataLen)
    this.maxData = Math.max.apply(kong, sourceData)
}

Bar.prototype.render = function() {
    this.renderAxis()
    this.renderScale()
    this.renderLabel()
    this.renderPillar()
}

// 绘制坐标轴
Bar.prototype.renderAxis = function(){
    ctx.save()
    ctx.strokeStyle = this.axisColor
    ctx.beginPath()
    ctx.moveTo(this.beginPoint[0], this.beginPoint[1])
    ctx.lineTo(this.beginPoint[0] + this.xLen, this.beginPoint[1])
    ctx.stroke()
    ctx.beginPath()
    ctx.moveTo(this.beginPoint[0], this.beginPoint[1])
    ctx.lineTo(this.beginPoint[0], this.beginPoint[1] - this.yLen)
    ctx.stroke()
    ctx.restore()
}

// 渲染刻度尺
Bar.prototype.renderScale = function(){
    const { beginPoint } = this
    ctx.save()
    // 渲染x轴的刻度
    for(let i = 0; i < this.dataLen + 1; i++) {
        ctx.beginPath()
        ctx.moveTo(beginPoint[0] + this.scaleDistance * i, beginPoint[1])
        ctx.lineTo(beginPoint[0] + this.scaleDistance * i, beginPoint[1] + this.scaleLen)
        ctx.stroke()
    }
    ctx.restore()
    
    // 渲染y轴的刻度
}

// 渲染label
Bar.prototype.renderLabel = function() {
    // 渲染x轴的label
    const { dataLen, scaleDistance, beginPoint } = this
    ctx.save()
    ctx.textAlign = 'center'
    ctx.textBaseline = 'hanging'
    ctx.font = "15px 微软雅黑"
    for(let i = 1; i < this.dataLen + 1; i++) {
        ctx.beginPath()
        ctx.fillText(this.xAxis[i - 1], beginPoint[0] + this.scaleDistance * i, beginPoint[1] + this.scaleLen, 100)
        // ctx.moveTo(beginPoint[0] + this.scaleDistance * i, beginPoint[1])
        // ctx.lineTo(beginPoint[0] + this.scaleDistance * i, beginPoint[1] + this.scaleLen)
        
    }
    // 渲染y轴的label
}

// 横向的文字
Bar.prototype.horizontalText = function() {
    // x轴文字大小，颜色，粗细等style
}

// 竖向的文字，用于y轴
Bar.prototype.verticalText = function() {
    // y轴文字大小，颜色，粗细等style
}

// 渲染柱子
Bar.prototype.renderPillar = function() {

}

const bar = new Bar({
    xAxis: ['a', 'b', 'c', 'd', 'e'],
    sourceData: [200, 150, 130, 124, 20]
})

bar.render()

