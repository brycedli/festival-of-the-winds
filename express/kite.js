class Kite {
    
    constructor(x, y) {
        
        let options = {
            mass: 1000,
            friction: 0.00, 
            inertia: Infinity, 
            frictionAir: 0.1,
            isStatic: false
        };
        this.exited = false;
        this.x = x;
        this.y = y;
        this.offset = random(0, 10);
        // this.tint = [0,0,255];
        this.image = random(kiteSprites);
        this.w = this.image.width/4;
        this.h = this.image.height/4;
        this.body = Bodies.rectangle(x, y, this.w, this.h, options);
        this.body.collisionFilter = {
            'group': -1,
            'category': 2,
            'mask': 0,
          };
        World.add(world, this.body);
    }

    show() {
        if (this.exited){
            return;
        }

        let pos = this.body.position;
        let angle = this.body.angle;
        // Matter.Body.setAngle(this.body, 0);
        // let noiseField = noise(pos.x, pos.y);
        // let noiseOffset = Matter.Vector.create(noise(pos.x) -0.5, noise(pos.y)-0.5);

        let noiseOffset = Matter.Vector.create(noise(millis()/10000 + this.offset) + windDirection.x, (noise(millis()/10000 + this.offset*2)) + windDirection.y);
        if (pos.x > width + 50){
            this.exited = true;
            // kites.shift();
        }
        Matter.Body.applyForce(this.body, this.body.position, noiseOffset);

       

        
        push();
        translate(pos.x, pos.y);
        rectMode(CENTER);
        rotate(angle);
        // tint(this.tint);
        image(this.image, 0, 0, this.w, this.h);
        pop();
    }
}
