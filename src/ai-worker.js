import { getPossibleMoves } from './chess-logic.js';

const pieceValues = {
  pawn: 1,
  knight: 3,
  bishop: 3,
  rook: 5,
  queen: 9,
  king: 100,
};

self.onmessage = (e) => {
  const { board, pieceColors, currentPlayer, difficulty, enPassantTarget } = e.data;

  const bestMove = calculateBestMove(board, pieceColors, currentPlayer, difficulty, enPassantTarget);

  self.postMessage(bestMove);
};

function calculateBestMove(board, pieceColors, currentPlayer, difficulty, enPassantTarget) {
  const allMoves = getAllPossibleMoves(board, pieceColors, currentPlayer, enPassantTarget);

  if (allMoves.length === 0) {
    return null; // No legal moves
  }

  if (difficulty === 'easy') {
    const randomIndex = Math.floor(Math.random() * allMoves.length);
    return allMoves[randomIndex];
  }

  if (difficulty === 'medium') {
    return minimax(board, pieceColors, currentPlayer, 2, true, enPassantTarget).move;
  }

  if (difficulty === 'hard') {
    return minimax(board, pieceColors, currentPlayer, 4, true, enPassantTarget, -Infinity, Infinity).move;
  }
}

function getAllPossibleMoves(board, pieceColors, player, enPassantTarget) {
  const allMoves = [];
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (pieceColors[r][c] === player) {
        const moves = getPossibleMoves(r, c, board, pieceColors, true, enPassantTarget);
        if (moves.length > 0) {
          allMoves.push(...moves.map(move => ({ from: { row: r, col: c }, to: move })));
        }
      }
    }
  }
  return allMoves;
}

function evaluateBoard(board, pieceColors) {
  let score = 0;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c]) {
        const piece = board[r][c];
        const color = pieceColors[r][c];
        const value = pieceValues[piece];
        if (color === 'white') {
          score += value;
        } else {
          score -= value;
        }
      }
    }
  }
  return score;
}

function minimax(board, pieceColors, player, depth, maximizingPlayer, enPassantTarget, alpha, beta) {
  if (depth === 0) {
    return { score: evaluateBoard(board, pieceColors) };
  }

  const moves = getAllPossibleMoves(board, pieceColors, player, enPassantTarget);
  let bestMove = null;
  let bestScore = maximizingPlayer ? -Infinity : Infinity;

  for (const move of moves) {
    const { from, to } = move;
    const newBoard = board.map(row => [...row]);
    const newColors = pieceColors.map(row => [...row]);

    // Make the move
    newBoard[to.row][to.col] = newBoard[from.row][from.col];
    newColors[to.row][to.col] = newColors[from.row][from.col];
    newBoard[from.row][from.col] = null;
    newColors[from.row][from.col] = null;

    const newEnPassantTarget = newBoard[to.row][to.col] === 'pawn' && Math.abs(to.row - from.row) === 2 ? { row: from.row + (to.row - from.row) / 2, col: from.col } : null;

    const result = minimax(newBoard, newColors, player === 'white' ? 'black' : 'white', depth - 1, !maximizingPlayer, newEnPassantTarget, alpha, beta);

    if (maximizingPlayer) {
      if (result.score > bestScore) {
        bestScore = result.score;
        bestMove = move;
      }
      if (alpha !== undefined) {
        alpha = Math.max(alpha, bestScore);
        if (beta <= alpha) {
          break; // Beta cut-off
        }
      }
    } else {
      if (result.score < bestScore) {
        bestScore = result.score;
        bestMove = move;
      }
      if (beta !== undefined) {
        beta = Math.min(beta, bestScore);
        if (beta <= alpha) {
          break; // Alpha cut-off
        }
      }
    }
  }

  return { score: bestScore, move: bestMove };
}
