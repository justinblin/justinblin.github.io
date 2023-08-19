//since processingJS includes body margin when calculating mouse position, we have to find it and take it out for mouse position to work
    var bodyElement = document.getElementsByTagName("body")[0];
    var bodyWidth = bodyElement.clientWidth;
    //finding the difference between the full document + the inside of the body (only element + padding)
    var bodyMargin = (document.documentElement.clientWidth - bodyWidth)/2;

//the code that ProcessingJS will use
var programCode = function(processingInstance) {
    with (processingInstance) {
        size(500,600);

        //ENVIRONMENT
            var frames = 15; //set to 15 frames, can do lower if laggy
            frameRate(frames);
            textAlign(CENTER, CENTER);
            var scene = "home";

            var roundNum = function(number, roundTo) {
            var rounded = (round(number/roundTo))*roundTo;
                return rounded;
            };

            var buttonY = 350;

        //BACKGROUND
            var bckPixelArt = function(x, y, size) {
                noStroke();
                var pixels = [
                    "--------------------------aaaaaaaaa-------------------",//long 54
                    "------------------------aaaaaaaaaaaaa-----------------",
                    "---------aaaaaaa-------aaaaaaaaaaaaaaa----------------",
                    "-------aaaaaaaaaaa----aaaaaaaaaaaaaaaaa---------------",
                    "------aaaaaaaaaaaaaa--aaaaaaaaaaaaaaaaaa--------------",
                    "-----aaaaaaaaaaaaaaa-aaaaaaaaaaaaaaaaaaaa-------------",
                    "-----aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa-aaaaa------",
                    "----aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa----",
                    "---aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa--",
                    "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", //line 10
                    "aaaaaaaaaaaaaaaaaaaaaaiii-----aaaaaaaaaaaaaaaaaaaaaaaa",
                    "aaaaaaaaaajjjjjjaaaaaaijj-jjj-aaaaaaaaaaaaaaaaaaaaaaaa",
                    "aaaaaaaaajjjjjjjaaaaa-----jij-aaaaaaaaaaaaaaaaaaaaaaaa",
                    "aaaaaaaajjjjjjjjaaaaa-jjjjjjj-aaaaaaaaaaaaaaaaaaaaaaaa",
                    "aaaaaaaajjjjjj------a-jijijij----aaaaaaaaaaaaaaaaaaaaa",
                    "aaaaaaajjjjjjj-jjji-a-jijijij-ij-aaaaaaaaaaaaaaaaaaaaa",
                    "aaaaaaajjjjjjj-jiji-a-jjjjjjj--------aaaaaaaaaaaaaaaaa",
                    "aaaaaaajjj----------a-jijijij-ijjjjj-jjjaaaaaaaaaaaaaa",
                    "aaaaaaajjj-ijijijii-a-jijijij-ijjjjj-jjjaaaaaaaaaaaaaa",
                    "aaaaaaajjj-ijijijii-a-jjjjjjj-ijijij-jjjaaaaaaaaaaaaaa", //line 20
                    "aaaaaaajjj-jjjjj------jijijij-ijijij-jjjaaaaaaaaaaaaaa",
                    "aaaaaaajjj-ijiji-jjji-jijijij-ijjjjj-jjjaaaaaaaaaaaaaa",
                    "aaafffffjj-ijiji-jiji-jjjjjjj-ijijij-jjffffaaaaaaaaaaa",
                    "aaffhhhfff-jjjjj-jiji-jijijij-ijijijffffhhffaaaaaaaaaa",
                    "affhhhhhhhfijijifffff-jfffffj-ijjjjffhhhhhhfffaaafffaa",
                    "ffhhhhhfffffjijffhhhffffhhhfffffffffhhhhhhhhhffaffhffa",
                    "fhhhhhffhhhffjffhhhhhffhhhhhfhhhhhhffhhhhhhhhhfffhhhff",
                    "hhhhfffhhhhhfffhhhhhhhffhhhffhhhhhhhffhhhhhhhhhhffhhhh",
                    "hhhffhhhhhhhhffhhhhhhhhfhhffhhhhhhhhhffhhhhhhhhhhffhhh",
                    "hhhfhhhhhhhhhhffhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh", //line 30
                    "hhffhhhhhhhhhhhffhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
                    "hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh",
                    "gggggggggggggggggggggggggggggggggggggggggggggggggggggg",
                    "dddddddddddddddddddddddddddddddddddddddddddddddddddddd",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb",
                    "cccccccccccccccccccccccccccccccccccccccccccccccccccccc",
                    "dddddddddddddddddddddddddddddddddddddddddddddddddddddd", //line 40
                    "dddddddddddddddddddddddddddddddddddddddddddddddddddddd",
                    "dddddddddddddddddddddddddddddddddddddddddddddddddddddd",
                    "dddddddddddddddddddddddddddddddddddddddddddddddddddddd",
                    "dddddddddddddddddddddddddddddddddddddddddddddddddddddd",
                    "dddddddddddddddddddddddddddddddddddddddddddddddddddddd",
                    "dddddddddddddddddddddddddddddddddddddddddddddddddddddd",
                    "dddddddddddddddddddddddddddddddddddddddddddddddddddddd",
                    "dddddddddddddddddddddddddddddddddddddddddddddddddddddd",
                    "dddddddddddddddddddddddddddddddddddddddddddddddddddddd",
                    "dddddddddddddddddddddddddddddddddddddddddddddddddddddd"
                ];

                for (var rowNum = 0; rowNum < pixels.length; rowNum++) {
                    for (var rowPos = 0; rowPos < pixels[rowNum].length; rowPos++) {
                        var indPixel = pixels[rowNum][rowPos];

                        switch(indPixel) {
                            case "a":
                                //white
                                fill(255, 255, 255);
                                rect(x + rowPos * size, y + rowNum * size, size, size);
                                break;

                            case "b":
                                //dark green
                                fill(76, 158, 44);
                                rect(x + rowPos * size, y + rowNum * size, size, size);
                                break;

                            case "e":
                                //light green
                                fill(142, 230, 135);
                                rect(x + rowPos * size, y + rowNum * size, size, size);
                                break;
                                
                            case "f":
                                //green
                                fill(57, 181, 0);
                                rect(x + rowPos * size, y + rowNum * size, size, size);
                                break;
                                
                            case "h":
                                //tree green
                                fill(119, 212, 111);
                                rect(x + rowPos * size, y + rowNum * size, size, size);
                                break;
                                
                            case "c":
                                //dark tan
                                fill(190, 160, 120);
                                rect(x + rowPos * size, y + rowNum * size, size, size);
                                break;
                                
                            case "d":
                                //tan
                                fill(240, 220, 160);
                                rect(x + rowPos * size, y + rowNum * size, size, size);
                                break;
                                
                            case "g":
                                //gray
                                fill(90, 90, 90);
                                rect(x + rowPos * size, y + rowNum * size, size, size);
                                break;
                                
                            case "i":
                                //window blue
                                fill(180, 221, 237);
                                rect(x + rowPos * size, y + rowNum * size, size, size);
                                break;
                                
                            case "j":
                                //light gray
                                fill(235, 235, 235);
                                rect(x + rowPos * size, y + rowNum * size, size, size);
                                break;
                        }
                    }
                }
            };

        //BACK FRONT
            var bckFront = [0, 275, 520];

            var bckFrontPixelArt = function(x, y, size) {
                noStroke();
                var pixels = [
                    "------------------------------------------------------",//long 54
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",//line 10
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------", //line 20
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------", //line 30
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "---fff---fff---fff---fff---fff---fff---fff---fff---fff",
                    "--fff---fff---fff---fff---fff---fff---fff---fff---fff-",
                    "-fff---fff---fff---fff---fff---fff---fff---fff---fff--",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",//line 40
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------",
                    "------------------------------------------------------"
                ];

                for (var rowNum = 0; rowNum < pixels.length; rowNum++) {
                    for (var rowPos = 0; rowPos < pixels[rowNum].length; rowPos++) {
                        var indPixel = pixels[rowNum][rowPos];

                        switch(indPixel) {
                            case "f":
                                //green
                                fill(57, 181, 0);
                                rect(x + rowPos * size, y + rowNum * size, size, size);
                                break;
                        }
                    }
                }
            };

        //PIPES
            var pipes = [
                {x:800, y:roundNum(random(100, 310), 5), scored:false},
                {x:1100, y:roundNum(random(100, 310), 5), scored:false},
                {x:1400, y:roundNum(random(100, 310), 5), scored:false}
            ];

            var pipeMove = 9;

            var uppipePixelArt = function(x, y, size, length) {
                noStroke();
                var pixels = [
                    "gggggggggggggggggggg", //long 20
                    "gfeddddddddedeeeeeeg",
                    "gedeefeffffffffbfbbg",
                    "gedeefeffffffffbfbbg",
                    "gedeefeffffffffbfbbg",
                    "gedeefeffffffffbfbbg",
                    "gedeefeffffffffbfbbg",
                    "gedeefeffffffffbfbbg",
                    "gedeefeffffffffbfbbg",
                    "gggggggggggggggggggg", //line 10
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",//line 20
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-", //line 30
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-", //line 40
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-", //line 50
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-", //line 60
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-", //line 70
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-" //line 80
                ];

                for (var rowNum = 0; rowNum < length; rowNum++) {
                    for (var rowPos = 0; rowPos < pixels[rowNum].length; rowPos++) {
                        var indPixel = pixels[rowNum][rowPos];

                        switch(indPixel) {
                            case "b":
                                //dark green
                                fill(76, 158, 44);
                                rect(x + rowPos * size, y + rowNum * size, size, size);
                                break;
                                
                            case "e":
                                //light green
                                fill(142, 230, 135);
                                rect(x + rowPos * size, y + rowNum * size, size, size);
                                break;
                                
                            case "f":
                                //green
                                fill(57, 181, 0);
                                rect(x + rowPos * size, y + rowNum * size, size, size);
                                break;
                                
                            case "d":
                                //tan
                                fill(240, 220, 160);
                                rect(x + rowPos * size, y + rowNum * size, size, size);
                                break;
                                
                            case "g":
                                //grey
                                fill(90, 90, 90);
                                rect(x + rowPos * size, y + rowNum * size, size, size);
                                break;
                        }
                    }
                }
            };

            var downpipePixelArt = function(x, y, size, start) {
                noStroke();
                var pixels = [
                    "-gedeeefefffffbfbbg-", //long 20
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",//line 10
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-", //line 20
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-", //line 30
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-", //line 40
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-", //line 50
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-", //line 60
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-",
                    "-gedeeefefffffbfbbg-", //line 70
                    "gggggggggggggggggggg",
                    "gedeefeffffffffbfbbg",
                    "gedeefeffffffffbfbbg",
                    "gedeefeffffffffbfbbg",
                    "gedeefeffffffffbfbbg",
                    "gedeefeffffffffbfbbg",
                    "gedeefeffffffffbfbbg",
                    "gedeefeffffffffbfbbg",
                    "gfeddddddddedeeeeeeg",
                    "gggggggggggggggggggg" //line 80
                ];

                for (var rowNum = start; rowNum < 80; rowNum++) {
                    for (var rowPos = 0; rowPos < pixels[rowNum].length; rowPos++) {
                        var indPixel = pixels[rowNum][rowPos];

                        switch(indPixel) {
                            case "b":
                            //dark green
                            fill(76, 158, 44);
                            rect(x + rowPos * size, y + rowNum * size, size, size);
                            break;

                            case "e":
                            //light green
                            fill(142, 230, 135);
                            rect(x + rowPos * size, y + rowNum * size, size, size);
                            break;

                            case "f":
                            //green
                            fill(57, 181, 0);
                            rect(x + rowPos * size, y + rowNum * size, size, size);
                            break;

                            case "d":
                            //tan
                            fill(240, 220, 160);
                            rect(x + rowPos * size, y + rowNum * size, size, size);
                            break;

                            case "g":
                            //grey
                            fill(90, 90, 90);
                            rect(x + rowPos * size, y + rowNum * size, size, size);
                            break;
                        }
                    }
                }
            };

        //SCORE
            var score = 0;
            var hiscore = 0;

        //PLAYER
            var player = {
                x:140.5,
                y:300,
                fallSpeed:-25,
                fallAccel:5
            };

            var birdPixelArt = function(x, y, size) {
                noStroke();
                var pixels = [
                    "------bbbbbb-----", //long 17 blocks 59.5 pixels
                    "----bbllllbwb----",
                    "---blllllbwwwb---",
                    "-bbbbllllbwwbwb--",
                    "bwwwwblllbwwbwb--",
                    "bwwwwwblllbwwwb--",
                    "blwwwlbllllbbbbb-",
                    "-blllbllllbooooob",
                    "--bbbyyyybobbbbb-",
                    "----byyyyyboooob-", //line 10
                    "-----bbyyyybbbbb-",
                    "-------bbbb------" //tall 42
                ];

                for (var rowNum = 0; rowNum < pixels.length; rowNum++) {
                    for (var rowPos = 0; rowPos < pixels[rowNum].length; rowPos++) {
                        var indPixel = pixels[rowNum][rowPos];

                        switch(indPixel) {
                            case "w":
                                fill(255, 255, 255);
                                rect(x + rowPos * size, y + rowNum * size, size, size);
                                break;

                            case "y":
                                fill(255, 183, 0);
                                rect(x + rowPos * size, y + rowNum * size, size, size);
                                break;
                                
                            case "l":
                                fill(226, 245, 52);
                                rect(x + rowPos * size, y + rowNum * size, size, size);
                                break;
                                
                            case "b":
                                fill(0, 0, 0);
                                rect(x + rowPos * size, y + rowNum * size, size, size);
                                break;
                                
                            case "o":
                                fill(255, 81, 0);
                                rect(x + rowPos * size, y + rowNum * size, size, size);
                                break;
                        }
                    }
                }
            };

        //UP DOWN MOTION
            var updown = {
                y:0,
                inc:1,
                out:false,
                active:true,
                yMax:20
            };

            var move = function() {
                if (updown.y < updown.yMax && updown.out === false) {
                    updown.y+=updown.inc;
                    if (updown.y >= updown.yMax) {
                        updown.out = true;
                    }
                }

                if (updown.y > 0 && updown.out === true) {
                    updown.y-=updown.inc;
                    if (updown.y <= 0) {
                        updown.out = false;
                        updown.active = true;
                    }
                }
            };

        //RESET
            var reset = function() {
                pipes = [
                    {x:800, y:roundNum(random(100, 310), 5), scored:false},
                    {x:1100, y:roundNum(random(100, 310), 5), scored:false},
                    {x:1400, y:roundNum(random(100, 310), 5), scored:false}
                ];

                score = 0;

                player = {
                    x:140.5,
                    y:300,
                    fallSpeed:-25,
                    fallAccel:5,
                    angle:0
                };
            };

        //TRANSITION
            var transrect = {
                out:false,
                color:0,
                active:false
            };

            var transition = function(nextScene) {
                fill(255, 255, 255, transrect.color);
                rect(0, 0, 501, 601);
                if (transrect.color < 255 && transrect.out === false) {
                    transrect.color+=75;
                    if (transrect.color >= 255) {
                        transrect.out = true;
                        scene = nextScene;
                    }
                }

                if (transrect.color > 0 && transrect.out === true) {
                    transrect.color-=75;
                    if (transrect.color <= 0) {
                        transrect.out = false;
                        transrect.active = false;
                    }
                }
            };

        mouseClicked = function() {
            if (scene === "home") {//click to go from start screen into the game
                scene = "game";

                if (frames === 1) {//since frames are kept low for less lag when not active, set higher when playing
                    frames = 15;
                    frameRate(frames);
                }
            }

            if (scene === "game") {//makes the bird flap during the game
                player.fallSpeed = -25;
            }
            //the restart button
            //since processingjs includes body margin when calculating mouse position, we have to take out body margin for it to work
            if (mouseX - bodyMargin > 175 && mouseX - bodyMargin < 325 && mouseY - bodyMargin > 350 && mouseY - bodyMargin < 405 && scene === "end") {
                scene = "home";
                reset();
            }

            //console.log((mouseX-bodyMargin) + " " + (mouseY-bodyMargin));//outputs what should be accurate coordinates
        };

        draw = function() {
            //DRAWING BACKGROUND
                background(136, 206, 235);
                bckPixelArt(0, 350, 5);
                bckPixelArt(270, 350, 5);

                fill(140, 230, 135);
                rect(0, 520, 500, 15);

            //DRAWING BCKFRONT
                for (var a = 0; a < bckFront.length; a++) {
                    bckFrontPixelArt(bckFront[a], 350, 5);

                    if (bckFront[a] + 270 < 0) {
                        bckFront[a]+=790;
                    }

                    if (scene === "game"|scene === "home") {
                        bckFront[a] -= pipeMove;
                    }
                }

            //PIPES
                for(var a = 0; a < pipes.length; a++) {
                    downpipePixelArt(pipes[a].x, pipes[a].y - 400, 5, abs((pipes[a].y-400)/5));
                    uppipePixelArt(pipes[a].x, pipes[a].y + 150, 5, (510-(pipes[a].y+150))/5);

                    if (pipes[a].x + 20*5 < 0) {
                        pipes[a].x += 900;
                        pipes[a].scored = false;
                    }

                    if (scene === "game") {
                        pipes[a].x -= pipeMove;
                    }

                    if (player.x + 59.5 > pipes[a].x && player.x < pipes[a].x + 100) {
                        if (player.y < pipes[a].y|player.y > pipes[a].y + 150) {
                            if (scene === "game") {
                                transrect.active = true;
                            }
                        }

                        if (scene === "game" && pipes[a].scored === false) {
                            pipes[a].scored = true;
                            score++;
                        }
                    }
                }

            //SCREENS
                if (scene === "home") {
                    textFont(createFont("Trebuchet MS"));
                    textSize(20);
                    fill(255, 255, 255);
                    text("click to start", 170.25, 275);
                }

                if (scene === "game") {
                    textFont(createFont("Trebuchet MS Bold"));
                    textSize(50);
                    fill(255, 255, 255);
                    text(score, 250, 150);

                    if (score > hiscore) {
                        hiscore = score;
                    }
                }

                if (scene === "end") {
                    fill(240, 220, 160);
                    strokeWeight(3);
                    stroke(90, 90, 90);
                    rect(200, 175, 100, 150, 10);
                    textFont(createFont("Trebuchet MS Bold"));
                    textSize(20);
                    fill(255, 81, 0);
                    text("SCORE", 250, 200);
                    text("BEST", 250, 265);
                    textSize(25);
                    fill(90, 90, 90);
                    text(score, 250, 235);
                    text(hiscore, 250, 300);

                    buttonY = 350;
                    //since processingjs includes body margin when calculating mouse position, we have to take out body margin for it to work
                    if (mouseX - bodyMargin > 175 && mouseX - bodyMargin < 325 && mouseY - bodyMargin > 350 && mouseY - bodyMargin < 405 && scene === "end") {
                        buttonY = 355;
                    }
                    noStroke();
                    fill(92, 21, 3);
                    rect(175, buttonY, 150, 55);
                    fill(255, 255, 255);
                    rect(177.5, buttonY+2.5, 145, 45);
                    fill(255, 81, 0);
                    rect(180, buttonY+5, 140, 40);
                    fill(255, 255, 255);
                    textSize(25);
                    text("RESTART", 250, buttonY+25);
                }

            //PLAYER
                if (scene === "game"|scene === "end") {
                    if (player.angle < radians(70)) {
                        player.angle += radians(5);

                        if (player.fallSpeed >= 30) {
                            player.angle += radians(15);
                        }
                    }

                    if (player.fallSpeed < 0) {
                        player.angle = radians(-45);
                    }
                }
                pushMatrix();
                translate(player.x + 29.75, player.y + 21);
                rotate(player.angle);
                birdPixelArt(-29.75, -21 + updown.y, 3.5);
                popMatrix();

                if (scene === "game"|scene === "end") {
                    player.y += player.fallSpeed;
                    player.fallSpeed += player.fallAccel;
                }

                if (player.y > 468) {
                    player.y = 468;
                    if (scene === "game") {
                        transrect.active = true;
                    }
                }

            //UPDOWN MOVEMENT
                updown.active = false;
                if (scene === "home") {
                    updown.active = true;
                }

                if (updown.active === true) {
                    move();
                }

            //TRANSITIONS
                if (transrect.active === true) {
                    if (scene === "game") {
                        transition("end");
                    }

                    if (scene === "end") {
                        transition("end");
                    }
                }
        };

        //done
    }
}

//get the canvas element that ProcessingJS will use
var canvas = document.getElementById("flappy-bird");

//use the processingJS constructor
var processingInstance = new Processing(canvas, programCode);