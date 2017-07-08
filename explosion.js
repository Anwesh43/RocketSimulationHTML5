const w = window.innerWidth ,h = window.innerHeight
class Vector {
    constructor(x,y) {
        this.x = x
        this.y = y
    }
    add(vector) {
        this.x+=vector.x
        this.y+=vector.y
    }
}
class Body {
    constructor(position) {
        this.position = position
        this.vel = 0
        this.acc = 0
    }
    update() {
        this.position.add(this.vel)
        this.vel.add(this.acc)
    }
    applyVelocity(vel) {
        this.vel = vel
    }
    applyAcceleration(acc) {
        this.acc = acc
    }
    draw(context) {

    }
    stopped() {

    }
}
class World {
    constructor(accx,accy) {
        this.accx = accx
        this.accy = accy
        this.bodies = []
    }
    addBody(body) {
        this.bodies.push(body)
    }
    draw(context) {
        this.bodies.forEach((body)=>{
            body.draw(context)
        })
    }
    update() {
        this.bodies.forEach((body,index)=>{
            body.update()
            if(body.stopped() == true) {
                bodies.splice(index,1)
            }
        })
    }
}
class Renderer {
    construcotr() {
        const canvas = document.createElement('canvas')
        canvas.width = w
        canvas.height = h
        this.context = canvas.getContext('2d')
        document.body.appendChild(canvas)
    }
    render(drawCb) {
        setInterval(()=>{
            context.clearRect(0,0,w,h)
            context.fillStyle = '#212121'
            context.fillRect(0,0,w,h)
            drawCb()
        },50)
    }
}
class RocketBody extends Body{
    constructor(x,y,color) {
        super(x,y)
        this.color = color
    }
    draw(context) {
        context.fillStyle = this.color
        context.save()
        context.translate(this.x,this.y)
        context.beginPath()
        context.arc(0,0,w/20,0,2*Math.PI)
        context.fill()
        context.restore()
    }
    stopped() {
        return this.vel == 0
    }
}
