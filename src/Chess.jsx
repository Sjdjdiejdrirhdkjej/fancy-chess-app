import React, { useState, useEffect, useCallback } from 'react';
import './Chess.css';

// Custom SVG Chess Pieces
const PIECES = {
  white: {
    king: (
      <svg viewBox="0 0 100 100" className="chess-piece-svg">
        <defs>
          <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f8f9fa" />
            <stop offset="100%" stopColor="#e9ecef" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
          </filter>
        </defs>
        <path d="M50 15 L45 25 L40 20 L35 25 L30 20 L25 25 L30 30 L35 25 L40 30 L45 25 L50 30 L55 25 L60 30 L65 25 L70 30 L75 25 L70 20 L65 25 L60 20 L55 25 L50 15 Z" fill="url(#whiteGradient)" stroke="#666" strokeWidth="1" filter="url(#shadow)" />
        <circle cx="50" cy="40" r="12" fill="url(#whiteGradient)" stroke="#666" strokeWidth="1" filter="url(#shadow)" />
        <rect x="35" y="50" width="30" height="25" rx="3" fill="url(#whiteGradient)" stroke="#666" strokeWidth="1" filter="url(#shadow)" />
        <rect x="25" y="75" width="50" height="10" rx="5" fill="url(#whiteGradient)" stroke="#666" strokeWidth="1" filter="url(#shadow)" />
        <line x1="45" y1="35" x2="55" y2="35" stroke="#666" strokeWidth="2" />
        <line x1="50" y1="30" x2="50" y2="40" stroke="#666" strokeWidth="2" />
      </svg>
    ),
    queen: (
      <svg viewBox="0 0 100 100" className="chess-piece-svg">
        <defs>
          <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f8f9fa" />
            <stop offset="100%" stopColor="#e9ecef" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
          </filter>
        </defs>
        <path d="M25 25 L30 15 L35 25 L40 10 L45 25 L50 5 L55 25 L60 10 L65 25 L70 15 L75 25 L70 35 L60 30 L50 35 L40 30 L30 35 Z" fill="url(#whiteGradient)" stroke="#666" strokeWidth="1" filter="url(#shadow)" />
        <circle cx="50" cy="45" r="10" fill="url(#whiteGradient)" stroke="#666" strokeWidth="1" filter="url(#shadow)" />
        <path d="M35 55 L65 55 L60 70 L40 70 Z" fill="url(#whiteGradient)" stroke="#666" strokeWidth="1" filter="url(#shadow)" />
        <rect x="25" y="75" width="50" height="10" rx="5" fill="url(#whiteGradient)" stroke="#666" strokeWidth="1" filter="url(#shadow)" />
        <circle cx="30" cy="20" r="2" fill="#ffd700" />
        <circle cx="50" cy="10" r="2" fill="#ffd700" />
        <circle cx="70" cy="20" r="2" fill="#ffd700" />
      </svg>
    ),
    rook: (
      <svg viewBox="0 0 100 100" className="chess-piece-svg">
        <defs>
          <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f8f9fa" />
            <stop offset="100%" stopColor="#e9ecef" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
          </filter>
        </defs>
        <rect x="30" y="15" width="40" height="15" fill="url(#whiteGradient)" stroke="#666" strokeWidth="1" filter="url(#shadow)" />
        <rect x="25" y="15" width="8" height="10" fill="url(#whiteGradient)" stroke="#666" strokeWidth="1" />
        <rect x="42" y="15" width="8" height="10" fill="url(#whiteGradient)" stroke="#666" strokeWidth="1" />
        <rect x="59" y="15" width="8" height="10" fill="url(#whiteGradient)" stroke="#666" strokeWidth="1" />
        <rect x="35" y="30" width="30" height="40" fill="url(#whiteGradient)" stroke="#666" strokeWidth="1" filter="url(#shadow)" />
        <rect x="25" y="75" width="50" height="10" rx="5" fill="url(#whiteGradient)" stroke="#666" strokeWidth="1" filter="url(#shadow)" />
      </svg>
    ),
    bishop: (
      <svg viewBox="0 0 100 100" className="chess-piece-svg">
        <defs>
          <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f8f9fa" />
            <stop offset="100%" stopColor="#e9ecef" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
          </filter>
        </defs>
        <circle cx="50" cy="20" r="8" fill="url(#whiteGradient)" stroke="#666" strokeWidth="1" filter="url(#shadow)" />
        <path d="M42 28 Q50 35 58 28 L55 65 L45 65 Z" fill="url(#whiteGradient)" stroke="#666" strokeWidth="1" filter="url(#shadow)" />
        <rect x="25" y="75" width="50" height="10" rx="5" fill="url(#whiteGradient)" stroke="#666" strokeWidth="1" filter="url(#shadow)" />
        <line x1="45" y1="15" x2="55" y2="25" stroke="#666" strokeWidth="2" />
        <circle cx="50" cy="45" r="3" fill="#666" />
      </svg>
    ),
    knight: (
      <svg viewBox="0 0 100 100" className="chess-piece-svg">
        <defs>
          <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f8f9fa" />
            <stop offset="100%" stopColor="#e9ecef" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
          </filter>
        </defs>
        <path d="M35 15 Q25 20 30 35 Q35 25 45 30 Q55 20 65 25 Q70 35 60 45 Q65 55 55 65 L45 65 Q40 55 35 45 Q30 35 35 25 Z" fill="url(#whiteGradient)" stroke="#666" strokeWidth="1" filter="url(#shadow)" />
        <rect x="25" y="75" width="50" height="10" rx="5" fill="url(#whiteGradient)" stroke="#666" strokeWidth="1" filter="url(#shadow)" />
        <circle cx="45" cy="35" r="2" fill="#333" />
        <path d="M40 40 Q45 45 50 40" stroke="#666" strokeWidth="1" fill="none" />
      </svg>
    ),
    pawn: (
      <svg viewBox="0 0 100 100" className="chess-piece-svg">
        <defs>
          <linearGradient id="whiteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="50%" stopColor="#f8f9fa" />
            <stop offset="100%" stopColor="#e9ecef" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.3)" />
          </filter>
        </defs>
        <circle cx="50" cy="30" r="12" fill="url(#whiteGradient)" stroke="#666" strokeWidth="1" filter="url(#shadow)" />
        <path d="M40 42 Q50 50 60 42 L55 65 L45 65 Z" fill="url(#whiteGradient)" stroke="#666" strokeWidth="1" filter="url(#shadow)" />
        <rect x="30" y="75" width="40" height="10" rx="5" fill="url(#whiteGradient)" stroke="#666" strokeWidth="1" filter="url(#shadow)" />
      </svg>
    )
  },
  black: {
    king: (
      <svg viewBox="0 0 100 100" className="chess-piece-svg">
        <defs>
          <linearGradient id="blackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d3748" />
            <stop offset="50%" stopColor="#1a202c" />
            <stop offset="100%" stopColor="#0f1419" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.5)" />
          </filter>
        </defs>
        <path d="M50 15 L45 25 L40 20 L35 25 L30 20 L25 25 L30 30 L35 25 L40 30 L45 25 L50 30 L55 25 L60 30 L65 25 L70 30 L75 25 L70 20 L65 25 L60 20 L55 25 L50 15 Z" fill="url(#blackGradient)" stroke="#fff" strokeWidth="1" filter="url(#shadow)" />
        <circle cx="50" cy="40" r="12" fill="url(#blackGradient)" stroke="#fff" strokeWidth="1" filter="url(#shadow)" />
        <rect x="35" y="50" width="30" height="25" rx="3" fill="url(#blackGradient)" stroke="#fff" strokeWidth="1" filter="url(#shadow)" />
        <rect x="25" y="75" width="50" height="10" rx="5" fill="url(#blackGradient)" stroke="#fff" strokeWidth="1" filter="url(#shadow)" />
        <line x1="45" y1="35" x2="55" y2="35" stroke="#fff" strokeWidth="2" />
        <line x1="50" y1="30" x2="50" y2="40" stroke="#fff" strokeWidth="2" />
      </svg>
    ),
    queen: (
      <svg viewBox="0 0 100 100" className="chess-piece-svg">
        <defs>
          <linearGradient id="blackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d3748" />
            <stop offset="50%" stopColor="#1a202c" />
            <stop offset="100%" stopColor="#0f1419" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.5)" />
          </filter>
        </defs>
        <path d="M25 25 L30 15 L35 25 L40 10 L45 25 L50 5 L55 25 L60 10 L65 25 L70 15 L75 25 L70 35 L60 30 L50 35 L40 30 L30 35 Z" fill="url(#blackGradient)" stroke="#fff" strokeWidth="1" filter="url(#shadow)" />
        <circle cx="50" cy="45" r="10" fill="url(#blackGradient)" stroke="#fff" strokeWidth="1" filter="url(#shadow)" />
        <path d="M35 55 L65 55 L60 70 L40 70 Z" fill="url(#blackGradient)" stroke="#fff" strokeWidth="1" filter="url(#shadow)" />
        <rect x="25" y="75" width="50" height="10" rx="5" fill="url(#blackGradient)" stroke="#fff" strokeWidth="1" filter="url(#shadow)" />
        <circle cx="30" cy="20" r="2" fill="#ffd700" />
        <circle cx="50" cy="10" r="2" fill="#ffd700" />
        <circle cx="70" cy="20" r="2" fill="#ffd700" />
      </svg>
    ),
    rook: (
      <svg viewBox="0 0 100 100" className="chess-piece-svg">
        <defs>
          <linearGradient id="blackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d3748" />
            <stop offset="50%" stopColor="#1a202c" />
            <stop offset="100%" stopColor="#0f1419" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.5)" />
          </filter>
        </defs>
        <rect x="30" y="15" width="40" height="15" fill="url(#blackGradient)" stroke="#fff" strokeWidth="1" filter="url(#shadow)" />
        <rect x="25" y="15" width="8" height="10" fill="url(#blackGradient)" stroke="#fff" strokeWidth="1" />
        <rect x="42" y="15" width="8" height="10" fill="url(#blackGradient)" stroke="#fff" strokeWidth="1" />
        <rect x="59" y="15" width="8" height="10" fill="url(#blackGradient)" stroke="#fff" strokeWidth="1" />
        <rect x="35" y="30" width="30" height="40" fill="url(#blackGradient)" stroke="#fff" strokeWidth="1" filter="url(#shadow)" />
        <rect x="25" y="75" width="50" height="10" rx="5" fill="url(#blackGradient)" stroke="#fff" strokeWidth="1" filter="url(#shadow)" />
      </svg>
    ),
    bishop: (
      <svg viewBox="0 0 100 100" className="chess-piece-svg">
        <defs>
          <linearGradient id="blackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d3748" />
            <stop offset="50%" stopColor="#1a202c" />
            <stop offset="100%" stopColor="#0f1419" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.5)" />
          </filter>
        </defs>
        <circle cx="50" cy="20" r="8" fill="url(#blackGradient)" stroke="#fff" strokeWidth="1" filter="url(#shadow)" />
        <path d="M42 28 Q50 35 58 28 L55 65 L45 65 Z" fill="url(#blackGradient)" stroke="#fff" strokeWidth="1" filter="url(#shadow)" />
        <rect x="25" y="75" width="50" height="10" rx="5" fill="url(#blackGradient)" stroke="#fff" strokeWidth="1" filter="url(#shadow)" />
        <line x1="45" y1="15" x2="55" y2="25" stroke="#fff" strokeWidth="2" />
        <circle cx="50" cy="45" r="3" fill="#fff" />
      </svg>
    ),
    knight: (
      <svg viewBox="0 0 100 100" className="chess-piece-svg">
        <defs>
          <linearGradient id="blackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d3748" />
            <stop offset="50%" stopColor="#1a202c" />
            <stop offset="100%" stopColor="#0f1419" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.5)" />
          </filter>
        </defs>
        <path d="M35 15 Q25 20 30 35 Q35 25 45 30 Q55 20 65 25 Q70 35 60 45 Q65 55 55 65 L45 65 Q40 55 35 45 Q30 35 35 25 Z" fill="url(#blackGradient)" stroke="#fff" strokeWidth="1" filter="url(#shadow)" />
        <rect x="25" y="75" width="50" height="10" rx="5" fill="url(#blackGradient)" stroke="#fff" strokeWidth="1" filter="url(#shadow)" />
        <circle cx="45" cy="35" r="2" fill="#fff" />
        <path d="M40 40 Q45 45 50 40" stroke="#fff" strokeWidth="1" fill="none" />
      </svg>
    ),
    pawn: (
      <svg viewBox="0 0 100 100" className="chess-piece-svg">
        <defs>
          <linearGradient id="blackGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#2d3748" />
            <stop offset="50%" stopColor="#1a202c" />
            <stop offset="100%" stopColor="#0f1419" />
          </linearGradient>
          <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="2" dy="2" stdDeviation="2" floodColor="rgba(0,0,0,0.5)" />
          </filter>
        </defs>
        <circle cx="50" cy="30" r="12" fill="url(#blackGradient)" stroke="#fff" strokeWidth="1" filter="url(#shadow)" />
        <path d="M40 42 Q50 50 60 42 L55 65 L45 65 Z" fill="url(#blackGradient)" stroke="#fff" strokeWidth="1" filter="url(#shadow)" />
        <rect x="30" y="75" width="40" height="10" rx="5" fill="url(#blackGradient)" stroke="#fff" strokeWidth="1" filter="url(#shadow)" />
      </svg>
    )
  }
};

// Initial chess board setup
const initialBoard = [
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
const initialColors = [
  ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black'],
  ['black', 'black', 'black', 'black', 'black', 'black', 'black', 'black'],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null, null],
  ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white'],
  ['white', 'white', 'white', 'white', 'white', 'white', 'white', 'white']
];

const Chess = () => {
  const [board, setBoard] = useState(initialBoard);
  const [pieceColors, setPieceColors] = useState(initialColors);
  const [currentPlayer, setCurrentPlayer] = useState('white');
  const [selectedSquare, setSelectedSquare] = useState(null);
  const [validMoves, setValidMoves] = useState([]);
  const [lastMove, setLastMove] = useState(null);
  const [capturedPieces, setCapturedPieces] = useState({ white: [], black: [] });
  const [gameStatus, setGameStatus] = useState('active');
  const [draggedPiece, setDraggedPiece] = useState(null);
  const [enPassantTarget, setEnPassantTarget] = useState(null); // {row, col} of square where en passant capture can happen
  const [touchStartPos, setTouchStartPos] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                           (window.innerWidth <= 768) ||
                           ('ontouchstart' in window);
      setIsMobile(isMobileDevice);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Touch handlers for better mobile experience
  const handleTouchStart = (e, row, col) => {
    if (gameStatus.startsWith('checkmate') || gameStatus === 'stalemate') return;
    
    const touch = e.touches[0];
    setTouchStartPos({ x: touch.clientX, y: touch.clientY, row, col });
    
    // Prevent default to avoid scrolling
    e.preventDefault();
  };

  const handleTouchMove = (e) => {
    // Prevent scrolling while dragging pieces
    if (touchStartPos) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e, row, col) => {
    if (!touchStartPos) return;
    
    const touch = e.changedTouches[0];
    const deltaX = Math.abs(touch.clientX - touchStartPos.x);
    const deltaY = Math.abs(touch.clientY - touchStartPos.y);
    
    // If it's a small movement, treat as a tap
    if (deltaX < 15 && deltaY < 15) {
      handleSquareClick(touchStartPos.row, touchStartPos.col);
    } else {
      // Handle drag-like behavior - find the square under the final touch position
      const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
      if (elementBelow) {
        const square = elementBelow.closest('[data-row][data-col]');
        if (square) {
          const targetRow = parseInt(square.dataset.row);
          const targetCol = parseInt(square.dataset.col);
          
          // If we have a selected piece and this is a valid move, make the move
          if (selectedSquare && (selectedSquare.row !== touchStartPos.row || selectedSquare.col !== touchStartPos.col)) {
            const targetMove = validMoves.find(move => move.row === targetRow && move.col === targetCol);
            if (targetMove) {
              makeMove(selectedSquare.row, selectedSquare.col, targetRow, targetCol, targetMove.isEnPassant);
            }
          } else {
            // First select the piece we started dragging from
            if (board[touchStartPos.row][touchStartPos.col] && pieceColors[touchStartPos.row][touchStartPos.col] === currentPlayer) {
              setSelectedSquare({ row: touchStartPos.row, col: touchStartPos.col });
              setValidMoves(getPossibleMoves(touchStartPos.row, touchStartPos.col));
              
              // Then try to move to the target if it's a valid move
              const moves = getPossibleMoves(touchStartPos.row, touchStartPos.col);
              const targetMove = moves.find(move => move.row === targetRow && move.col === targetCol);
              if (targetMove) {
                makeMove(touchStartPos.row, touchStartPos.col, targetRow, targetCol, targetMove.isEnPassant);
              }
            }
          }
        }
      }
    }
    
    setTouchStartPos(null);
    e.preventDefault();
  };

  // Check if a square is under attack by the opponent
  const isSquareUnderAttack = useCallback((row, col, color, testBoard = board, testColors = pieceColors) => {
    const opponentColor = color === 'white' ? 'black' : 'white';
    
    for (let r = 0; r < 8; r++) {
      for (let c = 0; c < 8; c++) {
        if (testColors[r][c] === opponentColor && testBoard[r][c]) {
          const moves = getPossibleMoves(r, c, testBoard, testColors, false);
          if (moves.some(move => move.row === row && move.col === col)) {
            return true;
          }
        }
      }
    }
    return false;
  }, [board, pieceColors]);

  // Get possible moves for a piece
  const getPossibleMoves = useCallback((row, col, testBoard = board, testColors = pieceColors, checkForCheck = true) => {
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
        
        return !isSquareUnderAttack(kingRow, kingCol, color, newBoard, newColors);
      });
    }

    return moves;
  }, [board, pieceColors, isSquareUnderAttack, enPassantTarget]);

  // Check if the current player is in check
  const isInCheck = useCallback((color) => {
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
    return isSquareUnderAttack(kingRow, kingCol, color);
  }, [board, pieceColors, isSquareUnderAttack]);

  // Check for checkmate or stalemate
  const checkGameStatus = useCallback(() => {
    const hasValidMoves = () => {
      for (let r = 0; r < 8; r++) {
        for (let c = 0; c < 8; c++) {
          if (pieceColors[r][c] === currentPlayer && board[r][c]) {
            const moves = getPossibleMoves(r, c);
            if (moves.length > 0) return true;
          }
        }
      }
      return false;
    };

    const inCheck = isInCheck(currentPlayer);
    const hasValidMovesLeft = hasValidMoves();

    if (!hasValidMovesLeft) {
      if (inCheck) {
        setGameStatus(`checkmate-${currentPlayer === 'white' ? 'black' : 'white'}`);
      } else {
        setGameStatus('stalemate');
      }
    } else if (inCheck) {
      setGameStatus(`check-${currentPlayer}`);
    } else {
      setGameStatus('active');
    }
  }, [currentPlayer, board, pieceColors, isInCheck, getPossibleMoves]);

  useEffect(() => {
    checkGameStatus();
  }, [checkGameStatus]);

  const handleSquareClick = (row, col) => {
    if (gameStatus.startsWith('checkmate') || gameStatus === 'stalemate') return;

    if (selectedSquare && selectedSquare.row === row && selectedSquare.col === col) {
      // Deselect if clicking the same square
      setSelectedSquare(null);
      setValidMoves([]);
      return;
    }

    if (selectedSquare) {
      // Try to make a move
      const targetMove = validMoves.find(move => move.row === row && move.col === col);
      if (targetMove) {
        makeMove(selectedSquare.row, selectedSquare.col, row, col, targetMove.isEnPassant);
      } else if (pieceColors[row][col] === currentPlayer) {
        // Select a different piece of the same color
        setSelectedSquare({ row, col });
        setValidMoves(getPossibleMoves(row, col));
      } else {
        // Invalid move, deselect
        setSelectedSquare(null);
        setValidMoves([]);
      }
    } else {
      // Select a piece
      if (board[row][col] && pieceColors[row][col] === currentPlayer) {
        setSelectedSquare({ row, col });
        setValidMoves(getPossibleMoves(row, col));
      }
    }
  };

  const makeMove = (fromRow, fromCol, toRow, toCol, isEnPassant = false) => {
    const newBoard = board.map(row => [...row]);
    const newColors = pieceColors.map(row => [...row]);
    
    // Handle en passant capture
    if (isEnPassant) {
      // Capture the pawn that was passed
      const capturedPawnRow = fromRow; // The pawn being captured is on the same row as the attacking pawn
      const capturedPawnCol = toCol;
      setCapturedPieces(prev => ({
        ...prev,
        [currentPlayer]: [...prev[currentPlayer], { piece: newBoard[capturedPawnRow][capturedPawnCol], color: newColors[capturedPawnRow][capturedPawnCol] }]
      }));
      // Remove the captured pawn
      newBoard[capturedPawnRow][capturedPawnCol] = null;
      newColors[capturedPawnRow][capturedPawnCol] = null;
    }
    // Capture piece if present (normal capture)
    else if (newBoard[toRow][toCol]) {
      setCapturedPieces(prev => ({
        ...prev,
        [currentPlayer]: [...prev[currentPlayer], { piece: newBoard[toRow][toCol], color: newColors[toRow][toCol] }]
      }));
    }
    
    // Move the piece
    const movingPiece = newBoard[fromRow][fromCol];
    newBoard[toRow][toCol] = movingPiece;
    newColors[toRow][toCol] = newColors[fromRow][fromCol];
    newBoard[fromRow][fromCol] = null;
    newColors[fromRow][fromCol] = null;
    
    // Set en passant target if a pawn moved two squares
    let newEnPassantTarget = null;
    if (movingPiece === 'pawn' && Math.abs(toRow - fromRow) === 2) {
      // The en passant target square is behind the pawn that just moved two squares
      newEnPassantTarget = { row: fromRow + (toRow - fromRow) / 2, col: fromCol };
    }
    
    setBoard(newBoard);
    setPieceColors(newColors);
    setEnPassantTarget(newEnPassantTarget);
    setLastMove({ from: { row: fromRow, col: fromCol }, to: { row: toRow, col: toCol } });
    setSelectedSquare(null);
    setValidMoves([]);
    setCurrentPlayer(currentPlayer === 'white' ? 'black' : 'white');
  };

  const handleDragStart = (e, row, col) => {
    if (pieceColors[row][col] !== currentPlayer) {
      e.preventDefault();
      return;
    }
    setDraggedPiece({ row, col });
    setSelectedSquare({ row, col });
    setValidMoves(getPossibleMoves(row, col));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e, row, col) => {
    e.preventDefault();
    if (draggedPiece) {
      const targetMove = validMoves.find(move => move.row === row && move.col === col);
      if (targetMove) {
        makeMove(draggedPiece.row, draggedPiece.col, row, col, targetMove.isEnPassant);
      }
      setDraggedPiece(null);
      setSelectedSquare(null);
      setValidMoves([]);
    }
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setPieceColors(initialColors);
    setCurrentPlayer('white');
    setSelectedSquare(null);
    setValidMoves([]);
    setLastMove(null);
    setCapturedPieces({ white: [], black: [] });
    setGameStatus('active');
    setDraggedPiece(null);
    setEnPassantTarget(null);
  };

  const getSquareClass = (row, col) => {
    let classes = ['square'];
    
    // Board pattern
    if ((row + col) % 2 === 0) {
      classes.push('light');
    } else {
      classes.push('dark');
    }
    
    // Highlight selected square
    if (selectedSquare && selectedSquare.row === row && selectedSquare.col === col) {
      classes.push('selected');
    }
    
    // Highlight valid moves
    if (validMoves.some(move => move.row === row && move.col === col)) {
      classes.push('valid-move');
    }
    
    // Highlight last move
    if (lastMove && 
        ((lastMove.from.row === row && lastMove.from.col === col) ||
         (lastMove.to.row === row && lastMove.to.col === col))) {
      classes.push('last-move');
    }
    
    return classes.join(' ');
  };

  const getGameStatusMessage = () => {
    switch (gameStatus) {
      case 'check-white':
        return 'White is in check!';
      case 'check-black':
        return 'Black is in check!';
      case 'checkmate-white':
        return 'Checkmate! White wins!';
      case 'checkmate-black':
        return 'Checkmate! Black wins!';
      case 'stalemate':
        return 'Stalemate! It\'s a draw!';
      default:
        return `${currentPlayer.charAt(0).toUpperCase() + currentPlayer.slice(1)}'s turn`;
    }
  };

  return (
    <div className="chess-container">
      <div className="game-header">
        <h1>♔ Fancy Chess ♛</h1>
        <div className="game-status">
          <div className={`status-message ${gameStatus}`}>
            {getGameStatusMessage()}
          </div>
          <button className="reset-button" onClick={resetGame}>
            New Game
          </button>
        </div>
      </div>
      
      <div className="game-board-container">
        <div className="captured-pieces left">
          <h3>Captured by White</h3>
          <div className="pieces">
            {capturedPieces.white.map((piece, index) => (
              <span key={index} className="captured-piece">
                {PIECES[piece.color][piece.piece]}
              </span>
            ))}
          </div>
        </div>
        
        <div className="chess-board">
          <div className="board-coordinates">
            {[8, 7, 6, 5, 4, 3, 2, 1].map(num => (
              <div key={num} className="rank-label">{num}</div>
            ))}
          </div>
          <div className="board-grid">
            {board.map((row, rowIndex) =>
              row.map((piece, colIndex) => (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className={getSquareClass(rowIndex, colIndex)}
                  data-row={rowIndex}
                  data-col={colIndex}
                  onClick={() => handleSquareClick(rowIndex, colIndex)}
                  onDragOver={!isMobile ? handleDragOver : undefined}
                  onDrop={!isMobile ? (e) => handleDrop(e, rowIndex, colIndex) : undefined}
                  onTouchStart={isMobile ? (e) => handleTouchStart(e, rowIndex, colIndex) : undefined}
                  onTouchMove={isMobile ? handleTouchMove : undefined}
                  onTouchEnd={isMobile ? (e) => handleTouchEnd(e, rowIndex, colIndex) : undefined}
                >
                  {piece && (
                    <div
                      className="piece"
                      draggable={!isMobile}
                      onDragStart={!isMobile ? (e) => handleDragStart(e, rowIndex, colIndex) : undefined}
                      onTouchStart={isMobile ? (e) => e.stopPropagation() : undefined}
                    >
                      {PIECES[pieceColors[rowIndex][colIndex]][piece]}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
          <div className="file-labels">
            {['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'].map(letter => (
              <div key={letter} className="file-label">{letter}</div>
            ))}
          </div>
        </div>
        
        <div className="captured-pieces right">
          <h3>Captured by Black</h3>
          <div className="pieces">
            {capturedPieces.black.map((piece, index) => (
              <span key={index} className="captured-piece">
                {PIECES[piece.color][piece.piece]}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chess;