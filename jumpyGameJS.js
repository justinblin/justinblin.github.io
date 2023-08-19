//since processingJS includes body margin when calculating mouse mouse position, we have to find it and take it out for mouse position to work
var bodyElement = document.getElementsByTagName("body")[0];
var bodyWidth = bodyElement.clientWidth;
//finding the difference between the full document + the inside of the body (only element + padding)
var bodyMargin = (document.documentElement.clientWidth - bodyWidth)/2;

//the code that ProcessingJS will use
var programCode = function(processingInstance) {
    with (processingInstance) {
        size(400, 400); 
        frameRate(60);
            
        //VARIABLES
            //gravity
            var fallSpeed = 0;
            var fallAccel = 0.5;
            var fallMax = 12;
            
        //ground
            var groundHeight = 300;
            var objectMove = 0;
            
        //player
            var playerYPos = 150;
            var playerXPos = 200;
            var playerChoice = round(random(0, 3));
            
            //particle array
                var particles = [];
            
        //screen
            var screen = 0;

        //platforms
            var platforms = [
                {x:random(0, 300), y:groundHeight - 150, pointChance: 0, platSideMove:1},
                {x:random(0, 300), y:groundHeight - 300, pointChance: 0, platSideMove:1},
                {x:random(0, 300), y:groundHeight - 450, pointChance: 0, platSideMove:1}
            ];

        //scores
            var score = 0;
            var hiscore = 0;
            var scoreTimer = 0;

        //stars
            var starHeight = 1200;
            //star function
                var drawStar = function(x, y, starSize) {
                    noStroke();
                    fill(232, 255, 102);
                    
                    //top
                        triangle(x - starSize/2, y, x + starSize/2, y, x, y - starSize*3/2);
                        triangle(x - starSize/2, y, x + starSize/2, y, x, y + starSize*3/2);
                    
                    //side
                        triangle(x, y - starSize/2, x, y + starSize/2, x - starSize*3/2, y);
                        triangle(x, y - starSize/2, x, y + starSize/2, x + starSize*3/2, y);
                };
            
            //star storage
                var stars = [];
            
            //star generation
                for (var i = 0; i < 5; i++) {
                    stars.push({
                        x:random(20, 380),
                        y:random(20, 380) - starHeight,
                        starSize:random(5, 10)
                    });
                }
                
        //moon
            var drawMoon = function(x, y, moonSize) {
                noStroke();
                fill(232, 255, 102);
                ellipse(x, y, moonSize, moonSize);
                fill(103 - score, 240 - score * 2, 245 - score * 2);
                ellipse(x-moonSize/5, y-moonSize/10, moonSize, moonSize);
            };
            
            var moon = {
                x:random(280, 380),
                y:random(30, 50)
            };
            
            var moonHeight = 450;

        draw = function() {
        //PHYSICS/RULES
            //gravity
                playerYPos = playerYPos + fallSpeed;
                //acceleration/terminal velocity
                    if (fallSpeed <= fallMax) {
                        fallSpeed = fallSpeed + fallAccel;
                    }
                
                //bouncing
                    //ground
                        if (playerYPos + 15 >= groundHeight && screen === 0|screen === 1) {
                            playerYPos = groundHeight - 15;
                            fallSpeed = fallSpeed * -1;
                        }
                    
            //downward movement of things
                if (screen === 1) {
                    groundHeight = groundHeight + objectMove;
                }
                
            //death
                if (playerYPos + 15 > 400) {
                    screen = 2;
                }
                
            //ceiling
                if (playerYPos - 15 < 0) {
                    playerYPos = 15;
                    fallSpeed = 3;
                }
                    
        //PLAYER CONTROLS
            //click to start/restart
                mouseClicked = function() {
                    //start
                        if (screen === 0) {
                            screen = 1;
                        }
                    
                    //restart
                        if (screen === 2) {
                            //reset variables
                                screen = 0;
                                groundHeight = 300;
                                playerYPos = 150;
                                playerXPos = 200;
                                platforms = [
                                    {x:random(0, 300), y:groundHeight - 150, pointChance:0, platSideMove:1},
                                    {x:random(0, 300), y:groundHeight - 300, pointChance:0, platSideMove:1},
                                    {x:random(0, 300), y:groundHeight - 450, pointChance:0, platSideMove:1}
                                ];
                                score = 0;
                                playerChoice = round(random(0, 3));
                                
                                for (var i = 0; i < 5; i++) {
                                    stars.shift();
                                    stars.push({
                                        x:random(20, 380),
                                        y:random(20, 380) - starHeight,
                                        starSize:random(5, 10)
                                    });
                                }
                                
                                moon = {
                                    x:random(30, 370),
                                    y:random(30, 50)
                                };
                        }
                };
            
            if (screen === 1) {
                //left
                    if (mouseX - bodyMargin < playerXPos) {
                        playerXPos -= 7.5;
                    }
                
                //right
                    if (mouseX - bodyMargin >= playerXPos) {
                        playerXPos += 7.5;
                    }
            
            }
        //DRAWING THINGS
            //main screen
                //background
                    background(103 - score, 240 - score * 2, 245 - score * 2);
                    
                //ground
                    noStroke();
                    fill(122, 95, 42);
                    rect(-1, groundHeight, 401, 100);
                    
                    for(var i = 0; i < 10; i++) {
                        fill(74, 250, 58);
                        ellipse(50 * i + 20, groundHeight + 10, 60,60);
                    }
                    
                    //sky to block xtra grass
                        fill(103, 240, 245);
                        rect(-1, groundHeight - 20, 401, 20);
                        
                //moon
                    //drawing
                        drawMoon(moon.x, moon.y - moonHeight, 50);
                    
                    //movement
                        moon.y = moon.y + objectMove/50;
                        
                //stars
                    for (var i = 0; i < stars.length; i++) {
                        //drawing
                            drawStar(stars[i].x, stars[i].y, stars[i].starSize);
                        //movement
                            stars[i].y = stars[i].y + objectMove/10;
                            
                        //renew
                            if (stars[i].y - stars[i].starSize*3/2 > 400) {
                                stars[i].x = random(20, 380);
                                stars[i].y = stars[i].y - (400 + 3*stars[i].starSize + random(0, 20));
                                stars[i].starSize = random(5, 10);
                            }
                    }
                    
                //platforms
                        for (var i = 0; i < platforms.length; i++) {
                            //downward movement
                            if (screen === 0|screen === 1|screen === 2) {
                                fill(153 + score * 2, 153 + score * 2, 153 + score * 2);
                                rect(platforms[i].x, platforms[i].y, 100, 15);
                                platforms[i].y = platforms[i].y + objectMove;
                                
                                //sideways movement
                                    if (score >= 50 && platforms[i].pointChance > 20) {
                                        platforms[i].x = platforms[i].x + platforms[i].platSideMove;
                                    }
                                    
                                    if (score >= 30 && platforms[i].pointChance > 33) {
                                        platforms[i].x = platforms[i].x + platforms[i].platSideMove;
                                    }
                                    
                                    if (score >= 10 && platforms[i].pointChance > 66) {
                                        platforms[i].x = platforms[i].x + platforms[i].platSideMove;
                                    }
                                    
                                    //sidewall bounce
                                    if (platforms[i].x + 100 >= 400|platforms[i].x < 0) {
                                        platforms[i].platSideMove = platforms[i].platSideMove * -1;
                                    }
                                
                                //xtra points generation
                                    if (platforms[i].pointChance > 95) {
                                        fill(score * 5, score * 5, score * 5);
                                        textSize(25);
                                        text("+3", platforms[i].x + 50, platforms[i].y - 20);
                                    }
                                
                                //renewal
                                    if (platforms[i].y > 400) {
                                        platforms[i].y -= 415;
                                        platforms[i].x = random(0, 300);
                                        score++;
                                        platforms[i].pointChance = round(random(0, 100));
                                        
                                        if (platforms[i].pointChance % 2 === 0) {
                                            platforms[i].platSideMove = 1;
                                        }
                                        
                                        if (platforms[i].pointChance % 2 !== 0) {
                                            platforms[i].platSideMove = -1;
                                        }
                                    }
                                
                                //bouncing
                                    if (playerYPos + 15 > platforms[i].y && playerYPos < platforms[i].y && playerXPos > platforms[i].x && playerXPos < platforms[i].x + 100 && screen === 0|screen === 1) {
                                        if (platforms[i].pointChance > 95) {
                                            score += 3;
                                            platforms[i].pointChance = 95;
                                            starHeight -= 45;
                                            moonHeight -= 9;
                                        }
                                        
                                        if (fallSpeed > 0 && screen === 1) {
                                            playerYPos = platforms[i].y - 15;
                                            fallSpeed = -12;
                                        }
                                    }
                            }
                        }
                
                //player
                    noStroke();
                    //particles
                    particles.unshift({
                        x:playerXPos,
                        y:playerYPos
                    });
                    
                    if (particles.length > 10) {
                        particles.pop();
                    }
                    
                    for (var i = 0; i < particles.length - 1; i++) {
                        if (playerChoice !== 1) {
                            fill(255, i*-15 + 255, i*15);
                            ellipse(particles[i].x, particles[i].y, i * -3 + 30, i * -3 + 30);
                        }
                        
                        if (playerChoice === 1) {
                            fill(0, 225, 255);
                            fill(0, 153, 255);
                            fill(i*20, 200 - i*15, 255);
                            rect(particles[i].x - 15 + i * 1.5, particles[i].y - 15, i * -3 + 30, i * -3 + 30);
                        }
                    }
                    
            //intro screen
                if (screen === 0) {
                    //title
                        fill(153, 153, 153);
                        textSize(50);
                        textAlign(CENTER, CENTER);
                        text("JUMPY GAME", 200, 55);
                        
                    //instructions
                        textSize(15);
                        text("Click to Start", 200, 275);
                        
                    //hiscore
                        text("HISCORE", 200, 100);
                        text(hiscore, 200, 125);
                }
                
            //game screen highscore counter and scores
                    if (screen === 1) {
                        //display
                        //instead of changing color of the text, we just put a translucent background behind white text
                        //actually nvm just white text might be better
                            textSize(15);

                            /*fill(200, 200, 200, 150);
                            rect(80, 30, 90, 70, 10);*/
                            //fill(153 + score * 2, 153 + score * 2, 153 + score * 2);
                            fill(255, 255, 255)
                            text("SCORE", 125, 50);
                            text(score, 125, 75);

                            /*fill(200, 200, 200, 150);
                            rect(230, 30, 90, 70, 10);*/
                            //fill(153 + score * 2, 153 + score * 2, 153 + score * 2);
                            fill(255, 255, 255)
                            text("HISCORE", 275, 50);
                            text(hiscore, 275, 75);
                            
                        //movement of objects
                            if (playerYPos < 100) {
                                objectMove = 3.2;
                            }
                            
                            if (playerYPos >= 100 && playerYPos <= 300) {
                                objectMove = 2.8;
                            }
                            
                            if (playerYPos > 300) {
                                objectMove = 2.4;
                            }
                    }
                
                //updates to hiscore
                    if (score > hiscore) {
                        hiscore = score;
                    }
                
            //end screen
                if (screen === 2) {
                    //game over
                        noStroke();
                        fill(255, 255, 255);
                        rect(150, 85, 100, 30);
                        fill(0, 0, 0);
                        textSize(15);
                        text("GAME OVER", 200, 100);
                        objectMove = 0;
                    
                    //score
                        //fill(153 + score * 2, 153 + score * 2, 153 + score * 2);
                        fill(255, 255, 255);
                        textSize(15);
                        text("SCORE", 125, 40);
                        text(score, 125, 65);
                        text("HISCORE", 275, 40);
                        text(hiscore, 275, 65);
                        
                    //restart
                        text("Click to Restart", 200, 300);
                }
                //println(playerChoice);
                //println(moon.y);
        };
    }
};

// Get the canvas that ProcessingJS will use
var canvas = document.getElementById("jumpy-game"); 
// Pass the function to ProcessingJS constructor
var processingInstance = new Processing(canvas, programCode); 

