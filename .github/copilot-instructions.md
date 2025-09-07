# AI Agent Instructions for ChessAI Codebase

## Project Overview
This is a browser-based chess implementation focusing on correct rule enforcement and AI gameplay. The entire application is contained in a single `index.html` file using vanilla JavaScript, making it highly portable but requiring careful state management.

## Key Architecture Patterns

### State Management
- Game state is managed through global variables at the top level:
  ```javascript
  let board = Array(8).fill().map(() => Array(8).fill(null));
  let currentPlayer = 'white';
  let gameHistory = [];
  let movesList = [];
  let castlingRights = { white: {...}, black: {...} };
  ```
- Position history and move counting for draw detection:
  ```javascript
  let positionHistory = [];
  let movesWithoutCaptureOrPawn = 0;
  ```

### Core Components

1. **Move Validation System**
- Two-phase validation:
  1. Piece-specific moves (`getValidMoves`)
  2. King safety check (prevents/detects check)
- Example pattern for move validation:
  ```javascript
  const moves = getValidMoves(row, col).filter(move => {
    // Test move for king safety
    const originalPiece = board[move.row][move.col];
    board[move.row][move.col] = board[row][col];
    board[row][col] = null;
    const inCheck = isKingInCheck(color);
    // Undo test move
    board[row][col] = board[move.row][move.col];
    board[move.row][move.col] = originalPiece;
    return !inCheck;
  });
  ```

2. **Game State Detection**
- Check/checkmate detection requires testing all possible moves
- Draw conditions check three scenarios:
  - Position repetition
  - 50-move rule
  - Insufficient material

3. **Move History and Notation**
- Standard Algebraic Notation (SAN) is used
- Special symbols: +, #, ½-½, O-O, O-O-O
- Moves panel updates after each move

## Development Workflows

### Testing
- Built-in test suite runs on page load
- Tests cover:
  ```javascript
  // Example test pattern
  assert(condition, "Test description");
  ```
- Key test areas:
  - Board setup
  - Piece movements
  - Special rules (castling, etc.)
  - Game endings

### Debugging Tips
- Use browser dev tools to:
  1. Monitor game state variables
  2. Set breakpoints in move validation
  3. Watch position history for draw detection

## Project-Specific Conventions

### Move Implementation Pattern
```javascript
function makeMove(fromRow, fromCol, toRow, toCol) {
  // 1. Validate move legality
  // 2. Record state for undo
  // 3. Update board
  // 4. Check game ending conditions
  // 5. Update UI
}
```

### State Updates
- Always update both board and UI state
- Use `renderBoard()` after any board changes
- Update move history and draw detection state together

## Common Tasks

### Adding New Chess Rules
1. Implement move generation in `getValidMoves`
2. Add validation in `makeMove`
3. Update UI feedback if needed
4. Add tests in the test suite

### Modifying AI Behavior
- AI logic is in `makeComputerMove` and `evaluateMove`
- Position evaluation uses piece values and basic positional factors

## Integration Points
- Browser integration via DOM events
- No external dependencies
- All state is in-memory

Remember: The single-file architecture means changes can have wide-ranging effects - careful state management is crucial.
