class Game{
  #all_moves = []
  #captures = 0
  #counter = 3
  #drawedArrows = 0
  #full_moves = 1
  #half_moves = 0
  #gameStarted = false
  #has_legal = true
  #is_Checkmate = false
  #is_Draw = false
  #last_move = []
  #turn = "White's Turn"
  updateMoves(move){
    this.#all_moves.push(move)
  }
  getMoves(){
    return this.#all_moves
  }
  updatecaptures(){
    this.#captures++
  }
  getcaptures(){
    return this.#captures
  }
  updatecounter(){
    this.#counter++
  }
  getcounter(){
    return this.#counter
  }
  updatedrawedArrows(){
    this.#drawedArrows++
  }
  getdrawedArrows(){
    return this.#drawedArrows
  }  
  updatefull_moves(){
    this.#full_moves++
  }
  getfull_moves(){
    return this.#full_moves
  }
  setgameStarted(val){
    this.#gameStarted = val
  }
  getgameStarted(){
    return this.#gameStarted
  }
  updatehalf_moves(){
    this.#half_moves++
  }
  gethalf_moves(){
    return this.#half_moves
  }
  getgameStarted(){
    return this.#has_legal
  }
  sethas_legal(val){
    this.#has_legal = val
  }
  gethas_legal(){
    return this.#has_legal
  }
  setis_Checkmate(val){
    this.#is_Checkmate = val
  }
  getis_Checkmate(){
    return this.#is_Checkmate
  }
  setis_Draw(val){
    this.#is_Draw = val
  }
  getis_Draw(){
    return this.#is_Draw
  }  
  updatelast_move(move){
    this.#last_move = move
  }
  getlast_move(){
    return this.#last_move
  }
  updateturn(){
    if(this.#turn == "White's Turn"){
      this.#turn = "Black's Turn"
    }else{
      this.#turn = "White's Turn"
    }
  }
  getturn(){
    return this.#turn
  }
}


class Board extends Game{
 #all_pieces = []
 #all_squares = []
 #cordinates_x = [0,'a','b','c','d','e','f','g','h']
 #cordinates_y = [0,1,2,3,4,5,6,7,8]
 #fen = [0, 'rnbqkbnr', 'pppppppp', '8', '8', '8', '8', 'PPPPPPPP', 'RNBQKBNR', 'w', 'KQkq', '-', '0', '1']
 #king_status = []
 #stringFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
 #addPiece(piece){
   this.#all_pieces.push(piece)
 }
 getPieces(){
  return this.#all_pieces
 }
 getSquares(){
  return this.#all_squares
 }
 getSquare(squarename){
   let square = null  
   this.getSquares().forEach(obj =>{ 
    if(obj.getName() == squarename){
      square = obj
    }
   })
   return square
 }
 getPiece(pieceName){
   let piece = null  
   this.getPieces().forEach(pieceobj =>{ 
    if(pieceobj.getName() == pieceName){
      piece = pieceobj
    }
   })
   return piece
 }
 #addSquare(square){
  this.#all_squares.push(square)
 }
 getSquares(){
  return this.#all_squares
 }
 getCoordX(){
  return this.#cordinates_x
 }
 getCoordY(){
  return this.#cordinates_y
 }
 #setFen(fen){
   this.#fen = fen
 }
 getFen(){
  return this.#fen
 }
 #setKingStatus(availMoves){
   this.#king_status = availMoves
 }
 getKingStatus(){
  return this.#king_status
 }
 #setstrFen(fen){
   this.#stringFen = fen
 }
 getstrFen(){
  return this.#stringFen
 }
  createSquares(){
    for(let i = 1; i <= 8; i++){
      for(let z = 1; z <= 8; z++){
      let squareId = this.getCoordX()[i] + this.getCoordY()[z]
      let piece = document.getElementById(squareId).firstChild 
      let pieceId = piece ? piece.id : null
      let defColor = (i % 2 == 1 && z % 2 == 0) || (i % 2 == 0 && z % 2 == 1) ? "white" : "black"
      let currentSquare = new Square(squareId,defColor,defColor,i,z)
      let PieceData = new Piece().getPieceData(piece)
      if(pieceId){
        this.#createPieces(PieceData.color,pieceId,squareId,PieceData.type,i,z)  
      }     
      currentSquare.setpieceName(pieceId)
      this.#addSquare(currentSquare)
      }
    }
  }
  #createPieces(color,name,square,type,x,y){
    let piece = new Piece(color,name,square,type,x,y,false)
    this.#addPiece(piece)
    piece.initEvent()
    piece.initDrag()
    piece.initDrop()
    piece.initEnter()
    piece.initLeave()
  }
}


class Square{
  #name
  #color
  #defaultcolor
  #x
  #y
  #pieceName
  getSquareElement(targetId){
    let target = document.getElementById(targetId)
    return target
  }
  getName(){
    return this.#name
  }
  getColor(){
    return this.#color
  }
  getDefaultColor(){
    return this.#defaultcolor
  }
  getx(){
    return this.#x
  }
  gety(){
    return this.#y
  }
  setpieceName(piecename){
    this.#pieceName = piecename
  }
  getpieceName(){
    return this.#pieceName
  }
  constructor(name,color,defaultcolor,x,y){
   this.#name = name
   this.#color = color
   this.#defaultcolor = defaultcolor
   this.#x = x
   this.#y = y
  }
  decode(){
    let x = this.getx()
    let y = this.gety()
    return {x,y}
  }
  getSquareElement(targetId){
    let target = document.getElementById(targetId)
    return target
  }
  applyColor(color){
    this.#color = color
    this.getSquareElement(this.getName()).style.backgroundColor = color
  }
  removeColor(){
    let color = this.#defaultcolor == "white" ? "rgb(240, 201, 150)" : "rgb(100, 75, 43)"
    this.#color = this.#defaultcolor
    this.getSquareElement(this.getName()).style.backgroundColor = color
  }
  hasPiece(){
    return this.#pieceName ? true : false
  }
}


class Player{
  #team;
  #name;
  #captured = [];
  #resigned = false
  #setName(name){
    this.#name = name
  }
  getName(){
    return this.#name
  }
  updateCaptured(piece){
    this.#captured.push(piece)
  }
  getCaptured(){
    return this.#captured
  }
  #setTeam(team){
    this.#team = team
  }
  getTeam(){
    return this.#team
  }
  setresigned(val){
    this.#resigned = val
  }
  getresigned(){
    return this.#resigned
  }
  constructor(name,team){
    this.#setName(name)
    this.#setTeam(team)
  }
}


class Piece extends Board{
  #color
  #name
  #square
  #type
  #x
  #y
  #pinned = false
  #allTransforms = ["translate(0px,0px)","scale(1)","rotate(0deg)"]
  #pieceElement
  constructor(color,name,square,type,x,y){
    super()
    this.#color = color
    this.#name = name
    this.#square = square
    this.#type = type
    this.#x = x
    this.#y = y
  }
  initEvent(){
   this.#pieceElement = this.getPieceElement(this.getName())
   ResEvent.initEvent(this.#pieceElement,"movable","dragging","square",this.#pieceElement,this.#allTransforms)
  }
  initDrag(){
   ResEvent.enableEvent(this.#pieceElement,"start")
   this.#pieceElement.addEventListener("ResponsiveDragStart",this.#DragStartEvent.bind(this))
  }
  initDrop(){
   ResEvent.enableEvent(this.#pieceElement,"drop")
   this.#pieceElement.addEventListener("ResponsiveDrop",this.#DropEvent.bind(this))
  }
  initEnter(){
   ResEvent.enableEvent(this.#pieceElement,"enter")
   this.#pieceElement.addEventListener("ResponsiveDragEnter",this.#enter.bind(this))
  }
  initLeave(){
   ResEvent.enableEvent(this.#pieceElement,"leave")
   this.#pieceElement.addEventListener("ResponsiveDragLeave",this.#leave.bind(this))
  }
  getPieceElement(targetId){
    let target = document.getElementById(targetId)
    return target
  }
  #DragStartEvent(e){
    this.#drag(e.target)
  }
  #DropEvent(e){
    this.#drop({drag:e.detail.drag,drop:e.detail.drop})
  }
  #drag(piece){
    let square = piece.parentNode
    let startSquare = board.getSquare(square.id)
    startSquare.applyColor("rgb(74,236,0)")
  }
  #drop(data){
    let piece = data.drag
    let targetSquare = data.drop
    let StartsquareObj = board.getSquare(piece.parentNode.id)
    let TargetsquareObj = board.getSquare(targetSquare.id)
    let isPiece = TargetsquareObj.hasPiece()
    if(isPiece){
    let Pieceindex = this.findPieceIndex(targetSquare.firstChild.id)
    this.#removePiece(Pieceindex)
    this.#capture(targetSquare.id)
    } 
    this.#MovePiece(piece,targetSquare)
    let targetX = board.getSquare(targetSquare.id).decode().x
    let targetY = board.getSquare(targetSquare.id).decode().y
    this.#updatePieceDetails(piece,targetSquare.id,targetX,targetY)
    TargetsquareObj.setpieceName(piece.id)
    StartsquareObj.setpieceName(null)
  }
  #MovePiece(piece,square){
    square.appendChild(piece)
  }
  #enter(e){
    let curr = e.detail.enterElement
    curr.style.borderColor = "whitesmoke"
  }
  #leave(e){
    let curr = e.detail.leaveElement
    curr.style.borderColor = "black"
  }
  #updatePieceDetails(pieceName,square,x,y){
   let piece = board.getPiece(this.getPieceData(pieceName).name)
   if(!piece instanceof Piece) return
   piece.#setX(x)
   piece.#setY(y)
   piece.#setSquare(square)
  }
  findPieceIndex(pieceName){
    let index = null
    for(let i = 0; i < board.getPieces().length; i++){
      let name = board.getPieces()[i].getName()
      if(pieceName == name){
        index = i
      }
    }
    return index
  }
  #removePiece(index){
    board.getPieces().splice(index,1)
  }
  getPieceData(piece){
    if(piece){
     let pieceColor = piece.classList[1]
     let pieceId = Array.from(piece.id)
     let end = pieceId.indexOf("_")
     let type = pieceId.slice(0,end).join("")
     return {name:pieceId.join(""),color:pieceColor,type} 
    }  
  }
  #capture(squareId){
  let squareElement = this.getPieceElement(squareId)
  if(squareElement.firstChild){
    squareElement.removeChild(squareElement.firstChild)
  }  
  }
  getColor(){
    return this.#color
  }
  getName(){
    return this.#name
  }
  getType(){
    return this.#type
  }
  #setSquare(square){
    this.#square = square
  }
  getSquare(){
    return this.#square
  }
  #setX(x){
    this.#x = x
  }
  getX(){
    return this.#x
  }
  #setY(y){
    this.#y = y
  }
  getY(){
    return this.#y
  }
  #setPinned(pinned){
    this.#pinned = pinned
  }
  getPinned(){
    return this.#pinned
  }
}


class Timer{

}


class Details{

}

let game = new Game()
let player1 = new Player("Black","black")
let player2 = new Player("White","white")
let board = new Board()
board.createSquares()
//console.log("Chess v.4!")
