function getValidMoves(row, col) {
  const piece = board[row][col];
  if (!piece) return [];
  
  const moves = [];
  
  switch (piece.piece) {
    case 'pawn':
      const direction = piece.color === 'white' ? -1 : 1;
      const startRow = piece.color === 'white' ? 6 : 1;
      
      // Forward move (never backward)
      const oneSquareAhead = row + direction;
      if (oneSquareAhead >= 0 && oneSquareAhead < 8 && !board[oneSquareAhead][col]) {
        moves.push({ 
          row: oneSquareAhead, 
          col,
          promotion: oneSquareAhead === 0 || oneSquareAhead === 7 ? true : undefined
        });
        
        // Initial two-square advance
        const twoSquaresAhead = row + 2 * direction;
        if (row === startRow && twoSquaresAhead >= 0 && twoSquaresAhead < 8 && !board[twoSquaresAhead][col]) {
          moves.push({ row: twoSquaresAhead, col });
        }
      }
      
      // Diagonal captures
      [[direction, -1], [direction, 1]].forEach(([dRow, dCol]) => {
        const newRow = row + dRow;
        const newCol = col + dCol;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && 
            board[newRow][newCol]?.color === (piece.color === 'white' ? 'black' : 'white')) {
          moves.push({ 
            row: newRow, 
            col: newCol,
            promotion: newRow === 0 || newRow === 7 ? true : undefined
          });
        }
      });
      break;
      
    case 'knight':
      [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]].forEach(([dRow, dCol]) => {
        const newRow = row + dRow;
        const newCol = col + dCol;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && 
            board[newRow]?.[newCol]?.color !== piece.color) {
          moves.push({ row: newRow, col: newCol });
        }
      });
      break;
      
    case 'bishop':
      [[-1, -1], [-1, 1], [1, -1], [1, 1]].forEach(([dRow, dCol]) => {
        let newRow = row + dRow;
        let newCol = col + dCol;
        while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && !board[newRow][newCol]) {
          moves.push({ row: newRow, col: newCol });
          newRow += dRow;
          newCol += dCol;
        }
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && 
            board[newRow][newCol]?.color !== piece.color) {
          moves.push({ row: newRow, col: newCol });
        }
      });
      break;
      
    case 'rook':
      [[-1, 0], [1, 0], [0, -1], [0, 1]].forEach(([dRow, dCol]) => {
        let newRow = row + dRow;
        let newCol = col + dCol;
        while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && !board[newRow][newCol]) {
          moves.push({ row: newRow, col: newCol });
          newRow += dRow;
          newCol += dCol;
        }
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && 
            board[newRow][newCol]?.color !== piece.color) {
          moves.push({ row: newRow, col: newCol });
        }
      });
      break;
      
    case 'queen':
      [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]].forEach(([dRow, dCol]) => {
        let newRow = row + dRow;
        let newCol = col + dCol;
        while (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && !board[newRow][newCol]) {
          moves.push({ row: newRow, col: newCol });
          newRow += dRow;
          newCol += dCol;
        }
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && 
            board[newRow][newCol]?.color !== piece.color) {
          moves.push({ row: newRow, col: newCol });
        }
      });
      break;
      
    case 'king':
      for (let dRow = -1; dRow <= 1; dRow++) {
        for (let dCol = -1; dCol <= 1; dCol++) {
          if (dRow === 0 && dCol === 0) continue;
          const newRow = row + dRow;
          const newCol = col + dCol;
          if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8 && 
              board[newRow]?.[newCol]?.color !== piece.color) {
            moves.push({ row: newRow, col: newCol });
          }
        }
      }
      break;
  }
  
  return moves.filter(move => 
    move.row >= 0 && move.row < 8 && 
    move.col >= 0 && move.col < 8
  );
}
