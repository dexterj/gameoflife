var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

GRID_WIDTH = 100;
GRID_HEIGHT = 100;
CELL_SIZE = 10;
var SPEED = 1000;
var state = {};

state ["1,1"] = true;
state ["1,2"] = true;
state ["1,3"] = true;

var dying = [];
var spawning = [];
itsRunning = false;
var drawSquare = function(x,y){
  ctx.strokeStyle="#000000";
  ctx.strokeRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
  };

var liveCell = function(x,y){
  ctx.fillStyle="#ffffff";
  ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
  };

var deadCell = function(x,y){
  ctx.fillStyle="#ff0000";
  ctx.fillRect(x*CELL_SIZE,y*CELL_SIZE,CELL_SIZE,CELL_SIZE);
  };

function setCellDead(x,y){
  //console.log("killing",x,y,numNeighbors(x,y));
  var cell_id = ""+x+","+y;
  dying.push(cell_id); 
}

function setCellAlive(x,y){
   var cell_id = ""+x+","+y;
   spawning.push(cell_id);
}

var getCellState = function(x,y){
  var cell_id = ""+x+","+y;  
  //console.log(cell_id, state[cell_id]);
  if (state[cell_id]){
    return true
  }
}
  
var draw_grid = function(){
  for (var i=0; i<GRID_WIDTH; i++){
    for (var j=0; j<GRID_HEIGHT; j++){
      if (getCellState(i,j)){
      liveCell(i,j);
      }
      else deadCell(i,j);
      drawSquare(i, j);
    }
  }
}
  
function render(){
  draw_grid();
  setTimeout(render, 1000/60);
}
render();

function numNeighbors(x,y){
  var i = 0;
  if (getCellState(x-1,y-1) == true) i++;
  if (getCellState(x,y-1) == true) i++;
  if (getCellState(x+1,y-1) == true) i++;
  if (getCellState(x-1,y) == true) i++;
  if (getCellState(x+1,y) == true) i++;
  if (getCellState(x-1,y+1) == true) i++;
  if (getCellState(x,y+1) == true) i++;
  if (getCellState(x+1,y+1) == true) i++;
  return i;
} 

var killCell = function(x,y){
  if (numNeighbors(x,y) < 2) 
    setCellDead(x,y);
  if (numNeighbors(x,y) > 3)
    setCellDead(x,y);
}

var spawnCell = function(x,y){
  if (numNeighbors(x,y) == 3)
    setCellAlive(x,y);
}

var life = function(){
  for (var i=0; i<GRID_WIDTH; i++){
    for (var j=0; j<GRID_HEIGHT; j++){
      if (getCellState(i,j) == true)
        killCell(i,j);
      else
        spawnCell(i,j); 
    }
  }
  for (var i=0; i<dying.length; i++)     
    state[dying[i]] = false;
  for (var i=0; i<spawning.length; i++)
    state[spawning[i]] = true;
  dying = [];
  spawning = [];
  console.log(itsRunning)
}

var startGame = function(){
  if(itsRunning){
    SPEED=$('#speed').val();
    setTimeout(startGame, 1100-SPEED);
    life();
  }
  else 
    return;
};

var toggleGame = function(){
  console.log(itsRunning ,"toggle")
  if(itsRunning){
    itsRunning=false;
    $(this).text("Start");
  }
  else {
    itsRunning=true;
    $(this).text("Stop");
    startGame();
  };

};

var changePattern = function(ev){
  console.log(ev.offsetX, ev.offsetY);
  var x = Math.floor(ev.offsetX/CELL_SIZE);
  var y = Math.floor(ev.offsetY/CELL_SIZE);
  console.log(x,y);
    var cell_id = ""+x+","+y; 
    state[cell_id] = !state[cell_id];
};


$("button").on("click", toggleGame);

$("canvas").on("click", changePattern);








  




