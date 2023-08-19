//since processingJS includes body margin when calculating mouse mouse position, we have to find it and take it out for mouse position to work
var bodyElement = document.getElementsByTagName("body")[0];
var bodyWidth = bodyElement.clientWidth;
//finding the difference between the full document + the inside of the body (only element + padding)
var bodyMargin = (document.documentElement.clientWidth - bodyWidth)/2;

//the code that ProcessingJS will use
var programCode = function (processingInstance) {
    with (processingInstance) {
        size(600,500);
        frameRate(60);

        //VARIABLES N STUFF
        var gameState = "start"; //start play1 play2 - I wanna add win1+win2 screens

        //how do we make a new screen - look at the start screen, work from there
        //how do we transition to the new screens - look at start to game transition, maybe tutorial transition
        //how do we know who won - check the scores if they go over a certain amount, go to end screen and reset everything

        noStroke();
        textAlign(CENTER, CENTER);
        textFont(createFont("Trebuchet MS Bold"));
        var frames = 0;
        var elapsed = 0;
        var score = {
            left:0,
            right:0
        };
        var winner = "none";
        var delayFrames = 0;
        var delayElapsed = 0; 

        //background
            var sideSq = [];
            for (var a = -10; a <= 600; a += 20) {
                sideSq.push({
                    x:a,
                    color:random(170, 210)
                });
            }
            var drawSides = function(y) {
                for (var a = 0; a < sideSq.length; a++) {
                    fill(sideSq[a].color);
                    rect(sideSq[a].x, y, 20, 20);
                }
            };
            
            var bckSq = [];
            for (var a = -10; a <= 600; a+=20) {
                for (var b = -10; b <= 490; b+=20) {
                    bckSq.push({
                        x:a,
                        y:b,
                        color:random(0,30)
                    });
                }
            }
            var drawBck = function() {
                for (var a = 0; a < bckSq.length; a++) {
                    fill(bckSq[a].color);
                    rect(bckSq[a].x, bckSq[a].y, 20, 20);
                }
                
                if (gameState === "play1" || gameState === "play2") {
                    drawSides(-10);
                    drawSides(490);
                    
                    for(var a = 20; a < 490; a+=25) {
                        rect(298, a, 4, 10, 1.5);
                    }
                }
            };
            
        //pixel art of the title
            var title = [
                "wwwwwwww--wwwwwwww--ww----ww--wwwwwwww",
                "wwwwwwww--wwwwwwww--ww----ww--wwwwwwww",
                "ww----ww--ww----ww--www---ww--ww------",
                "ww----ww--ww----ww--www---ww--ww------",
                "ww----ww--ww----ww--wwww--ww--ww------",
                "ww----ww--ww----ww--wwww--ww--ww------",
                "wwwwwwww--ww----ww--ww-ww-ww--ww--wwww",
                "wwwwwwww--ww----ww--ww-ww-ww--ww--wwww",
                "ww--------ww----ww--ww--wwww--ww----ww",
                "ww--------ww----ww--ww--wwww--ww----ww",
                "ww--------ww----ww--ww---www--ww----ww",
                "ww--------ww----ww--ww---www--ww----ww",
                "ww--------wwwwwwww--ww----ww--wwwwwwww",
                "ww--------wwwwwwww--ww----ww--wwwwwwww"
            ];
            var titleRan = [];
            
            var pixelArt = function(x, y, size, grid, gridRan, rand) {
                for (var rowNum = 0; rowNum < grid.length; rowNum++) {
                    for (var rowPos = 0; rowPos < grid[0].length; rowPos++){
                        gridRan.push(random(0,rand));
                        if (gridRan.length > grid[0].length * grid.length) {
                            gridRan.pop();
                        }
                        
                        var indPixel = grid[rowNum][rowPos];
                        switch(indPixel) {
                            case "w":
                                if (rowNum === 0) {
                                    fill(255-(gridRan[rowPos]));
                                }
                                else if (rowPos === 0) {
                                    fill(255-(gridRan[rowNum*grid[0].length]));
                                }
                                else {
                                    fill(255-(gridRan[rowNum*rowPos+1]));
                                }
                                
                                rect(x + rowPos * size, y + rowNum * size, size, size);
                                break;
                        }
                    }
                }
            };
            
        //keys function - movement for both players
            var keys = [false, false, false, false];
            keyPressed = function() {
                if (key.toString() === "q") {
                    keys[0] = true;
                }
                if (key.toString() === "a") {
                    keys[1] = true;
                }
                if (key.toString() === "k") {
                    keys[2] = true;
                }
                if (key.toString() === "m") {
                    keys[3] = true;
                }
            };
            keyReleased = function() {
                if (key.toString() === "q") {
                    keys[0] = false;
                }
                if (key.toString() === "a") {
                    keys[1] = false;
                }
                if (key.toString() === "k") {
                    keys[2] = false;
                }
                if (key.toString() === "m") {
                    keys[3] = false;
                }
            };
            
        var ball = {//ball object
            x:295,
            y:245,
            xVel:0,
            yVel:0,
            serve:false,
            fast:9,
            slow:6
        };

        //players
            var Paddle = function(pos) {//paddle object constructor
                if (pos === "left") {
                    this.x = 20;
                }
                else {
                    this.x = 565;   
                }
                this.y = 225;
                this.pos = pos;
            };
            
            Paddle.prototype.draw = function() {//draws each player
                fill(255, 255, 255);//outer white paddle
                rect(this.x, this.y, 10, 50, 2);//10px wide 50px high
                fill(191, 76, 99);//inner red paddle
                rect(this.x, this.y + 15, 10, 20);//10px wide 20px high in the middle of the white paddle
            };
            
            Paddle.prototype.move = function() {//moves each player based on the key presses, also stops the paddle from going out of bounds
                if (this.pos === "left") {
                    if (keys[0] === true && this.y > 10) {
                        this.y-=10/3;
                    }
                    if (keys[1] === true && this.y < 490 - 50) {
                        this.y+=10/3;
                    }
                }
                else {
                    if (keys[2] === true && this.y > 10) {
                        this.y-=10/3;
                    }
                    if (keys[3] === true && this.y < 490 - 50) {
                        this.y+=10/3;
                    }
                }
            };
            
            Paddle.prototype.collide = function() {//makes the ball bounce off the paddle
                if (ball.x > this.x && ball.x < this.x + 10) {
                    if (ball.y + 10 > this.y && this.y + 50 > ball.y) {
                        if (this.pos === "left") {
                            ball.x = this.x + 10;//set the ball to serving position
                            if (ball.y + 5 > this.y + 15 && ball.y + 5 < this.y + 35) {
                                ball.xVel = ball.fast;
                                ball.yVel *= -2/3;
                            }
                            else if (ball.y + 5 < this.y + 25) {
                                ball.xVel = ball.slow;
                                ball.yVel = random(-4, -1);
                            }
                            else {
                                ball.xVel = ball.slow;
                                ball.yVel = random(1, 4);
                            }
                        }
                        
                        if (this.pos === "right") {
                            ball.x = this.x - 10;//sets the ball to serving position
                            if (ball.y + 5 > this.y + 15 && ball.y + 5 < this.y + 35) {
                                ball.xVel = -1 * ball.fast;
                                ball.yVel *= -2/3;
                            }
                            else if (ball.y + 5 < this.y + 25) {
                                ball.xVel = -1 * ball.slow;
                                ball.yVel = random(-4, -1);
                            }
                            else {
                                ball.xVel = -1 * ball.slow;
                                ball.yVel = random(1, 4);
                            }
                        }
                    }
                }
            };
            
            Paddle.prototype.ai = function() {//makes the ai move based on ball position
                //adding a distance requirement of at least 5 px to hopefully stop the jittering

                if (ball.y > 150 && ball.y < 350) {//if the ball is in the middle
                    if (this.y + 25 < ball.y + 5 && Math.abs((this.y+25)-(ball.y+5)) > 3) {//if the middle of the paddle is above the middle of the ball
                        this.y+=2.5;//move the paddle down
                    }
                    else if (Math.abs((this.y+25)-(ball.y+5)) > 3) {
                        this.y-=2.5;//move the paddle up
                    }
                }
                else if (ball.y <= 150) {//if the ball is at the top
                    //if the middle of the upper white part of the paddle is above the ball's middle
                    if (this.y + 15/2 < ball.y + 5 && Math.abs((this.y+25)-(ball.y+5)) > 3) {
                        this.y+=2.5;//move the paddle down
                    }
                    else if (this.y > 10 && Math.abs((this.y+25)-(ball.y+5)) > 3) {//stops the paddle from going out of bounds
                        this.y-=2.5;//move the paddle up
                    }
                }
                else {//if the ball is at the bottom
                    //if the middle of the bottom white part of the paddle is above the ball -- stops the paddle from going out of bounds
                    if (this.y + 35 + 15/2 < ball.y + 5 && this.y + 50 < 490 && Math.abs((this.y+25)-(ball.y+5)) > 3) {
                        this.y+=2.5;//move the paddle down
                    }
                    else if (Math.abs((this.y+25)-(ball.y+5)) > 3) {
                        this.y-=2.5;//move the paddle up
                    }
                }
            };
            
            Paddle.prototype.reset = function() {//moves the paddle y position back and the ball to default
                this.y = 225;
                
                ball.x = 295;
                ball.y = 245;
                ball.xVel = 0;
                ball.yVel = 0;
                ball.serve = false;
            };
            
            //creates the actual paddle players using the constructor
            var rightPaddle = new Paddle("right");
            var leftPaddle = new Paddle("left");
            
        //transitions
            var clicked = false;//keeps track of which state you want to go to based on the mouse click, also functions as ON/OFF switch
            
            var transRect = {//transition object for the rect
                x:-width,
                dir:"right"
            };

            var transition = function() {//slide transition from start to game state
                fill(0, 0, 0);
                rect(transRect.x, -1, width, height + 1);//creates the rect that ppl see.
                if (transRect.x < -1 && transRect.dir === "right") {//when the rect is going right
                    transRect.x/=1.2;
                    if (transRect.x > -1) {//once it reaches the end
                        transRect.dir = "left";
                        transRect.x = -1;
                        gameState = clicked;//switch gameState to where you want to go
                    }
                }
                if (transRect.dir === "left") {//when the rect is going left
                    transRect.x*=1.2;
                    if (transRect.x < -width) {//when it reaches the end
                        transRect.x = -width; //reset it's position
                        clicked = false;//reset the clicked
                    }
                }
            };
            
            var testClick = false;//the intended "result" of the fade (who scored, who's next serve, etc.)
            var fadeStop = false;//turns the fade transition ON and OFF
            var fadeRect = {//object for fade transitions between points
                shade:0,
                dir:"in"
            };
            var fade = function(side) {//fade transition when someone scores
                fill(0, 0, 0, fadeRect.shade);
                rect(-1, -1, width+1, height+1);//creates the rect covering the screen that fades in and out
                
                if (fadeRect.shade < 255 && fadeRect.dir === "in") {//when its fading in
                    fadeRect.shade+=10;//get darker
                    
                    if (fadeRect.shade > 255) {//once it reaches the end
                        fadeRect.shade = 255;
                        fadeRect.dir = "out";//go outward
                        rightPaddle.reset();//reset the paddles
                        leftPaddle.reset();
                        if (side === "left") {//add points for scoring
                            score.left++;
                            //ball.serve = "right";
                        }
                        else if (side === "right") {//add points for scoring
                            score.right++;
                            //ball.serve = "left";
                        }
                    }
                }
                
                if (fadeRect.dir === "out") {//when its fading out
                    fadeRect.shade-=10;//get lighter
                    
                    if (fadeRect.shade < 0) {//when it reaches the end
                        //reset everything
                        fadeRect.shade = 0;
                        fadeRect.dir = "in";
                        testClick = false;
                    }
                }
            };

        //MOUSE STUFF
        mouseClicked = function() {
            if (gameState === "start") {
                //since processingJS includes body margin when calculating mouse position, we have to find it and take it out for mouse position to work
                if (mouseX - bodyMargin > 230 && mouseX - bodyMargin < 370 && mouseY - bodyMargin > 275 && mouseY - bodyMargin < 335) {
                    frames = frameCount;//set the current frame number
                    clicked = "play1"; //set the slide transition intended slide to play1
                }
                
                if (mouseX - bodyMargin > 230 && mouseX - bodyMargin < 370 && mouseY - bodyMargin > 375 && mouseY - bodyMargin < 435) {
                    frames = frameCount;//set the current frame number
                    clicked = "play2"; //set the slide transition intended slide to play2
                }
            }
        };

        //DRAWING
        draw = function() {
            drawBck();
            
            if (gameState === "start") {//home screen
                //title
                    pixelArt(110, 50, 10, title, titleRan, 20);
                    
                //buttons
                    //since processingJS includes body margin when calculating mouse position, we have to find it and take it out for mouse position to work
                    fill(255, 255, 255, 150);
                    if (mouseX - bodyMargin > 230 && mouseX - bodyMargin < 370 && mouseY - bodyMargin > 275 && mouseY - bodyMargin < 335) {
                        fill(255, 255, 255, 200);
                    }
                    rect(230, 275, 140, 60, 10);
                    textSize(27);
                    text("1 Player", 300, 305);
                    
                    fill(255, 255, 255, 150);
                    if (mouseX - bodyMargin > 230 && mouseX - bodyMargin < 370 && mouseY - bodyMargin > 375 && mouseY - bodyMargin < 435) {
                        fill(255, 255, 255, 200);
                    }
                    rect(230, 375, 140, 60, 10);
                    textSize(27);
                    text("2 Players", 300, 405);
            }
            
            //TUTORIALS
                if (frames !== 0) {//when play1 or play2 starts
                    elapsed = frameCount - frames;//how many frames have passed since play1/2 started
                    //println(elapsed);
                    if (elapsed >= 300) {//when the tutorial ends
                        frames = 0;
                        ball.serve = "right";
                    }
                    else if (elapsed > 60) {//after the transition is finished but before the tutorial is finished
                        fill(255, 255, 255, 255-elapsed);
                        textSize(35);
                        text("TUTORIAL", 300, 100);
                        if (gameState === "play1") {
                            textSize(27);
                            text("K for up\nM for down", 300, 300);
                        }
                        else if (gameState === "play2") {
                            textSize(27);
                            text("Left: Q up A down\nRight: K up M down", 300, 300);
                        }
                    }
                }
            
            if (gameState === "play1" || gameState === "play2") {//actual function of play1/2 scenes
                //players
                    rightPaddle.draw();
                    leftPaddle.draw();
                    rightPaddle.move();
                    if (gameState === "play2") {
                        leftPaddle.move();
                    }
                    else {
                        leftPaddle.ai();
                    }
                    rightPaddle.collide();
                    leftPaddle.collide();
                
                //ball
                    fill(255, 255, 255);
                    rect(ball.x, ball.y, 10, 10, 2);
                    
                    //makes the ball move
                    ball.x+=ball.xVel;
                    ball.y+=ball.yVel;
                    
                    //side bouncing - ball bounces off top and bottom
                        if (ball.y < 10) {
                            ball.yVel *= -1;
                            ball.y = 10;
                        }
                        if (ball.y + 10 > 490) {
                            ball.yVel *= -1;
                            ball.y = 480;//to offset the height of the ball
                        }
                    
                    //scoring

                    /*testClick and fadeStop are seperated for the fade transition, unlike the slide transition
                    the slide transition activates its effect inside the function after reaching a point in the transition
                    
                    The fade transition activates its effect outside the function based on an external time passage, NOT after reaching a point in the transition
                    Since testClick is turned off at a certain point in the fade function, whereas the effects of the function are based on an external timer,
                    testClick cannot be used to control the effects; therefore, the function of the ON/OFF switch is given to fadeStop
                    while testClick gets the "pointer" aspect*/

                    //right player scored in left side goal
                    if (ball.x + 10 < 0) {
                        testClick = "right";//shows the "result" - which side scored and how to react
                        fadeStop = "right";//turns the fade transition on
                        
                        delayFrames = frameCount;//the current frame count when a goal is scored
                    }
                    if (delayFrames !== 0 && fadeStop === "right") {
                        delayElapsed = frameCount - delayFrames;
                        if (delayElapsed > 60) {//the transition takes 50 frames
                            ball.serve = "left";
                            delayFrames = 0;
                            delayElapsed = 0;
                            fadeStop = false;
                        }
                    }
                    
                    //left player scored in right side goal
                    if (ball.x > width) {
                        testClick = "left";
                        fadeStop = "left";
                        
                        delayFrames = frameCount;
                    }
                    if (delayFrames !== 0 && fadeStop === "left") {
                        delayElapsed = frameCount - delayFrames;
                        if (delayElapsed > 60) {
                            ball.serve = "right";
                            delayFrames = 0;
                            delayElapsed = 0;
                            fadeStop = false;
                        }
                    }
                    
                    //serving
                        if (ball.serve === "right") {
                            ball.xVel = 2;
                            ball.yVel = random(-2, 2);
                            ball.serve = false;
                        }
                        else if (ball.serve === "left") {
                            ball.xVel = -2;
                            ball.yVel = random(-2, 2);
                            ball.serve = false;
                        }
                
                //score
                    fill(255, 255, 255);
                    textSize(20);
                    text("SCORE", 150, 50);
                    text(score.left, 150, 75);
                    text("SCORE", 450, 50);
                    text(score.right, 450, 75);

                    if (score.left >= 5) {
                        //make it so left side wins
                    }
            }//if inside game1/2

            //was working on an end screen, kinda complicated w/ Processing.js no longer being updated and messing w/ old code being difficult
            //decided against adding in favor of finishing the website; maybe learn p5.js or Processing
            
            //gameState = "end";
            if (gameState === "end") {//end screen
                textSize(55);
                fill(255, 255, 255);
                text("Player " + winner + " Won!", 300, 150);

                //restart button
                fill(255, 255, 255, 150);
                if (mouseX - bodyMargin > 190 && mouseX - bodyMargin < 410 && mouseY - bodyMargin > 320 && mouseY - bodyMargin < 470) {
                    fill(255, 255, 255, 200);
                }
                rect(190, 320, 220, 60, 10);
                textSize(27);
                text("Back to Home", 300, 350);
            }
            
            //allows for the fade transition between goals
            if (testClick === "left") {
                fade("left");
            }
            else if (testClick === "right") {
                fade("right");
            }
            
            //slide transitions
                if (clicked !== false) {
                    transition();
                }
        };
    }
}

//get the canvas element that ProcessingJS will use
var canvas = document.getElementById("pong");

//use the processingJS constructor
var processingInstance = new Processing(canvas, programCode);