class Ligature {
    constructor(word0, word1) {
        //in offsets relative to the bottom center
        this.word0 = word0;
        this.word1 = word1;
        //bezier

        if (word0.type == "festival"){
            this.leftPointX = 223/2;
            this.leftPointY = -3;
            this.leftControlX = 160;
            this.leftControlY = -3;

            this.rightPointX = -32;
            this.rightPointY = -38;
            this.rightControlX = -48;
            this.rightControlY = -9;
        }
        if (word0.type == "of"){
            this.leftPointX = 23;
            this.leftPointY = -3;
            this.leftControlX = 70;
            this.leftControlY = -3;

            this.rightPointX = -46;
            this.rightPointY = -48;
            this.rightControlX = -112;
            this.rightControlY = -70;
        }
        if (word0.type == "the"){
            this.leftPointX = 46;
            this.leftPointY = -13;
            this.leftControlX = 102;
            this.leftControlY = -62;


            this.rightPointX = -94;
            this.rightPointY = -48;
            this.rightControlX = -222;
            this.rightControlY = -54;
        }
        
    }

    show() {
        let debug = false;
        noFill(); 
        strokeWeight(2);
        // stroke("#231F20");
        stroke(225);
        if (debug){
            stroke("red");
        }
        

        bezier(
            this.word0.body.position.x + this.leftPointX, this.word0.body.position.y + this.leftPointY, 
            this.word0.body.position.x + this.leftControlX, this.word0.body.position.y + this.leftControlY, 
            this.word1.body.position.x + this.rightControlX, this.word1.body.position.y + this.rightControlY,
            this.word1.body.position.x + this.rightPointX, this.word1.body.position.y + this.rightPointY, 

        );
        if (debug){
            strokeWeight(5);
            stroke("blue");
            point(this.word0.body.position.x + this.leftPointX, this.word0.body.position.y + this.leftPointY);
            point(this.word0.body.position.x + this.leftControlX, this.word0.body.position.y + this.leftControlY);
            point(this.word1.body.position.x + this.rightControlX, this.word1.body.position.y + this.rightControlY);
            point(this.word1.body.position.x + this.rightPointX, this.word1.body.position.y + this.rightPointY);
        }
        

    }
}