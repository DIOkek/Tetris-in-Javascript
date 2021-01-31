const cvs = document.getElementById("tetris");
const ctx=cvs.getContext("2d");
const scoreElement = document.getElementById("score"); 

const cvs_2 = document.getElementById("next");
const ctx_2=cvs_2.getContext("2d"); 

const cvs_3 = document.getElementById("hold");
const ctx_3=cvs_3.getContext("2d"); 


let vacant=0;
const SQ=SQUARESIZE=20;
const ROW=20;
const COLUMN=10;
const VACANT="BLACK";
let nextRandom = Math.floor(Math.random()*(6-0));

function drawSquare(x,y,color){
    
    ctx.fillStyle=color;
    ctx.fillRect(x*SQ,y*SQ,SQ,SQ);

    ctx.strokeStyle="WHITE";
    ctx.strokeRect(x*SQ,y*SQ,SQ,SQ);

}

function drawSquare_2(x,y,color){
    
    ctx_2.fillStyle=VACANT;
    ctx_2.fillRect(x*SQ,y*SQ,SQ,SQ);

    ctx_2.strokeStyle="WHITE";
    ctx_2.strokeRect(x*SQ,y*SQ,SQ,SQ);

}

function drawSquare_4(x,y,color){
    
    ctx_3.fillStyle=VACANT;
    ctx_3.fillRect(x*SQ,y*SQ,SQ,SQ);

    ctx_3.strokeStyle="WHITE";
    ctx_3.strokeRect(x*SQ,y*SQ,SQ,SQ);

}



function drawSquare_3(x,y,color){
     
        x=x-1;
        y=y*-1+2;
    
    
    ctx_2.fillStyle=color;
    ctx_2.fillRect(x*SQ,y*SQ,SQ,SQ);

    ctx_2.strokeStyle="WHITE";
    ctx_2.strokeRect(x*SQ,y*SQ,SQ,SQ);

}

function drawSquare_HOLD(x,y,color){
    x=x+3;
    y=y+2;
    
    
    ctx_3.fillStyle=color;
    ctx_3.fillRect(y*SQ,x*SQ,SQ,SQ);

    ctx_3.strokeStyle="White";
    ctx_3.strokeRect(y*SQ,x*SQ,SQ,SQ);

    

}

let board=[];
for(r=0; r<ROW; r++){
    board[r] = [];
    for(c=0; c < COLUMN; c++){
        board[r][c]= VACANT;
    }
}

function draw_board(){
    for(r=0; r <ROW; r++){
        for(c=0; c < COLUMN; c++){
            drawSquare(c,r,board[r][c]);
        }
    }
}

function draw_secondboard(){
    for(r=0; r <ROW; r++){
        for(c=0; c < COLUMN; c++){
            drawSquare_2(c,r,board[r][c]);
            
        }
    }
}

function draw_thirdboard(){
    for(r=0; r <ROW; r++){
        for(c=0; c < COLUMN; c++){
            drawSquare_4(c,r,board[r][c]);
            
        }
    }
}


///////////////////////////////////////////////////////////////////////////////

draw_board();
draw_secondboard();
draw_thirdboard();

const PIECES = [
    [Z,"red"],
    [S,"green"],
    [T,"purple"],
    [O,"yellow"],
    [L,"orange"],
    [I,"cyan"],
    [J,"blue"]
];




Piece.prototype.draw_2 = function(){
    this.next_fill(this.color);
}
Piece.prototype.undraw_2 = function(){
    this.next_fill(VACANT);
}

Piece.prototype.next_fill = function(color){
  
    for( r = 0; r < this.activeTetromino.length; r++){
        for(c = 0; c < this.activeTetromino.length; c++){
            // we draw only occupied squares
            if( this.activeTetromino[r][c]){
                
                drawSquare_3(this.x + c,this.y + r, color);
                
            }
        }
    }
}





Piece.prototype.HOLD_fill = function(color){
    
    if(p.color == "red"){
        z=PIECES[0][0][0];
    }else if(p.color == "green"){
        z=PIECES[1][0][0];
    }else if(p.color == "purple"){
        z=PIECES[2][0][0];
    }else if(p.color == "yellow"){
        z=PIECES[3][0][0];
    }else if(p.color == "orange"){
        z=PIECES[4][0][0];
    }else if(p.color == "cyan"){
       z=PIECES[5][0][0];
    }else if(p.color == "blue"){
       z=PIECES[6][0][0];
    }



    for( r = 0; r < this.activeTetromino.length; r++){
        for(c = 0; c < this.activeTetromino.length; c++){
            
            if( z[r][c]>0){
                drawSquare_HOLD(r ,c , p.color);
            }
        }
    }
}

///////////////////////////////////////////////////////////////////////////////////////////////

function randomPiece(){
    
   
    
    draw_secondboard();
    
    let r=nextRandom;
    nextRandom = Math.floor(Math.random() * PIECES.length) // 0 -> 6
    let p=new Piece( PIECES[nextRandom][0],PIECES[nextRandom][1]);
    
    p.draw_2();
    cycle=1;
    return new Piece( PIECES[r][0],PIECES[r][1]);

}

let p = randomPiece();


function Piece(tetromino,color){
    this.tetromino = tetromino;
    this.color = color;
    
    this.tetrominoN = 0; // we start from the first pattern
    this.activeTetromino = this.tetromino[this.tetrominoN];
    
    // we need to control the pieces
    this.x = 3;
    this.y = -2;
}



Piece.prototype.fill = function(color){
    for( r = 0; r < this.activeTetromino.length; r++){
        for(c = 0; c < this.activeTetromino.length; c++){
            // we draw only occupied squares
            if( this.activeTetromino[r][c]){
                drawSquare(this.x + c,this.y + r, color);
            }
        }
    }
}




// draw a piece to the board

Piece.prototype.draw = function(){
    this.fill(this.color);
}


// undraw a piece



Piece.prototype.undraw = function(){
    this.fill(VACANT);
}

Piece.prototype.moveDown=function(){
    if(!this.collision(0,1,this.activeTetromino)){
        this.undraw();
        this.y++;
        this.draw();
    }else{
        this.lock();
        vacant=2;
        p = randomPiece();
    }
    
}

Piece.prototype.moveRight=function(){
    
    if(!this.collision(1,0,this.activeTetromino)){
        this.undraw();
        this.x++;
        this.draw();
    }
}

Piece.prototype.moveLeft=function(){
    
    if(!this.collision(-1,0,this.activeTetromino)){
        this.undraw();
        this.x--;
        this.draw();
    }
    
}

Piece.prototype.rotate = function(){
    
    let nextPattern=this.tetromino[(this.tetrominoN + 1)%this.tetromino.length];
    let kick=0

    if(this.collision(0,0,nextPattern)){
        if(this.x > COLUMN/2){
            kick=-1;
        }else{
            kick=1
        }
    }

    if(!this.collision(kick,0,nextPattern)){
        this.undraw();
       this.x +=kick;
        this.tetrominoN = (this.tetrominoN + 1)%this.tetromino.length; // (0+1)%4 => 1
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw();
    }
    
}

let score = 0;

Piece.prototype.lock = function(){
    for( r = 0; r < this.activeTetromino.length; r++){
        for(c = 0; c < this.activeTetromino.length; c++){
            // we skip the vacant squares
            if( !this.activeTetromino[r][c]){
                continue;
            }
            // pieces to lock on top = game over
            if(this.y + r < 0){
                alert("Game Over");
                // stop request animation frame
                gameOver = true;
                break;
            }
            // we lock the piece
            board[this.y+r][this.x+c] = this.color;
        }
    }
    // remove full rows
    for(r = 0; r < ROW; r++){
        let isRowFull = true;
        for( c = 0; c < COLUMN; c++){
            isRowFull = isRowFull && (board[r][c] != VACANT);
        }
        if(isRowFull){
            // if the row is full
            // we move down all the rows above it
            for( y = r; y > 1; y--){
                for( c = 0; c < COLUMN; c++){
                    board[y][c] = board[y-1][c];
                }
            }
            // the top row board[0][..] has no row above it
            for( c = 0; c < COLUMN; c++){
                board[0][c] = VACANT;
            }
            // increment the score
            score += 10;
        }
    }
    // update the board
    draw_board();
    
    // update the score
    scoreElement.innerHTML = score;
}



Piece.prototype.collision= function(x,y,piece){
    for(r=0; r < piece.length; r++){
        for(c=0; c < piece.length; c++){
            if(!piece[r][c]){
                continue;
            }
            let newX = this.x + c + x;
            let newY = this.y + r + y; 

            if( newX < 0 || newX >= COLUMN || newY >= ROW){
                return true;
            }
            if(newY < 0){ 
                continue;
            }
            if(board[newY][newX] != VACANT){
                return true;
            }
        }

    }
    return false;
}


    
document.addEventListener('keydown',control);

Piece.prototype.HOLD= function(){
      if(vacant==0){
        p.HOLD_fill();
        hold=p;
        this.undraw();
        p=randomPiece();
        this.x=3
        this.y=-2
        vacant=1;
      }
      if(vacant==2){
          
        draw_thirdboard();
        p.HOLD_fill()
        this.undraw();
        z=hold;
        hold=p;
        p=z;
        this.x=3
        this.y=-2
        vacant=1;
      }
        
        
        
    
}


function control(event){
    if(event.keyCode == 37){
        p.moveLeft();
        dropStart = Date.now();
    }else if(event.keyCode == 38){
        p.rotate();
        dropStart = Date.now();
    }else if(event.keyCode == 39){
        p.moveRight();
        dropStart = Date.now();
    }else if(event.keyCode == 40){
        p.moveDown();
        dropStart=Date.now();
    }
    else if(event.keyCode == 90){
        p.HOLD();
        
        dropStart=Date.now();
        
        
    }
}

let dropStart = Date.now();
let gameOver=false;
function drop(){
    let now=Date.now();
    let delta=now-dropStart;
    if(delta>1000){
        p.moveDown();
        dropStart=Date.now();
    }
    if(!gameOver){
        requestAnimationFrame(drop);
    }
   
    
    
}

drop();


