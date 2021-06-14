    $(function() {
        
        var canvas = document.querySelector('canvas');
        var ctx = canvas.getContext('2d');   
        var brickColumnCount= 10;
        var brickRowCount = 5;
        
        
        
        var isStart = false;
        var w = parseInt(canvas.getAttribute('width'));
        var h = parseInt(canvas.getAttribute('height'));
        
        var tryGame = 3;
        
        var brickPadding= 5;
        var brickWidth = w/(brickColumnCount)-(brickPadding+1);       
        var brickHeight =h/brickRowCount/3;
        var brickOffsetLeft = 5;
        var brickOffsetTop = 5;
        var bricks = [];
        var leftBlocks = brickColumnCount*brickRowCount;
        var score=0;
        var localscrore=0;
        
        for(c=0; c<brickColumnCount; c++) {
            bricks[c] = [];
            for(r=0; r<brickRowCount; r++) {
                bricks[c][r] = { x: 0, y: 0, status: 1 };
            }
        }
        var x = w/2, y = h/2, dx = 0, dy = 0;
        var rad = 10;
        var wp = 80, hp = 5;
        var xm = 0;
        var spd = 3;
        
        ctx.clearRect(0, 0, w, h);
        ctx.beginPath();        
        ctx.arc(x, y, rad, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fillStyle = "#0095DD";
        ctx.fill();
        
        $(canvas).mouseenter(function(e){
            if(!isStart) {
                isStart=true;
            $("#score").text(score);
            $("#left").text(leftBlocks);
            if(Math.random() > 0.5) {
                dx = - spd; 
                    //Math.random()*10;
            } else {
                dx = spd; 
                    //Math.random()*10;
            }        
            if(Math.random() > 0.5) {
                dy = - spd; 
                    //Math.random()*10;
            } else {
                dy = spd; 
                    //Math.random()*10;
            }
                function newSpeed()
                {
                    if(dx<0)
                        dx = - spd;
                    else if(dx>0)
                        dx = spd;
                    if(dy<0)
                        dy = - spd;
                    else if(dy>0)
                        dy = spd;
                }
            $('canvas').mousemove(function(event){
                xm = event.pageX - wp/2;
            });


            function draw() {
                ctx.clearRect(0, 0, w, h);
                ctx.beginPath();        
                ctx.arc(x, y, rad, 0, Math.PI*2, true);
                ctx.closePath();
                ctx.fill();
                ctx.fillRect(xm, h-hp-5, wp, hp);

                x += dx;
                y += dy;
                if(x < r || x > (w - r)) {
                    dx = - dx;               
                }
                if(y < r) {
                    dy = - dy;                
                }
                if((y+r>h-hp-5&&y+r<(h-hp-5)+hp)&&(x>xm&&x<xm+wp)) {
                    dy = - dy;
                    if(x<xm+wp/3||x>xm+wp/3*2)
                        dx = - dx;
                }
                
                
                for(c=0; c<brickColumnCount; c++) {
                    for(r=0; r<brickRowCount; r++) {
                        if(bricks[c][r].status == 1) {
                            var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                            var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                            bricks[c][r].x = brickX;
                            bricks[c][r].y = brickY;
                            ctx.beginPath();
                            ctx.rect(brickX, brickY, brickWidth, brickHeight);
                            ctx.fillStyle = "#0095DD";
                            ctx.fill();
                            ctx.closePath();
                        }
                    }
                }
                
                for(c=0; c<brickColumnCount; c++) {
                    for(r=0; r<brickRowCount; r++) {
                        var b = bricks[c][r];
                        if(b.status == 1) {
                            if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y+brickHeight) {
                                dy = -dy;
                                b.status = 0;
                                score++;
                                localscrore++;
                                leftBlocks--;
                                
                                $("#score").text(score);
                                $("#left").text(leftBlocks);
                                
                            }
                        }
                    }
                }
                
                if(localscrore>5&&spd==3)
                    {
                        spd++;
                        newSpeed();
                    }
                else if (localscrore>15&&spd==4){
                        spd++;
                        newSpeed();
                    }
                else if (localscrore>25&&spd==5){
                        spd++;
                        newSpeed();
                    }
                if(y>h+rad)
                    {
                        if(tryGame==0) {
                            alert("You lose");
                            location.reload();
                        }
                        else {
                            x=w/2;
                            y=h/2;
                            spd=3;
                            localscrore=0;
                            newSpeed();
                            tryGame--;
                            requestAnimationFrame(draw);
                        }
                    }
                else if(leftBlocks==0)
                    {
                        alert("You won");
                        location.reload();
                    }
                else
                    requestAnimationFrame(draw);
            }
            requestAnimationFrame(draw);
            }
        });
        

    });