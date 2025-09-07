// Changes needed for pawn promotion and en passant:

// 1. Add to global state:
let lastMove = null; // Track last move for en passant

// 2. Modified getValidMoves function (pawn section):
case 'pawn':
  const direction = piece.color === 'white' ? -1 : 1;
  const startRow = piece.color === 'white' ? 6 : 1;
  
  // Forward moves
  const oneSquareAhead = row + direction;
  if (oneSquareAhead >= 0 && oneSquareAhead < 8 && !board[oneSquareAhead][col]) {
    moves.push({ 
      row: oneSquareAhead, 
      col,
      promotion: oneSquareAhead === 0 || oneSquareAhead === 7 ? true : undefined
    });
    
    // Initial two-square advance
    if (row === startRow) {
      const twoSquaresAhead = row + 2 * direction;
      if (twoSquaresAhead >= 0 && twoSquaresAhead < 8 && !board[twoSquaresAhead][col]) {
        moves.push({ row: twoSquaresAhead, col });
      }
    }
  }
  
  // Diagonal captures and en passant
  [[direction, -1], [direction, 1]].forEach(([dRow, dCol]) => {
    const newRow = row + dRow;
    const newCol = col + dCol;
    if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
      // Regular diagonal capture
      if (board[newRow][newCol]?.color === (piece.color === 'white' ? 'black' : 'white')) {
        moves.push({ 
          row: newRow, 
          col: newCol,
          promotion: newRow === 0 || newRow === 7 ? true : undefined
        });
      }
      // En passant
      if (!board[newRow][newCol] && // Target square is empty
          lastMove && // There was a last move
          lastMove.piece.piece === 'pawn' && // It was a pawn
          lastMove.piece.color !== piece.color && // Enemy pawn
          lastMove.from.row === (piece.color === 'white' ? 1 : 6) && // Started from initial position
          lastMove.to.row === row && // Landed beside our pawn
          lastMove.to.col === newCol && // In the column we're attacking
          Math.abs(lastMove.from.row - lastMove.to.row) === 2) { // Moved two squares
        moves.push({ 
          row: newRow, 
          col: newCol, 
          enPassant: { row: row, col: newCol }
        });
      }
    }
  });
  break;

// 3. Modified makeMove function:
function makeMove(fromRow, fromCol, toRow, toCol) {
  const piece = board[fromRow][fromCol];
  const moveDetails = getValidMoves(fromRow, fromCol)
    .find(m => m.row === toRow && m.col === toCol);
  
  if (!moveDetails) return; // Invalid move
  
  // Handle pawn promotion
  let promotedPiece = null;
  if (moveDetails.promotion) {
    const promotionType = currentPlayer === 'white' ? 
      prompt('Choose promotion piece (queen, rook, bishop, knight):', 'queen') : 
      'queen'; // AI always chooses queen
    promotedPiece = {
      piece: promotionType,
      color: piece.color
    };
  }
  
  // Record move for history and potential undo
  const historyEntry = {
    from: { row: fromRow, col: fromCol },
    to: { row: toRow, col: toCol },
    piece: { ...piece },
    captured: board[toRow][toCol],
    promotion: promotedPiece
  };
  
  // Handle en passant capture
  if (moveDetails.enPassant) {
    historyEntry.enPassant = {
      row: moveDetails.enPassant.row,
      col: moveDetails.enPassant.col,
      captured: board[moveDetails.enPassant.row][moveDetails.enPassant.col]
    };
    board[moveDetails.enPassant.row][moveDetails.enPassant.col] = null;
  }
  
  gameHistory.push(historyEntry);
  
  // Execute the move
  board[toRow][toCol] = promotedPiece || piece;
  board[fromRow][fromCol] = null;
  
  // Update lastMove for en passant
  lastMove = historyEntry;
  
  // Rest of the existing makeMove function...
}

// 4. Modified undoMove function:
function undoMove() {
  if (gameHistory.length === 0) return;
  
  const moveEntry = gameHistory.pop();
  
  // Restore original piece or undo promotion
  board[moveEntry.from.row][moveEntry.from.col] = moveEntry.piece;
  
  // Restore captured piece
  board[moveEntry.to.row][moveEntry.to.col] = moveEntry.captured;
  
  // Handle en passant restoration
  if (moveEntry.enPassant) {
    board[moveEntry.enPassant.row][moveEntry.enPassant.col] = moveEntry.enPassant.captured;
  }
  
  // Clear last move tracking for en passant
  lastMove = null;
  
  currentPlayer = currentPlayer === 'white' ? 'black' : 'white';
  renderBoard();
}

// 5. Add these test cases to runChessTests:
function testPawnPromotionAndEnPassant() {
  console.log('\n♟️ Testing Pawn Promotion and En Passant:');
  
  // Test Pawn Promotion
  board = Array(8).fill().map(() => Array(8).fill(null));
  board[1][0] = { piece: 'pawn', color: 'white' }; // White pawn about to promote
  
  let moves = getValidMoves(1, 0);
  assert(moves.some(m => m.row === 0 && m.promotion),
    "Pawn should have promotion flag when reaching the opposite end");
  
  // Test En Passant
  board = Array(8).fill().map(() => Array(8).fill(null));
  board[3][1] = { piece: 'pawn', color: 'white' };
  board[1][0] = { piece: 'pawn', color: 'black' };
  
  // Simulate black pawn moving two squares
  lastMove = {
    from: { row: 1, col: 0 },
    to: { row: 3, col: 0 },
    piece: { piece: 'pawn', color: 'black' }
  };
  
  moves = getValidMoves(3, 1);
  assert(moves.some(m => m.enPassant && m.row === 2 && m.col === 0),
    "White pawn should be able to capture en passant");
}
