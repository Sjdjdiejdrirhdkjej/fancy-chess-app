// Initial chess board setup
export const initialBoard = [
  ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook'],
  ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn', 'pawn'],
  ['rook', 'knight', 'bishop', 'queen', 'king', 'bishop', 'knight', 'rook']
];

// Initial colors for pieces
export const initialColors = [
  ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black'],
  ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
  ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white']
];

// Check if a square is under attack by the opponent
export const isSquareUnderAttack = (row, col, color, testBoard, testColors, enPassantTarget) => {
  const opponentColor = color === 'white' ? 'black' : 'white';

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (testColors[r][c] === opponentColor && testBoard[r][c]) {
        const moves = getPossibleMoves(r, c, testBoard, testColors, false, enPassantTarget);
        if (moves.some(move => move.row === row && move.col === col)) {
          return true;
        }
      }
    }
  }
  return false;
};

// Get possible moves for a piece
export const getPossibleMoves = (row, col, testBoard, testColors, checkForCheck = true, enPassantTarget) => {
  const piece = testBoard[row][col];
  const color = testColors[row][col];
  if (!piece || !color) return [];

  let moves = [];

  switch (piece) {
    case 'pawn':
      const direction = color === 'white' ? -1 : 1;
      const startRow = color === 'white' ? 6 : 1;

      // Move forward one square
      if (row + direction >= 0 && row + direction < 8 && !testBoard[row + direction][col]) {
        moves.push({ row: row + direction, col });

        // Move forward two squares from starting position
        if (row === startRow && !testBoard[row + 2 * direction][col]) {
          moves.push({ row: row + 2 * direction, col });
        }
      }

      // Capture diagonally
      for (const dc of [-1, 1]) {
        const newRow = row + direction;
        const newCol = col + dc;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
          if (testBoard[newRow][newCol] && testColors[newRow][newCol] !== color) {
            moves.push({ row: newRow, col: newCol });
          }
          // En passant capture
          else if (enPassantTarget &&
                   enPassantTarget.row === newRow &&
                   enPassantTarget.col === newCol) {
            moves.push({ row: newRow, col: newCol, isEnPassant: true });
          }
        }
      }
      break;

    case 'rook':
      const rookDirections = [[0, 1], [0, -1], [1, 0], [-1, 0]];
      for (const [dr, dc] of rookDirections) {
        for (let i = 1; i < 8; i++) {
          const newRow = row + dr * i;
          const newCol = col + dc * i;
          if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;

          if (!testBoard[newRow][newCol]) {
            moves.push({ row: newRow, col: newCol });
          } else {
            if (testColors[newRow][newCol] !== color) {
              moves.push({ row: newRow, col: newCol });
            }
            break;
          }
        }
      }
      break;

    case 'bishop':
      const bishopDirections = [[1, 1], [1, -1], [-1, 1], [-1, -1]];
      for (const [dr, dc] of bishopDirections) {
        for (let i = 1; i < 8; i++) {
          const newRow = row + dr * i;
          const newCol = col + dc * i;
          if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;

          if (!testBoard[newRow][newCol]) {
            moves.push({ row: newRow, col: newCol });
          } else {
            if (testColors[newRow][newCol] !== color) {
              moves.push({ row: newRow, col: newCol });
            }
            break;
          }
        }
      }
      break;

    case 'queen':
      const queenDirections = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
      for (const [dr, dc] of queenDirections) {
        for (let i = 1; i < 8; i++) {
          const newRow = row + dr * i;
          const newCol = col + dc * i;
          if (newRow < 0 || newRow >= 8 || newCol < 0 || newCol >= 8) break;

          if (!testBoard[newRow][newCol]) {
            moves.push({ row: newRow, col: newCol });
          } else {
            if (testColors[newRow][newCol] !== color) {
              moves.push({ row: newRow, col: newCol });
            }
            break;
          }
        }
      }
      break;

    case 'king':
      const kingMoves = [[0, 1], [0, -1], [1, 0], [-1, 0], [1, 1], [1, -1], [-1, 1], [-1, -1]];
      for (const [dr, dc] of kingMoves) {
        const newRow = row + dr;
        const newCol = col + dc;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
          if (!testBoard[newRow][newCol] || testColors[newRow][newCol] !== color) {
            moves.push({ row: newRow, col: newCol });
          }
        }
      }
      break;

    case 'knight':
      const knightMoves = [[2, 1], [2, -1], [-2, 1], [-2, -1], [1, 2], [1, -2], [-1, 2], [-1, -2]];
      for (const [dr, dc] of knightMoves) {
        const newRow = row + dr;
        const newCol = col + dc;
        if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
          if (!testBoard[newRow][newCol] || testColors[newRow][newCol] !== color) {
            moves.push({ row: newRow, col: newCol });
          }
        }
      }
      break;
  }

  // Filter moves that would put own king in check
  if (checkForCheck) {
    moves = moves.filter(move => {
      const newBoard = testBoard.map(row => [...row]);
      const newColors = testColors.map(row => [...row]);

      // Make the move
      newBoard[move.row][move.col] = newBoard[row][col];
      newColors[move.row][move.col] = newColors[row][col];
      newBoard[row][col] = null;
      newColors[row][col] = null;

      // Find king position
      let kingRow, kingCol;
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          if (newBoard[r][c] === 'king' && newColors[r][c] === color) {
            kingRow = r;
            kingCol = c;
            break;
          }
        }
      }

      return !isSquareUnderAttack(kingRow, kingCol, color, newBoard, newColors, enPassantTarget);
    });
  }

  return moves;
};

// Check if the current player is in check
export const isInCheck = (color, board, pieceColors, enPassantTarget) => {
  let kingRow, kingCol;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c] === 'king' && pieceColors[r][c] === color) {
        kingRow = r;
        kingCol = c;
        break;
      }
    }
  }
  return isSquareUnderAttack(kingRow, kingCol, color, board, pieceColors, enPassantTarget);
};

// Check for checkmate or stalemate
export const checkGameStatus = (currentPlayer, board, pieceColors, enPassantTarget) => {
  const hasValidMoves = () => {
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (pieceColors[r][c] === currentPlayer && board[r][c]) {
          const moves = getPossibleMoves(r, c, board, pieceColors, true, enPassantTarget);
          if (moves.length > 0) return true;
        }
      }
    }
    return false;
  };

  const inCheck = isInCheck(currentPlayer, board, pieceColors, enPassantTarget);
  const hasValidMovesLeft = hasValidMoves();

  if (!hasValidMovesLeft) {
    if (inCheck) {
      return `checkmate-${currentPlayer === 'white' ? 'black' : 'white'}`;
    } else {
      return 'stalemate';
    }
  } else if (inCheck) {
    return `check-${currentPlayer}`;
  } else {
    return 'active';
  }
};
