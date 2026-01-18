const boardElement = document.getElementById('chessboard');
let selectedSquare = null;
let turn = 'white';

const initialBoard = [
  ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
  ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
  ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']
];

const pieceSymbols = {
  'r': '♜', 'n': '♞', 'b': '♝', 'q': '♛', 'k': '♚', 'p': '♟',
  'R': '♖', 'N': '♘', 'B': '♗', 'Q': '♕', 'K': '♔', 'P': '♙'
};

function createBoard() {
  boardElement.innerHTML = '';
  initialBoard.forEach((row, rowIndex) => {
    row.forEach((piece, colIndex) => {
      const square = document.createElement('div');
      square.classList.add('square', (rowIndex + colIndex) % 2 === 0 ? 'white' : 'black');
      square.dataset.row = rowIndex;
      square.dataset.col = colIndex;
      square.innerHTML = piece ? pieceSymbols[piece] : '';
      square.addEventListener('click', handleSquareClick);
      boardElement.appendChild(square);
    });
  });
}

function handleSquareClick(event) {
  const square = event.target;
  const row = parseInt(square.dataset.row);
  const col = parseInt(square.dataset.col);
  const piece = initialBoard[row][col];

  if (selectedSquare) {
    const [prevRow, prevCol] = selectedSquare;
    if (isValidMove(prevRow, prevCol, row, col)) {
      movePiece(prevRow, prevCol, row, col);
      toggleTurn();
    }
    deselectSquare();
  } else if (piece && isPlayerPiece(piece)) {
    selectSquare(row, col);
  }
}

function isValidMove(fromRow, fromCol, toRow, toCol) {
  // Implement piece-specific movement logic here
  return true;
}

function movePiece(fromRow, fromCol, toRow, toCol) {
  const piece = initialBoard[fromRow][fromCol];
  initialBoard[toRow][toCol] = piece;
  initialBoard[fromRow][fromCol] = '';
  updateBoard();
}

function selectSquare(row, col) {
  selectedSquare = [row, col];
  const square = boardElement.children[row * 8 + col];
  square.classList.add('selected');
}

function deselectSquare() {
  if (selectedSquare) {
    const [row, col] = selectedSquare;
    const square = boardElement.children[row * 8 + col];
    square.classList.remove('selected');
    selectedSquare = null;
  }
}

function toggleTurn() {
  turn = turn === 'white' ? 'black' : 'white';
}

function isPlayerPiece(piece) {
  return (turn === 'white' && piece === piece.toUpperCase()) ||
         (turn === 'black' && piece === piece.toLowerCase());
}

function updateBoard() {
  Array.from(boardElement.children).forEach((square, index) => {
    const row = Math.floor(index / 8);
    const col = index % 8;
    const piece = initialBoard[row][col];
    square.innerHTML = piece ? pieceSymbols[piece] : '';
  });
}

createBoard();
