class Word {
    constructor(x, y, image, type) {
        let options = {
            mass: 1000,
            friction: 0.00, 
            inertia: Infinity, 
            frictionAir: 0.1,
            isStatic: false
        };
        
        this.type = type;
        
        this.offset = random(0, 10);
        this.image = image;
        this.w = image.width;
        this.h = height;
        this.body = Bodies.rectangle(x, y, this.w, this.h, options);

        this.exited = false;
        World.add(world, this.body);
    }

    show() {
        
        let pos = this.body.position;
        let angle = this.body.angle;
        // let right = Matter.Vector.create(2*noise((millis())/10000 + this.offset) - 0.3, 0.4 * (noise((millis())/10000 + this.offset*2) - 0.5));
        let noiseOffset = Matter.Vector.create(noise(millis()/10000 + this.offset) + windDirection.x, (noise(millis()/10000 + this.offset*2)) + windDirection.y);
        // print(windDirection);
        Matter.Body.setAngle(this.body, 0);

        Matter.Body.applyForce(this.body, this.body.position, noiseOffset);

        if (!this.exited && this.type == "winds" && pos.x > width + this.w/2){
            spawnWordGroup(-1500, random(0, height));            
            this.exited = true;
        }

        
        push();
        translate(pos.x, pos.y);
        rectMode(CENTER);
        rotate(angle);
        image(this.image, -this.image.width/4, -this.image.height/2, this.image.width/2, this.image.height/2);
        pop();
    }
}
