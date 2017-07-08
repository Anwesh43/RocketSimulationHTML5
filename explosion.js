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
