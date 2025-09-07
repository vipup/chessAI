# ChessAI

A browser-based chess game: Human vs Computer. This project implements standard chess rules and provides a simple interface for playing chess against a basic AI.

## Features
- Full chessboard with piece movement
- Human (White) vs Computer (Black)
- Complete move validation according to chess rules
- Comprehensive game end detection (checkmate, stalemate, draws)
- Move history panel with standard chess notation
- Undo move functionality
- Visual highlighting of valid moves

## Chess Rules Implemented

### 1. Board Setup
- 8x8 grid with alternating colors
- Each player starts with 16 pieces: 1 King, 1 Queen, 2 Rooks, 2 Bishops, 2 Knights, 8 Pawns
- White pieces on ranks 1-2, Black pieces on ranks 7-8

### 2. Piece Movement
- **Pawn**: Moves forward one square; two squares from starting position; captures diagonally
- **Knight**: Moves in L-shape (2 squares in one direction, then 1 perpendicular); can jump over pieces
- **Bishop**: Moves diagonally any number of squares
- **Rook**: Moves horizontally or vertically any number of squares
- **Queen**: Combines rook and bishop movement
- **King**: Moves one square in any direction

### 3. Special Rules
- **Check**: King is in check if attacked by an opponent's piece
- **Checkmate**: King is in check and cannot escape; game ends
- **Stalemate**: Game ends in a draw when a player has no legal moves but is not in check
- **Castling**: Fully implemented with all restrictions (king/rook not moved, path clear, not through check)
- **Draw Conditions**: 
  - Threefold repetition
  - 50-move rule
  - Insufficient material
- **Move History**: Standard chess notation with check (+) and checkmate (#) symbols

### 4. Game Endings
The game can end in several ways:
1. **Checkmate**: One player wins by checkmating the opponent
2. **Stalemate**: Draw when a player has no legal moves but is not in check
3. **Draw by repetition**: Same position occurs three times
4. **Draw by 50-move rule**: No pawn moves or captures in 50 moves by each player
5. **Draw by insufficient material**: Not enough pieces to force checkmate

### 5. Move History Panel
- Shows all moves in standard chess notation
- Includes move numbers
- Special symbols for:
  - Check (+)
  - Checkmate (#)
  - Draws (½-½)
  - Castling (O-O for kingside, O-O-O for queenside)
  - Captures (x)

## How to Run

1. Clone or download this repository
2. Open `index.html` in your web browser
3. Play as White against the computer (Black)
4. Use "New Game" to reset and "Undo Move" to revert the last move

## How to Play
- Click on a white piece to select it
- Valid moves are highlighted in green
- Click a highlighted square to move
- The computer will respond automatically
- The status bar shows:
  - Current turn
  - Check/checkmate status
  - Draw announcements
- Move history panel shows:
  - All moves in standard chess notation
  - Move numbers (1. e4 e5 2. Nf3...)
  - Special symbols for check (+), checkmate (#), and draws (½-½)
- Game ends automatically on:
  - Checkmate (victory)
  - Stalemate (draw)
  - Threefold repetition (draw)
  - 50-move rule (draw)
  - Insufficient material (draw)
- Use "Undo Move" to take back the last move pair (your move and computer's response)
- Use "New Game" to start a fresh game

## Project Structure
- `index.html`: Main HTML and JavaScript for the chess game
- `README.md`: This documentation

## Contributing
Pull requests and suggestions are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License
MIT

## Chess Rules Coverage

| Rule/Feature           | Implemented | Notes |
|------------------------|:-----------:|-------|
| Board setup            |     ✅      | Standard 8x8, correct piece placement |
| Piece movement         |     ✅      | All basic moves for each piece |
| Turn order             |     ✅      | White moves first, alternates |
| Move validation        |     ✅      | Prevents illegal moves for both players |
| Check detection        |     ✅      | King in check is detected and shown (+) |
| Checkmate detection    |     ✅      | Game ends on checkmate, shown with (#) |
| Stalemate             |     ✅      | Detected and ends in draw |
| Threefold repetition  |     ✅      | Position tracking and draw detection |
| 50-move rule          |     ✅      | Tracks moves without captures/pawns |
| Insufficient material |     ✅      | Detects basic drawn positions |
| Castling              |     ✅      | Full rules including "through check" |
| En passant            |     ❌      | Not implemented |
| Pawn promotion        |     ❌      | Not implemented |
| Move notation         |     ✅      | Standard algebraic notation (SAN) |
| Move history          |     ✅      | Full panel with move numbers |
| Time controls         |     ❌      | Not implemented |
| Resignation           |     ❌      | Not implemented |
| Draw offer            |     ❌      | Not implemented |
| Undo move             |     ✅      | Full state restoration including castling |
| AI opponent           |     ✅      | Computer plays Black, basic evaluation |
| Visual highlights     |     ✅      | Valid moves and selected pieces shown |
| Game state alerts     |     ✅      | Announces check, mate, and draws |

**Legend:**
- ✅ = Implemented
- ❌ = Not implemented
