//since processingJS includes body margin when calculating mouse position, we have to find it and take it out for mouse position to work
var bodyElement = document.getElementsByTagName("body")[0];
var bodyWidth = bodyElement.clientWidth;
//finding the difference between the full document + the inside of the body (only element + padding)
var bodyMargin = (document.documentElement.clientWidth - bodyWidth)/2;

var programCode = function(processingInstance) {
    with (processingInstance) {
        size(400, 400); 
        frameRate(30);
            
        var cannon = {
            x:200,
            y:400,
            width:25,
            height:40
        };
        
        var hypotenuse = dist(cannon.x, cannon.y, mouseX - bodyMargin, mouseY - bodyMargin);
        var side = abs(mouseY - bodyMargin - 200);
        var cosine = side/hypotenuse;
        var acosine = degrees(acos(cosine));
        var angle = acosine;
        
        var balloon = [];
        var backsq = [];
        
        for (var a = -15; a < 400; a += 20) {
            for (var b = -25; b < 400; b +=20) {
                backsq.push({
                    x:a,
                    y:b,
                    shade:random(0, 50)
                });
            }
        }
        
        var score = 0;
        var hiscore = score;
        var screen = 0;
        var lives = 3;
        
        for (var j = 0; j < 5; j++) {
            balloon.push({
                x:random(0, 400),
                y:random(-550, -50),
                size:random(30, 40),
                popped:false,
                speed:random(1.5, 2),
                truspeed:0,
                color:round(random(0, 100))
            });
        }
        
        var shot = [];
        var timeOfLastShot = -1;//keeps track of when the last shot was fired to prevent spam shooting
        
        draw = function() {
            for (var c = 0; c < backsq.length; c++) {
                noStroke();
                fill(137 - backsq[c].shade, 218 - backsq[c].shade, 224);
                rect(backsq[c].x, backsq[c].y, 20, 20);
            }
            
            //ROTATION OF CANNON
                hypotenuse = dist(cannon.x, cannon.y, mouseX - bodyMargin, mouseY - bodyMargin);
                side = abs(mouseY - bodyMargin - cannon.y);
                cosine = side/hypotenuse;
                acosine = degrees(acos(cosine));//find the angle based on the proportion of the sides
                
                if(mouseX - bodyMargin < cannon.x) {
                    angle = (acosine * -1 + 360);
                }
                
                if(mouseY - bodyMargin > cannon.y) {
                    angle = (acosine * -1 + 180);
                }
                
                if(mouseX - bodyMargin < cannon.x && mouseY - bodyMargin > cannon.y) {
                    angle = ((acosine * -1 + 180)*-1 + 360);
                }
                
                if(mouseX - bodyMargin > cannon.x && mouseY - bodyMargin < cannon.y) {
                    angle = (acosine);
                }
                
            //TARGET
                fill(255, 0, 0);
                noStroke();
                ellipse(mouseX - bodyMargin, mouseY - bodyMargin, 30, 30);
                fill(137, 218, 224);
                ellipse(mouseX - bodyMargin, mouseY - bodyMargin, 25, 25);
                fill(255, 0, 0);
                rect(mouseX - bodyMargin - 1.5, mouseY - bodyMargin - 20, 3, 40);
                rect(mouseX - bodyMargin - 20, mouseY - bodyMargin - 1.5, 40, 3);
                
            //game screen
                if (score > hiscore) {
                    hiscore = score;
                }
                textSize(15);
                textFont(createFont("Trebuchet MS Bold"));
                noStroke();
                fill(255, 255, 255);
                rect(30, 30, 330, 50, 10);
                textAlign(CENTER, CENTER);
                fill(0, 0, 0);
                text("SCORE", 70, 45);
                text("HIGHSCORE", 150, 45);
                text("LIVES", 275, 45);
                textFont(createFont("Trebuchet MS"));
                text(score, 70, 65);
                text(hiscore, 150, 65);
                stroke(0, 0, 0);
                fill(255, 0, 0);
                if (lives <= 0) {
                    fill(255, 255, 255);
                    screen = 2;
                }
                ellipse(250, 65, 10, 10);
                if (lives <= 1) {
                    fill(255, 255, 255);
                }
                ellipse(275, 65, 10, 10);
                if (lives <= 2) {
                    fill(255, 255, 255);
                }
                ellipse(300, 65, 10, 10);
                
            mouseClicked = function() {
                if (screen === 1 && frameCount - timeOfLastShot > 15) {//makes sure shots are at least 15 frames apart to prevent spam shooting
                    shot.unshift({//creates a new shot object
                        x:cannon.x,
                        y:cannon.y,
                        size:23,
                        speedx:0,
                        speedy:0,
                        rotAngle:angle,
                        flatspeed:15
                    });
                    timeOfLastShot = frameCount;//updates the time of the last shot to prevent spam shooting
                }
                
                if (dist(mouseX - bodyMargin, mouseY - bodyMargin, 200, 330) < 45 && screen === 0) {
                    screen = 1;
                }
                        
                if (dist(mouseX - bodyMargin, mouseY - bodyMargin, 200, 330) < 45 && screen === 2) {
                    screen = 0;
                    lives = 3;
                }
            };
                
            //BALLOONS
                for (var o = 0; o < balloon.length; o++) {
                    if (screen === 1) {
                        balloon[o].truspeed = balloon[o].speed + score/20;
                    }
                    
                    if (balloon[o].popped === false) {
                        if (balloon[o].color < 33) {
                            fill(255, 0, 0);
                        }
                        
                        if (balloon[o].color >= 33 && balloon[o].color < 66) {
                            fill(0, 255, 0);
                        }
                        
                        if (balloon[o].color >= 66) {
                            fill(0, 0, 255);
                        }
                        strokeWeight(2);
                        stroke(0, 0, 0);
                        line(balloon[o].x, balloon[o].y, balloon[o].x, balloon[o].y + balloon[o].size*2);
                        strokeWeight(1);
                        triangle(balloon[o].x, balloon[o].y + balloon[o].size/2, balloon[o].x - balloon[o].size/10, balloon[o].y + balloon[o].size*3/4, balloon[o].x + balloon[o].size/10, balloon[o].y + balloon[o].size*3/4);
                        ellipse(balloon[o].x, balloon[o].y, balloon[o].size*3/4, balloon[o].size);
                    }
                    
                    if (balloon[o].y > 450) {
                        if (screen === 1 && balloon[o].popped === false) {
                            lives--;
                        }
                        
                        balloon[o].y = balloon[o].y - random(500, 650);
                        balloon[o].x = random(0, 400);
                        balloon[o].size = random(30, 40);
                        balloon[o].popped = false;
                        balloon[o].speed = random(1.5, 2);
                        balloon[o].color = round(random(0, 100));
                    }
                    
                    if (screen === 1) {
                        balloon[o].y = balloon[o].y + balloon[o].truspeed;
                    }
                }
            
            //SHOTS
                for (var i = 0; i<shot.length; i++) {
                    fill(0, 0, 0);
                        
                    ellipse(shot[i].x, shot[i].y, shot[i].size, shot[i].size);
                        
                    shot[i].x = shot[i].x + shot[i].speedx;
                    shot[i].y = shot[i].y - shot[i].speedy;
                        
                    //calculations
                        shot[i].speedy = abs(shot[i].rotAngle - 180)*shot[i].flatspeed/90 - shot[i].flatspeed;
                            
                        if (shot[i].rotAngle <= 270) {
                            shot[i].speedx = abs(shot[i].rotAngle - 90)*-shot[i].flatspeed/90 + shot[i].flatspeed;
                        }
                            
                        if (shot[i].rotAngle > 270) {
                            shot[i].speedx = (shot[i].rotAngle-270)*shot[i].flatspeed/90 - shot[i].flatspeed;
                        }
                        
                        //collision/balloon pop
                            for (var j = 0; j < balloon.length; j++) {
                                if (dist(shot[i].x, shot[i].y, balloon[j].x, balloon[j].y) < shot[i].size + balloon[0].size*3/4 && balloon[j].popped === false) {
                                    balloon[j].popped = true;
                                    score++;
                                    //playSound(getSound("rpg/hit-thud"));//only works on KA
                                }
                            }

                    //remove shots that go off screen so it doesn't lag up the game
                    if (shot[i].y < -100 || shot[i].x < -100 || shot[i].x > width+100) {//remove shots that go off the screen
                        shot.splice(i, 1);//remove the shot that goes off screen
                    }
                }
                
            //CANNON
                pushMatrix();
                translate(cannon.x, cannon.y);
                rotate(radians(angle));
                
                fill(168, 168, 168);
                stroke(0, 0, 0);
                rect(-cannon.width/2, -cannon.height, cannon.width, cannon.height);
                popMatrix();
                ellipse(cannon.x, cannon.y, 50, 50);
                
            //INTRO SCREEN
                if (screen === 0) {
                    for (var j = 0; j < 5; j++) {
                        balloon.shift();
                        balloon.push({
                            x:random(0, 400),
                            y:random(-550, -50),
                            size:random(30, 40),
                            popped:false,
                            speed:random(1.5, 2),
                            truspeed:0,
                            color:round(random(0, 100))
                        });
                    }
        
                    
                    for (var c = 0; c < backsq.length; c++) {
                        noStroke();
                        fill(137 - backsq[c].shade, 218 - backsq[c].shade, 224);
                        rect(backsq[c].x, backsq[c].y, 20, 20);
                    }
                    
                    var introballoon = {
                        x:200,
                        y:50,
                        size:50,
                        diff:-3
                    };
                    
                    score = 0;
                    
                    fill(153, 148, 148);
                    strokeWeight(2);
                    stroke(107, 105, 105);
                    line(introballoon.x-introballoon.diff, introballoon.y-introballoon.diff, introballoon.x-introballoon.diff, introballoon.y-introballoon.diff + introballoon.size*2);
                    strokeWeight(1);
                    noStroke();
                    triangle(introballoon.x-introballoon.diff, introballoon.y-introballoon.diff + introballoon.size/2, introballoon.x-introballoon.diff - introballoon.size/10, introballoon.y-introballoon.diff + introballoon.size*3/4, introballoon.x-introballoon.diff + introballoon.size/10, introballoon.y-introballoon.diff + introballoon.size*3/4);
                    ellipse(introballoon.x-introballoon.diff, introballoon.y-introballoon.diff, introballoon.size*3/4, introballoon.size);
                    
                    fill(255, 0, 0);
                    strokeWeight(2);
                    stroke(0, 0, 0);
                    line(introballoon.x, introballoon.y, introballoon.x, introballoon.y + introballoon.size*2);
                    strokeWeight(1);
                    noStroke();
                    triangle(introballoon.x, introballoon.y + introballoon.size/2, introballoon.x - introballoon.size/10, introballoon.y + introballoon.size*3/4, introballoon.x + introballoon.size/10, introballoon.y + introballoon.size*3/4);
                    ellipse(introballoon.x, introballoon.y, introballoon.size*3/4, introballoon.size);
                    
                    textFont(createFont("Trebuchet MS Bold"));
                    textSize(45);
                    fill(186, 180, 180);
                    text("BALLOON POPPER", 203, 180);
                    fill(255, 255, 255);
                    text("BALLOON POPPER", 200, 175);
                    
                    textFont(createFont("Trebuchet MS"));
                    textSize(20);
                    fill(186, 180, 180);
                    text("by Justin Lin", 270, 218);
                    fill(255, 255, 255);
                    text("by Justin Lin", 270, 215);
                    
                    //button
                        var buttonshadowcolor = color(161, 161, 161, 150);
                        fill(buttonshadowcolor);
                        ellipse(200, 335, 90, 95);
                        var buttoncolor = color(255, 255, 255, 150);
                        if (dist(mouseX - bodyMargin, mouseY - bodyMargin, 200, 330) < 45) {
                            buttoncolor = color(255, 255, 255, 220);
                        }
                        fill(buttoncolor);
                        ellipse(200, 330, 90, 90);
                        fill(0, 0, 0);
                        text("START", 200, 330);
                }
                
            //END SCREEN
                if (screen === 2) {
                    for (var c = 0; c < backsq.length; c++) {
                        noStroke();
                        fill(137 - backsq[c].shade, 218 - backsq[c].shade, 224);
                        rect(backsq[c].x, backsq[c].y, 20, 20);
                    }
                    
                    fill(255, 255, 255);
                    textFont(createFont("Trebuchet MS Bold"));
                    textSize(50);
                    text("GAME OVER", 200, 150);
                    
                    //button
                        var buttonshadowcolor2 = color(161, 161, 161, 150);
                        fill(buttonshadowcolor2);
                        ellipse(200, 335, 90, 95);
                        var buttoncolor2 = color(255, 255, 255, 150);
                        if (dist(mouseX - bodyMargin, mouseY - bodyMargin, 200, 330) < 45) {
                            buttoncolor2 = color(255, 255, 255, 220);
                        }
                        fill(buttoncolor2);
                        ellipse(200, 330, 90, 90);
                        fill(0, 0, 0);
                        textSize(20);
                        text("RESTART", 200, 330);
                        
                    //score/hiscore
                        textSize(15);
                        textFont(createFont("Trebuchet MS Bold"));
                        noStroke();
                        fill(255, 255, 255);
                        rect(120, 30, 160, 50, 10);
                        textAlign(CENTER, CENTER);
                        fill(0, 0, 0);
                        text("SCORE", 150, 45);
                        text("HIGHSCORE", 230, 45);
                        textFont(createFont("Trebuchet MS"));
                        text(score, 150, 65);
                        text(hiscore, 230, 65);
                }
        };
    }
};

// Get the canvas that ProcessingJS will use
var canvas = document.getElementById("balloon-popper"); 
// Pass the function to ProcessingJS constructor
var processingInstance = new Processing(canvas, programCode); 