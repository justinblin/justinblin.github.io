//since processingJS includes body margin when calculating mouse mouse position, we have to find it and take it out for mouse position to work
var bodyElement = document.getElementsByTagName("body")[0];
var bodyWidth = bodyElement.clientWidth;
//finding the difference between the full document + the inside of the body (only element + padding)
var bodyMargin = (document.documentElement.clientWidth - bodyWidth)/2;

//the code that ProcessingJS will use
var programCode = function(processingInstance) {
    with (processingInstance) {
        size(400, 400); 
        frameRate(30);
            
        /**
         This is my first platformer, so there may be a few bugs. More levels are probably coming!
        Feel free to make your own levels through spin-offs.
        If textSize is a bit weird, restart the page.
        **/

        frameRate(30);
        textAlign(CENTER, CENTER);
        var non = createFont("Trebuchet MS");
        var bold = createFont("Trebuchet MS Bold");
        textFont(bold);

        var keys = [];
        keyPressed = function() {keys[keyCode] = true;};
        keyReleased = function() {keys[keyCode] = false;};

        var level = "intro";

        var kill = true;

        var clicked = false;
        var transrect = {
            out:false,
            width:400 
        };
        var transition = function(nextScene) {
            kill = false;
            fill(0, 0, 0);
            rect(-1, -1, width - transrect.width, height+1);
                if (transrect.width > 1 && transrect.out === false) {
                    transrect.width/=1.5;
                    if (transrect.width < 1) {
                        transrect.out = true;
                        level = nextScene;
                    }
                }
                
                if (transrect.width < 400 && transrect.out === true) {
                    transrect.width*=1.5;
                    if (transrect.width >= 400) {
                        transrect.out = false;
                        clicked = false;
                        kill = true;
                    }
                }
        };

        var reset = false;

        var bcksq = [];
        for (var a = -10; a < height; a+=20) {
            for(var b = -10; b < width; b+=20) {
                bcksq.push({
                    x:b,
                    y:a,
                    color:random(0, 30)
                });
            }
        }

        var objectsN = [];
        var objectsNMax;
        var objectsS = [];
        var objectsSMax;
        var objectsP = [];
        var objectsPMax;
        var objectsL = [];
        var objectsLMax;
        var objectsB = [];
        var objectsBMax;
        var objectsH = [];
        var objectsHMax;
        var objectsV = [];
        var objectsVMax;
        var drawObjects = function() {
            noStroke();
            
            var pixels = [];
            
            if (level === 1) {
                objectsNMax = 11;
                objectsSMax = 9;
                objectsPMax = 1;
                objectsLMax = 0;
                objectsBMax = 0;
                objectsHMax = 0;
                objectsVMax = 0;
                pixels = [
                    "--------------------",
                    "-------------------p",
                    "--------------------",
                    "---------------nonon",
                    "----------s---------",
                    "----s--s------------",
                    "--------------------",
                    "n-------------------",
                    "n-------------------",
                    "oss-----------------",
                    "------s-------------",
                    "------os------------",
                    "-----------s--------",
                    "-----------os-------",
                    "--------------------",
                    "-----------------non",
                    "----------------no--",
                    "----------------n---",
                    "-------------n--n---"
                ];
            }
            
            if (level === 2) {
                objectsNMax = 6;
                objectsSMax = 13;
                objectsPMax = 1;
                objectsLMax = 33;
                objectsBMax = 0;
                objectsHMax = 0;
                objectsVMax = 0;
                pixels = [
                    "--------n-----------",
                    "--------n-----------",
                    "sos-----n-----------",
                    "--------n--------s--",
                    "--------n-----------",
                    "--------n------s-l--",
                    "-----soso-s------l--",
                    "-----------------l--",
                    "--------------s--l--",
                    "-----------------l--",
                    "-----------s-----l--",
                    "--ss-------------l--",
                    "--------ss-------l--",
                    "-----------------l--",
                    "-----------------l--",
                    "-----------------l--",
                    "-----------------l--",
                    "-----------------l-p",
                    "llllllllllllllllllll"
                ];
            }
            
            if (level === 3) {
                objectsNMax = 0;
                objectsSMax = 3;
                objectsPMax = 1;
                objectsLMax = 22;
                objectsBMax = 2;
                objectsHMax = 0;
                objectsVMax = 0;
                pixels = [
                    "--------------------",
                    "--------------------",
                    "-------------------p",
                    "--------------s-----",
                    "--------------------",
                    "--------------------",
                    "--------------------",
                    "--------------------",
                    "--------------------",
                    "--------------------",
                    "--------------------",
                    "--------------------",
                    "----l------b--------",
                    "----l-sos-----------",
                    "----l---------------",
                    "----l---------------",
                    "----l---------------",
                    "----l---------------",
                    "--b-llllllllllllllll"
                ];
            }
            
            if (level === 4) {
                objectsNMax = 10;
                objectsSMax = 10;
                objectsPMax = 10;
                objectsLMax = 10;
                objectsBMax = 10;
                objectsHMax = 10;
                objectsVMax = 10;
                pixels = [
                    "-------------------p",
                    "--------------------",
                    "--------------------",
                    "--------------------",
                    "--------------------",
                    "--------------------",
                    "--------------------",
                    "--------------------",
                    "--------------------",
                    "--------------------",
                    "--------------------",
                    "--------------------",
                    "--------------------",
                    "--------------------",
                    "------------------ll",
                    "--------------------",
                    "------------------ll",
                    "-----------------nn-",
                    "------------------ll"
                ];
            }
            
            for (var rowNum = 0; rowNum < pixels.length; rowNum++) {
                for (var rowPos = 0; rowPos < pixels[rowNum].length; rowPos++) {
                    var indPixel = pixels[rowNum][rowPos];
                    
                    switch(indPixel) {
                        case "n":
                            //normal wall block
                            fill(90, 90, 90);
                            rect(rowPos*20, rowNum*20, 20, 20);
                            objectsN.push({
                                x:rowPos*20,
                                y:rowNum*20
                            });
                            if (objectsN.length > objectsNMax) {
                                objectsN.shift();
                            }
                            if (objectsN.length > objectsNMax) {
                                objectsN.splice(0, objectsN.length);
                            }
                            break;
                            
                        case "s":
                            //normal stand alone block
                            fill(90, 90, 90);
                            rect(rowPos*20, rowNum*20, 20, 20);
                            objectsS.push({
                                x:rowPos*20,
                                y:rowNum*20
                            });
                            if (objectsS.length > objectsSMax) {
                                objectsS.shift();
                            }
                            break;
                            
                        case "o":
                            //phantom block
                            fill(90, 90, 90);
                            rect(rowPos*20, rowNum*20, 20, 20);
                            break;
                            
                        case "p":
                            //portal block
                            fill(179, 0, 179);
                            rect(rowPos*20, rowNum*20, 20, 20);
                            fill(255, 0, 255);
                            ellipse(rowPos*20+10, rowNum*20+10, 20, 20);
                            fill(179, 0, 179);
                            ellipse(rowPos*20+10, rowNum*20+10, 15, 20);
                            fill(255, 0, 255);
                            ellipse(rowPos*20+10, rowNum*20+10, 15, 10);
                            fill(179, 0, 179);
                            ellipse(rowPos*20+10, rowNum*20+10, 5, 10);
                            fill(255, 0, 255);
                            ellipse(rowPos*20+10, rowNum*20+10, 5, 5);
                            objectsP.push({
                                x:rowPos*20,
                                y:rowNum*20
                            });
                            if (objectsP.length > objectsPMax) {
                                objectsP.shift();
                            }
                            break;
                            
                        case "l":
                            //lava block
                            fill(255, 80, 0);
                            rect(rowPos*20, rowNum*20, 20, 20);
                            fill(255, 60, 0);
                            ellipse(rowPos*20+5, rowNum*20+5, 5, 5);
                            ellipse(rowPos*20+15, rowNum*20+10, 5, 5);
                            ellipse(rowPos*20+10, rowNum*20+15, 5, 5);
                            objectsL.push({
                                x:rowPos*20,
                                y:rowNum*20
                            });
                            if (objectsL.length > objectsLMax) {
                                objectsL.shift();
                            }
                            break;
                            
                        case "b":
                            //bouncy block
                            fill(20, 200, 20);
                            rect(rowPos*20, rowNum*20, 20, 20);
                            fill(20, 210, 20);
                            rect(rowPos*20, rowNum*20, 5, 5);
                            rect(rowPos*20+10, rowNum*20, 5, 5);
                            rect(rowPos*20+5, rowNum*20+5, 5, 5);
                            rect(rowPos*20+15, rowNum*20+5, 5, 5);
                            rect(rowPos*20, rowNum*20+10, 5, 5);
                            rect(rowPos*20+10, rowNum*20+10, 5, 5);
                            rect(rowPos*20+5, rowNum*20+15, 5, 5);
                            rect(rowPos*20+15, rowNum*20+15, 5, 5);
                            objectsB.push({
                                x:rowPos*20,
                                y:rowNum*20
                            });
                            if (objectsB.length > objectsBMax) {
                                objectsB.shift();
                            }
                            break;
                            
                        case "h":
                            //horizontal move
                            fill(0, 0, 255);
                            ellipse(rowPos*20+10, rowNum*20+10, 20, 20);
                            objectsH.push({
                                x:rowPos*20,
                                y:rowNum*20
                            });
                            if (objectsH.length > objectsHMax) {
                                objectsH.shift();
                            }
                            break;
                            
                        case "v":
                            //vertical move
                            fill(0, 0, 255);
                            ellipse(rowPos*20+10, rowNum*20+10, 20, 20);
                            objectsV.push({
                                x:rowPos*20,
                                y:rowNum*20
                            });
                            if (objectsV.length > objectsVMax) {
                                objectsV.shift();
                            }
                            break;
                    }
                }
            }
        };

        var Player = function(x, y, size) {
            this.x = x;
            this.y = y;
            this.size = size;
            this.startx = 0;
            this.starty = 340;
            
            this.xvel = 0;
            this.xmax = 5;
            this.drag = 0.6;
            
            this.yvel = 0;
            this.ymax = 10;
            this.g = 1;
            this.jumped = false;
            this.down = false;
            
            this.next = true;
        };

        Player.prototype.draw = function() {
            noStroke();
            fill(0, 225, 255);
            rect(this.x, this.y, this.size, this.size);
        };

        Player.prototype.collide = function() {
            //normal wall
                for (var a = 0; a < objectsN.length; a++) {
                    //left
                        if (this.x + this.size > objectsN[a].x && this.x < objectsN[a].x + 10 && this.y >= objectsN[a].y && this.y + 20 <= objectsN[a].y + 20) {
                            this.x = objectsN[a].x - 20;
                            this.xvel = 0;
                        }
                        
                    //right
                        if (this.x > objectsN[a].x + 10 && this.x < objectsN[a].x + 20 && this.y >= objectsN[a].y && this.y + 20 <= objectsN[a].y + 20) {
                            this.x = objectsN[a].x + 20;
                            this.xvel = 0;
                        }
                    
                    //top
                        if (this.x + this.size > objectsN[a].x && this.x < objectsN[a].x + 20 && this.y + 20 >= objectsN[a].y && objectsN[a].y + 10 > this.y + 20) {
                            this.y = objectsN[a].y - 20;
                            if (this.yvel > 0) {
                                this.yvel = 0;
                                this.g = 0;
                            }
                        }
                    
                    //bottom
                        if (this.x + this.size > objectsN[a].x && this.x < objectsN[a].x + 20 && this.y <= objectsN[a].y + 20 && objectsN[a].y + 10 < this.y) {
                            this.y = objectsN[a].y + 20;
                            this.yvel = 0;
                        }
                }
                
            //normal standalone
                for (var a = 0; a < objectsS.length; a++) {
                    //left
                        if (this.x + this.size > objectsS[a].x && this.x < objectsS[a].x + 10 && this.y >= objectsS[a].y && this.y + 20 <= objectsS[a].y + 20) {
                            this.x = objectsS[a].x - 20;
                            this.xvel = 0;
                        }
                        
                    //right
                        if (this.x > objectsS[a].x + 10 && this.x < objectsS[a].x + 20 && this.y >= objectsS[a].y && this.y + 20 <= objectsS[a].y + 20) {
                            this.x = objectsS[a].x + 20;
                            this.xvel = 0;
                        }
                    
                    //top
                        if (this.x + this.size > objectsS[a].x && this.x < objectsS[a].x + 20 && this.y + 20 >= objectsS[a].y && objectsS[a].y + 10 > this.y + 20) {
                            this.y = objectsS[a].y - 20;
                            if (this.yvel > 0) {
                                this.yvel = 0;
                                this.g = 0;
                            }
                        }
                    
                    //bottom
                        if (this.x + this.size > objectsS[a].x && this.x < objectsS[a].x + 20 && this.y <= objectsS[a].y + 20 && objectsS[a].y + 10 < this.y) {
                            this.y = objectsS[a].y + 25;
                            this.yvel = 0;
                        }
                }
            
            //portal
                if (this.x + 20 > objectsP[0].x && this.x < objectsP[0].x + 20 && objectsP[0].y + 20 > this.y && this.y + 20 > objectsP[0].y) {
                    clicked = true;
                    if (level === 1 && this.next === true) {
                        reset = true;
                        this.startx = 0;
                        this.starty = 0;
                        this.x = this.startx;
                        this.y = this.starty;
                        this.next = false;
                    }
                    
                    if (level === 2 && this.next === true) {
                        reset = true;
                        this.startx = 0;
                        this.starty = 340;
                        this.x = this.startx;
                        this.y = this.starty;
                        this.next = false;
                        //println("hi " + this.startx + " " + this.starty + " " + this.x + " " + this.y);
                    }
                    
                    if (level === 3 && this.next === true) {
                        reset = true;
                        this.startx = 0;
                        this.starty = 340;
                        this.x = this.startx;
                        this.y = this.starty;
                        this.next = false;
                    }
                    
                    if (level === 4 && this.next === true) {
                        reset = true;
                        this.next = false;
                    }
                }
            
                if (level === 1) {
                    this.startx = 0;
                    this.starty = 340;
                }
                
                if (level === 2) {
                    this.startx = 0;
                    this.starty = 0;
                }
                
                if (level === 3) {
                    this.startx = 0;
                    this.starty = 340;
                }
                
                if (level === 4) {
                    this.startx = 0;
                    this.starty = 340;
                }
            
            //lava
                for (var a = 0; a < objectsL.length; a++) {
                    //collide
                        if (this.x + this.size > objectsL[a].x && this.x < objectsL[a].x + 20 && this.y >= objectsL[a].y && this.y + 20 <= objectsL[a].y + 20 && kill === true) {
                            this.x = this.startx;
                            this.y = this.starty;
                        }
                }
            
            //horizontal move
                for (var a = 0; a < objectsH.length; a++) {
                    //collide
                        if (this.x + this.size > objectsH[a].x && this.x < objectsH[a].x + 20 && this.y >= objectsH[a].y && this.y + 20 <= objectsH[a].y + 20 && kill === true) {
                            this.x = this.startx;
                            this.y = this.starty;
                            //println("hi");
                        }
                }
                
            //vertical move
                for (var a = 0; a < objectsV.length; a++) {
                    //collide
                        if (this.x + this.size > objectsV[a].x && this.x < objectsV[a].x + 20 && this.y >= objectsV[a].y && this.y + 20 <= objectsV[a].y + 20 && kill === true) {
                            this.x = this.startx;
                            this.y = this.starty;
                        }
                }
                
            //bouncy
                for (var a = 0; a < objectsB.length; a++) {
                    //left
                        if (this.x + this.size > objectsB[a].x && this.x < objectsB[a].x + 10 && this.y >= objectsB[a].y && this.y + 20 <= objectsB[a].y + 20) {
                            this.x = objectsB[a].x - 20;
                            this.xvel = 0;
                        }
                        
                    //right
                        if (this.x > objectsB[a].x + 10 && this.x < objectsB[a].x + 20 && this.y >= objectsB[a].y && this.y + 20 <= objectsB[a].y + 20) {
                            this.x = objectsB[a].x + 20;
                            this.xvel = 0;
                        }
                    
                    //top
                        if (this.x + this.size > objectsB[a].x && this.x < objectsB[a].x + 20 && this.y + 20 >= objectsB[a].y && objectsB[a].y + 10 > this.y + 20) {
                            this.y = objectsB[a].y - 20;
                            this.yvel = -20;
                        }
                    
                    //bottom
                        if (this.x + this.size > objectsB[a].x && this.x < objectsB[a].x + 20 && this.y <= objectsB[a].y + 20 && objectsB[a].y + 10 < this.y) {
                            this.y = objectsB[a].y + 20;
                            this.yvel = 0;
                        }
                }
        };

        Player.prototype.move = function() {
            if (this.x < 0) {
                this.x = 0;
            }
            
            if (this.x + this.size > 400) {
                this.x = 400 - this.size;
            }
            
            if (keys[LEFT] && abs(this.xvel) < this.xmax) {
                this.xvel-=1.5;
                if (this.next === false) {
                    this.next = true;
                }
            }
            
            if (keys[RIGHT] && abs(this.xvel) < this.xmax) {
                this.xvel+=1.5;
                if (this.next === false) {
                    this.next = true;
                }
            }
            
            this.g = 1;
            if (keys[UP] && this.jumped === false && this.yvel === 0) {
                this.yvel = -10;
                this.jumped = true;
                //println("1");
            }
            
            if (this.jumped === true && this.yvel > 0 && this.down === false) {
                this.down = true;
                //println("2");
            }
            
            if (this.down === true && this.yvel === 0) {
                this.jumped = false;
                this.down = false;
                //println("3");
            }
            
            this.x += this.xvel;
            if (this.xvel > 0) {
                this.xvel -= this.drag;
            }
            
            if (this.xvel < 0) {
                this.xvel += this.drag;
            }
            
            if (abs(this.xvel) < this.xmax/10) {
                this.xvel = 0;
            }
            
            //println(this.yvel);
            this.y += this.yvel;
            if (this.yvel < this.ymax) {
                this.yvel += this.g;
            }
            
            if (this.y > 360) {
                this.y = 360;
                this.yvel = 0;
                this.g = 0;
            }
            //println(this.x + " " + this.y);
        };

        var char = new Player(0, 340, 20);

        draw = function() {
            //println(kill);
            background(255, 255, 255);
            
            if (level === 1|level === 2|level === 3|level === 4) {
                drawObjects();
                fill(90, 90, 90);
                rect(-1, 380, 401, 20);
                
                if (level === 1) {
                    textFont(non);
                    textSize(15);
                    fill(90, 90, 90);
                    text("Try to get to the portal up top,\nuse the arrow keys to move", 150, 350);
                }
                
                if (level === 2) {
                    textFont(non);
                    textSize(15);
                    fill(90, 90, 90);
                    text("Lava will kill you if you fall in", 150, 320);
                }
                
                if (level === 3) {
                    textFont(non);
                    textSize(15);
                    fill(90, 90, 90);
                    text("Bouncy blocks let you jump higher", 150, 200);
                }
                
                char.collide();
                char.draw();
                char.move();
                
                if (reset === true) {
                    objectsN.splice(0, objectsN.length);
                    objectsS.splice(0, objectsS.length);
                    objectsP.splice(0, objectsP.length);
                    objectsL.splice(0, objectsL.length);
                    objectsB.splice(0, objectsB.length);
                    //println(objectsN.length);
                    reset = false;
                }
            }
            
            if (level === "intro"|level === "end") {
                for (var a = 0; a < bcksq.length; a++) {
                    noStroke();
                    fill(255-bcksq[a].color, 255-bcksq[a].color, 255-bcksq[a].color);
                    rect(bcksq[a].x, bcksq[a].y, 20, 20);
                }
                
                if (level === "intro") {
                    textFont(bold);
                    textSize(40);
                    fill(214, 214, 214);
                    text("ADVENTURES\nOF\nCUBEY", 203, 108);
                    fill(0, 0, 0);
                    text("ADVENTURES\nOF\nCUBEY", 200, 105);
                    
                    fill(0, 0, 0, 100);
                    if (dist(mouseX - bodyMargin, mouseY - bodyMargin, 200, 300) < 62.5) {
                        fill(0, 0, 0, 150);
                    }
                    ellipse(200, 300, 125, 125);
                    
                    fill(255, 255, 255);
                    textSize(30);
                    text("START", 200, 300);
                }
                
                if (level === "end") {
                    textFont(bold);
                    fill(0, 0, 0);
                    textSize(50);
                    text("YOU WIN!", 200, 100);
                    textFont(non);
                    textSize(20);
                    text("More levels coming soon!", 200, 250);
                }
            }
            
            if (clicked === true) {
                if (level === "intro") {
                    transition(1);
                }
                
                if (level === 1) {
                    transition(2);
                }
                
                if (level === 2) {
                    transition(3);
                }
                
                if (level === 3) {
                    transition("end");
                }
                
                if (level === 4) {
                    transition("end");
                }
                
                if (level === "end") {
                    transition("end");
                }
            }
            //println(level);
            //println(objectsN.length + " " + objectsS.length + " " + reset);
            
            if (objectsN.length > objectsNMax) {
                objectsN.splice(0, objectsN.length);
            }
            
            if (objectsS.length > objectsSMax) {
                objectsS.splice(0, objectsS.length);
            }
            
            if (objectsL.length > objectsLMax) {
                objectsL.splice(0, objectsL.length);
            }
            
            if (objectsB.length > objectsBMax) {
                objectsB.splice(0, objectsB.length);
            }
            
            if (objectsH.length > objectsHMax) {
                objectsH.splice(0, objectsH.length);
            }
            
            if (objectsV.length > objectsVMax) {
                objectsV.splice(0, objectsV.length);
            }
        };

        mouseClicked = function() {
            if (dist(mouseX - bodyMargin, mouseY - bodyMargin, 200, 300) < 62.5 && level === "intro") {
                clicked = true;
            }
        };
    }
};

// Get the canvas that ProcessingJS will use
var canvas = document.getElementById("cubey"); 
// Pass the function to ProcessingJS constructor
var processingInstance = new Processing(canvas, programCode); 