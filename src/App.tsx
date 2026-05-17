import { useEffect, useState } from "react";

type Piece = {
  type: PieceType;
  player: Player;
  promoted: boolean;
};
type Player = "先手" | "後手";

type PieceType =
  | "PAWN"
  | "LANCE"
  | "KNIGHT"
  | "SILVER"
  | "GOLD"
  | "ROOK"
  | "BISHOP"
  | "KING";

type Selected =
  | { type: "board"; row: number; col: number }
  | { type: "hand"; player: Player; index: number }
  | null;

type Cell = { type: "empty" } | { type: "piece"; piece: Piece };

const pieceLabels: Record<PieceType, string> = {
  PAWN: "歩",
  LANCE: "香",
  KNIGHT: "桂",
  SILVER: "銀",
  GOLD: "金",
  ROOK: "飛",
  BISHOP: "角",
  KING: "玉",
};
const promotedPieceLabels: Record<PieceType, string> = {
  ROOK: "龍",
  BISHOP: "馬",
  PAWN: "と",
  LANCE: "成香",
  KNIGHT: "成桂",
  SILVER: "成銀",
  GOLD: "金",
  KING: "玉",
};

function App() {
  const [board, setBoard] = useState<Cell[][]>(
    Array.from({ length: 9 }).map((_, row) =>
      Array.from({ length: 9 }).map((_, col) => {
        if (row === 6) {
          return {
            type: "piece",
            piece: { type: "PAWN", player: "先手", promoted: false },
          };
        } else if (row === 2) {
          return {
            type: "piece",
            piece: { type: "PAWN", player: "後手", promoted: false },
          };
        } else if (row === 7 && col === 7) {
          return {
            type: "piece",
            piece: { type: "ROOK", player: "先手", promoted: false },
          };
        } else if (row === 1 && col === 1) {
          return {
            type: "piece",
            piece: { type: "ROOK", player: "後手", promoted: false },
          };
        } else if (row === 7 && col === 1) {
          return {
            type: "piece",
            piece: { type: "BISHOP", player: "先手", promoted: false },
          };
        } else if (row === 1 && col === 7) {
          return {
            type: "piece",
            piece: { type: "BISHOP", player: "後手", promoted: false },
          };
        } else if (row === 8 && col === 0) {
          return {
            type: "piece",
            piece: { type: "LANCE", player: "先手", promoted: false },
          };
        } else if (row === 8 && col === 8) {
          return {
            type: "piece",
            piece: { type: "LANCE", player: "先手", promoted: false },
          };
        } else if (row === 0 && col === 8) {
          return {
            type: "piece",
            piece: { type: "LANCE", player: "後手", promoted: false },
          };
        } else if (row === 0 && col === 0) {
          return {
            type: "piece",
            piece: { type: "LANCE", player: "後手", promoted: false },
          };
        } else if (row === 8 && col === 1) {
          return {
            type: "piece",
            piece: { type: "KNIGHT", player: "先手", promoted: false },
          };
        } else if (row === 8 && col === 7) {
          return {
            type: "piece",
            piece: { type: "KNIGHT", player: "先手", promoted: false },
          };
        } else if (row === 0 && col === 7) {
          return {
            type: "piece",
            piece: { type: "KNIGHT", player: "後手", promoted: false },
          };
        } else if (row === 0 && col === 1) {
          return {
            type: "piece",
            piece: { type: "KNIGHT", player: "後手", promoted: false },
          };
        } else if (row === 8 && col === 2) {
          return {
            type: "piece",
            piece: { type: "SILVER", player: "先手", promoted: false },
          };
        } else if (row === 8 && col === 6) {
          return {
            type: "piece",
            piece: { type: "SILVER", player: "先手", promoted: false },
          };
        } else if (row === 0 && col === 6) {
          return {
            type: "piece",
            piece: { type: "SILVER", player: "後手", promoted: false },
          };
        } else if (row === 0 && col === 2) {
          return {
            type: "piece",
            piece: { type: "SILVER", player: "後手", promoted: false },
          };
        } else if (row === 8 && col === 3) {
          return {
            type: "piece",
            piece: { type: "GOLD", player: "先手", promoted: false },
          };
        } else if (row === 8 && col === 5) {
          return {
            type: "piece",
            piece: { type: "GOLD", player: "先手", promoted: false },
          };
        } else if (row === 0 && col === 5) {
          return {
            type: "piece",
            piece: { type: "GOLD", player: "後手", promoted: false },
          };
        } else if (row === 0 && col === 3) {
          return {
            type: "piece",
            piece: { type: "GOLD", player: "後手", promoted: false },
          };
        } else if (row === 8 && col === 4) {
          return {
            type: "piece",
            piece: { type: "KING", player: "先手", promoted: false },
          };
        } else if (row === 0 && col === 4) {
          return {
            type: "piece",
            piece: { type: "KING", player: "後手", promoted: false },
          };
        } else {
          return { type: "empty" };
        }
      }),
    ),
  );

  const [selected, setSelected] = useState<Selected>(null);
  useEffect(() => {
    console.log("selected変わった:", selected);
  }, [selected]);
  // const [selectedRow, setSelectedRow] = useState<number | null>(null);
  // const [selectedCol, setSelectedCol] = useState<number | null>(null);

  const [hands, setHands] = useState<Record<Player, PieceType[]>>({
    先手: [],
    後手: [],
  });
  useEffect(() => {
    console.log("hands変わった:", hands);
  }, [hands]);

  // const [selectedHandIndex, setSelectedHandIndex] = useState<number | null>(
  //   null,
  // );

  const [currentPlayer, setCurrentPlayer] = useState<Player>("先手");

  const [debugMode, setDebugMode] = useState(true);

  function canMove(
    piece: Piece,
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number,
  ): boolean {
    // 行き先に自分の駒がある場合は移動できない
    const target = board[toRow][toCol];
    if (target.type === "piece" && target.piece.player === piece.player) {
      return false;
    }

    // いまいるマスへは移動できない
    if (toRow === fromRow && toCol === fromCol) {
      return false;
    }

    if (piece.promoted) {
      if (piece.type === "ROOK") {
        // 飛車成は飛車の動きもできる
        return (
          canMove(
            { ...piece, promoted: false },
            fromRow,
            fromCol,
            toRow,
            toCol,
          ) ||
          (toRow === fromRow - 1 && toCol === fromCol - 1) ||
          (toRow === fromRow - 1 && toCol === fromCol + 1) ||
          (toRow === fromRow && toCol === fromCol - 1) ||
          (toRow === fromRow && toCol === fromCol + 1)
        );
      } else if (piece.type === "BISHOP") {
        return (
          canMove(
            { ...piece, promoted: false },
            fromRow,
            fromCol,
            toRow,
            toCol,
          ) ||
          (toRow === fromRow - 1 && toCol === fromCol) ||
          (toRow === fromRow + 1 && toCol === fromCol) ||
          (toRow === fromRow && toCol === fromCol - 1) ||
          (toRow === fromRow && toCol === fromCol + 1)
        );
      } else {
        // その他の成り駒は金と同じ動き
        return canMove(
          { type: "GOLD", player: piece.player, promoted: false },
          fromRow,
          fromCol,
          toRow,
          toCol,
        );
      }
    }

    if (piece.type === "PAWN") {
      // 歩は前に1マスだけ動ける
      return piece.player === "先手"
        ? toRow === fromRow - 1 && toCol === fromCol
        : toRow === fromRow + 1 && toCol === fromCol;
    } else if (piece.type === "ROOK") {
      // 飛は縦か横かにしか動けない
      if (toRow !== fromRow && toCol !== fromCol) {
        return false;
      }

      if (toRow === fromRow) {
        // 横に動く場合、途中に駒がないかチェック
        const step = toCol > fromCol ? 1 : -1;
        for (let col = fromCol + step; col !== toCol; col += step) {
          if (board[fromRow][col].type === "piece") {
            return false; // 障害物がある
          }
        }
        return true;
      } else {
        // 縦に動く場合、途中に駒がないかチェック
        const step = toRow > fromRow ? 1 : -1;
        for (let row = fromRow + step; row !== toRow; row += step) {
          if (board[row][fromCol].type === "piece") {
            return false; // 障害物がある
          }
        }
        return true;
      }
    } else if (piece.type === "BISHOP") {
      // 角は斜めにしか動けない
      if (Math.abs(toRow - fromRow) !== Math.abs(toCol - fromCol)) {
        return false;
      }

      const rowStep = toRow > fromRow ? 1 : -1;
      const colStep = toCol > fromCol ? 1 : -1;
      for (
        let row = fromRow + rowStep, col = fromCol + colStep;
        row !== toRow && col !== toCol;
        row += rowStep, col += colStep
      ) {
        if (board[row][col].type === "piece") {
          return false; // 障害物がある
        }
      }
      return true;
    } else if (piece.type === "LANCE") {
      // 香は前に何マスでも動ける
      if (toCol !== fromCol) {
        return false;
      }
      const step = piece.player === "先手" ? -1 : 1;
      for (let row = fromRow + step; row !== toRow; row += step) {
        if (board[row][fromCol].type === "piece") {
          return false; // 障害物がある
        }
      }
      return true;
    } else if (piece.type === "KNIGHT") {
      // 桂は前に2マス、左右に1マス動ける
      if (piece.player === "先手") {
        return (
          (toRow === fromRow - 2 && toCol === fromCol - 1) ||
          (toRow === fromRow - 2 && toCol === fromCol + 1)
        );
      } else {
        return (
          (toRow === fromRow + 2 && toCol === fromCol - 1) ||
          (toRow === fromRow + 2 && toCol === fromCol + 1)
        );
      }
    } else if (piece.type === "SILVER") {
      // 銀は前方の3マスと斜め後ろの2マスに動ける
      if (piece.player === "先手") {
        return (
          (toRow === fromRow - 1 && toCol === fromCol) ||
          (toRow === fromRow - 1 && toCol === fromCol - 1) ||
          (toRow === fromRow - 1 && toCol === fromCol + 1) ||
          (toRow === fromRow + 1 && toCol === fromCol - 1) ||
          (toRow === fromRow + 1 && toCol === fromCol + 1)
        );
      } else {
        return (
          (toRow === fromRow + 1 && toCol === fromCol) ||
          (toRow === fromRow + 1 && toCol === fromCol - 1) ||
          (toRow === fromRow + 1 && toCol === fromCol + 1) ||
          (toRow === fromRow - 1 && toCol === fromCol - 1) ||
          (toRow === fromRow - 1 && toCol === fromCol + 1)
        );
      }
    } else if (piece.type === "GOLD") {
      // 金は前方の3マスと左右の2マス、真後ろの1マスに動ける
      if (piece.player === "先手") {
        return (
          (toRow === fromRow - 1 && toCol === fromCol) ||
          (toRow === fromRow - 1 && toCol === fromCol - 1) ||
          (toRow === fromRow - 1 && toCol === fromCol + 1) ||
          (toRow === fromRow && toCol === fromCol - 1) ||
          (toRow === fromRow && toCol === fromCol + 1) ||
          (toRow === fromRow + 1 && toCol === fromCol)
        );
      } else {
        return (
          (toRow === fromRow + 1 && toCol === fromCol) ||
          (toRow === fromRow + 1 && toCol === fromCol - 1) ||
          (toRow === fromRow + 1 && toCol === fromCol + 1) ||
          (toRow === fromRow && toCol === fromCol - 1) ||
          (toRow === fromRow && toCol === fromCol + 1) ||
          (toRow === fromRow - 1 && toCol === fromCol)
        );
      }
    } else if (piece.type === "KING") {
      // 玉は周囲8マスに動ける
      return Math.abs(toRow - fromRow) <= 1 && Math.abs(toCol - fromCol) <= 1;
    }
    return false;
  }

  function canDrop(selected: Selected, toRow: number, toCol: number) {
    return board[toRow][toCol].type !== "piece";
  }

  function canPromote(
    piece: Piece,
    fromRow: number,
    fromCol: number,
    toRow: number,
    toCol: number,
  ) {
    return piece.player === "先手"
      ? (fromRow <= 2 || toRow <= 2) &&
          ["PAWN", "LANCE", "KNIGHT", "SILVER", "ROOK", "BISHOP"].includes(
            piece.type,
          )
      : (fromRow >= 6 || toRow >= 6) &&
          ["PAWN", "LANCE", "KNIGHT", "SILVER", "ROOK", "BISHOP"].includes(
            piece.type,
          );
  }

  function promote(piece: Piece): Piece {
    if (piece.type === "PAWN") {
      return { ...piece, promoted: true };
    } else if (piece.type === "LANCE") {
      return { ...piece, promoted: true };
    } else if (piece.type === "KNIGHT") {
      return { ...piece, promoted: true };
    } else if (piece.type === "SILVER") {
      return { ...piece, promoted: true };
    } else if (piece.type === "ROOK") {
      return { ...piece, promoted: true };
    } else if (piece.type === "BISHOP") {
      return { ...piece, promoted: true };
    }
    return piece;
  }
  function getPieceLabel(piece: Piece | null): string {
    if (piece === null) {
      return "";
    }
    if (piece.promoted) {
      return promotedPieceLabels[piece.type];
    }
    return pieceLabels[piece.type];
  }
  return (
    <div>
      <div>
        <button onClick={() => setDebugMode(!debugMode)}>
          デバッグ切替：{debugMode ? "ON" : "OFF"}
        </button>
      </div>
      <h3>後手</h3>
      <div>
        持ち駒:
        {hands["後手"].map((pieceType, index) => {
          const isSelected =
            selected?.type === "hand" &&
            selected.player === "後手" &&
            selected.index === index;
          return (
            <span
              key={index}
              style={{
                marginRight: "8px",
                backgroundColor: isSelected ? "yellow" : "white",
              }}
              onClick={() => {
                if (debugMode || currentPlayer === "後手") {
                  setSelected({ type: "hand", player: "後手", index });
                }
              }}
            >
              {pieceLabels[pieceType]}
            </span>
          );
        })}
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(9, 50px)",
          gridTemplateRows: "repeat(9, 50px)",
          gap: "1px",
        }}
      >
        {board.map((row, irow) =>
          row.map((cell, icol) => {
            const isSelected =
              selected?.type === "board" &&
              selected.row === irow &&
              selected.col === icol;
            const isMovable = (() => {
              if (!selected) return false;

              if (selected.type === "board") {
                const fromCell = board[selected.row][selected.col];
                if (fromCell.type !== "piece") return false;
                return canMove(
                  fromCell.piece,
                  selected.row,
                  selected.col,
                  irow,
                  icol,
                );
              } else if (selected && selected.type === "hand") {
                return canDrop(selected, irow, icol);
              } else {
                return false;
              }
            })();
            // selected && selected?.type === "board"
            //   ? canMove(
            //       board[selected.row][selected.col],
            //       selected.row,
            //       selected.col,
            //       irow,
            //       icol,
            //     )
            //   : selected?.type === "hand"
            //     ? canDrop(selected, irow, icol)
            //     : false;

            const isPromotable = (() => {
              if (!selected) return false;

              if (selected.type === "board") {
                const fromCell = board[selected.row][selected.col];

                if (fromCell.type === "piece") {
                  return canPromote(
                    fromCell.piece,
                    selected.row,
                    selected.col,
                    irow,
                    icol,
                  );
                }
              }
            })();

            return (
              <div
                key={`${irow}-${icol}`}
                onClick={() => {
                  // 同じマスなら選択解除
                  if (isSelected) {
                    setSelected(null);
                    return;
                  }

                  // 持ち駒を打つ
                  if (selected?.type === "hand" && isMovable) {
                    const newBoard = board.map((row) => [...row]);
                    newBoard[irow][icol] = {
                      type: "piece",
                      piece: {
                        type: hands[selected.player][selected.index],
                        player: selected.player,
                        promoted: false,
                      },
                    };
                    setBoard(newBoard);
                    setSelected(null);

                    const newHands = {
                      ...hands,
                      [selected.player]: hands[selected.player].filter(
                        (_, i) => i !== selected.index,
                      ),
                    };
                    setHands(newHands);

                    setCurrentPlayer(
                      currentPlayer === "先手" ? "後手" : "先手",
                    );
                    return;
                  }

                  // 移動可能なマスをクリックしたら駒を移動する
                  if (selected?.type === "board" && isMovable) {
                    const fromCell = board[selected.row][selected.col];
                    if (fromCell.type !== "piece") return;
                    let movingPiece = fromCell.piece;
                    if (isPromotable) {
                      // 成れるなら成る
                      movingPiece = promote(movingPiece);
                    }

                    if (board[irow][icol].type === "piece") {
                      // 相手の駒を取る場合は持ち駒に加える
                      const newHands = {
                        ...hands,
                        [movingPiece.player]: [
                          ...hands[movingPiece.player],
                          board[irow][icol].piece.type,
                        ],
                      };

                      setHands(newHands);
                      // const newHands = { ...hands };
                      // newHands[currentPlayer].push(board[irow][icol].type);
                      // setHands(newHands);
                    }

                    const newBoard = board.map((row) => [...row]);
                    newBoard[selected.row][selected.col] = { type: "empty" };
                    newBoard[irow][icol] = {
                      type: "piece",
                      piece: movingPiece,
                    };
                    setBoard(newBoard);
                    setSelected(null);
                    setCurrentPlayer(
                      currentPlayer === "先手" ? "後手" : "先手",
                    );
                    return;
                  } else if (
                    cell.type !== "empty" &&
                    (debugMode || cell.piece.player === currentPlayer)
                  ) {
                    // 自分の駒をクリックしたら選択する
                    setSelected({ type: "board", row: irow, col: icol });
                    return;
                  }
                  // それ以外は選択解除
                  setSelected(null);
                }}
                style={{
                  width: "50px",
                  height: "50px",
                  border: "1px solid black",
                  boxSizing: "border-box",
                  backgroundColor: isSelected
                    ? "yellow"
                    : isMovable
                      ? "lightyellow"
                      : "white",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "24px",
                  transform:
                    cell.type === "piece" && cell.piece.player === "後手"
                      ? "rotate(180deg)"
                      : "none",
                }}
              >
                {cell.type === "piece" ? getPieceLabel(cell.piece) : ""}
              </div>
            );
          }),
        )}
      </div>
      <h3>先手</h3>
      <div>
        持ち駒:
        {hands["先手"].map((pieceType, index) => {
          const isSelected =
            selected?.type === "hand" &&
            selected.player === "先手" &&
            selected.index === index;
          return (
            <span
              key={index}
              style={{
                marginRight: "8px",
                backgroundColor: isSelected ? "yellow" : "white",
              }}
              onClick={() => {
                if (debugMode || currentPlayer === "先手") {
                  setSelected({ type: "hand", player: "先手", index });
                }
              }}
            >
              {pieceLabels[pieceType]}
            </span>
          );
        })}
      </div>
    </div>
  );
}

export default App;
