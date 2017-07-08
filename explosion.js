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
        body.applyAcceleration(new Vector(this.accx,this.accy))
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
                this.bodies.splice(index,1)
            }
        })
    }
}
class Renderer {
    constructor(width,height) {
        const canvas = document.createElement('canvas')
        canvas.width = width || w
        canvas.height = height || h
        this.w = canvas.width
        this.h = canvas.height
        this.context = canvas.getContext('2d')
        console.log(this.context)
        document.body.appendChild(canvas)
    }
    render(drawCb) {
        setInterval(()=>{
            this.context.clearRect(0,0,this.w,this.h)
            this.context.fillStyle = '#212121'
            this.context.fillRect(0,0,this.w,this.h)
            drawCb(this.context)
        },50)
    }
}
class RocketBody extends Body{
    constructor(x,y,color) {
        super(new Vector(x,y))
        this.color = color
    }
    draw(context) {
        context.fillStyle = this.color
        context.save()
        context.translate(this.position.x,this.position.y)
        context.beginPath()
        context.arc(0,0,w/80,0,2*Math.PI)
        context.fill()
        context.restore()
    }
    stopped() {
        return this.vel.y == 0
    }
}
const renderer = new Renderer(w,h)
const world = new World(0,1)
const colors = ["#f44336","#e91e63","#673ab7","#9c27b0","#3f51b5"]
for(var i=0;i<10;i++) {
    const x = Math.random()*w
    const color = colors[Math.floor(Math.random()*colors.length)]
    var rocket = new RocketBody(x,h-w/15,color)
    rocket.applyVelocity(new Vector(0,-1*(20+Math.floor(Math.random()*15))))
    world.addBody(rocket)
}
renderer.render((context)=>{
    world.draw(context)
    world.update()
})
