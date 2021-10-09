import React, { useEffect, useRef, useState } from "react";
import CustomModal from "./CustomModal";
import "./index.css";

const SIZE = 600;

const SnakeGame = () => {
  const [columns, setColumns] = useState(10);
  const [columnSize, setColumnSize] = useState(0);
  const [position, setPosition] = useState();

  const [snakePosition, setSnakePosition] = useState([]);
  const [direction, setDirection] = useState({ left: 0, top: 0 });
  const [food, setFood] = useState();
  const [gameStart, setGameStart] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const ref = useRef();
  const timeoutRef = useRef();

  useEffect(() => {
    if (ref.current) {
      const cellSize = ref.current.getBoundingClientRect().width;
      setColumnSize(cellSize);
    }
  }, [ref]);

  useEffect(() => {
    setPosition({
      left: 3 * (columnSize + 4),
      top: 3 * (columnSize + 4),
    });
    setFood({
      left: 5 * (columnSize + 4),
      top: 5 * (columnSize + 4),
    });
    setSnakePosition([
      { left: 3 * (columnSize + 4), top: 3 * (columnSize + 4) },
      { left: 2 * (columnSize + 4), top: 3 * (columnSize + 4) },
    ]);
    setDirection({ top: 0, left: columnSize + 4 });
  }, [columnSize, gameOver]);

  useEffect(() => {
    if (gameStart === true) {
      if (
        position &&
        (position.left !== snakePosition[0].left ||
          position.top !== snakePosition[0].top)
      ) {
        // Check if go over the wall
        if (
          position.left < 0 ||
          position.left > 600 ||
          position.top < 0 ||
          position.top > 600
        ) {
          setGameOver(true);
          setGameStart(false);
          return;
        }

        // Check if kill itself
        snakePosition.forEach((item) => {
          if (
            position.top === item.top &&
            position.left === item.left &&
            gameStart &&
            !gameOver
          ) {
            setGameOver(true);
            setGameStart(false);
            return;
          }
        });

        // Snake position handler
        const newPosition = [...snakePosition];
        if (position.left === food.left && position.top === food.top) {
          const foodIndex =
            (food.top / (columnSize + 4)) * 10 + food.left / (columnSize + 4);
          const snakeIndex = snakePosition.map(
            (item) =>
              (item.top / (columnSize + 4)) * 10 + item.left / (columnSize + 4)
          );
          const exceptIndex = [foodIndex, ...snakeIndex];
          const available = Array.from(
            { length: columns * columns },
            (v, i) => i
          ).filter((item) => !exceptIndex.includes(item));
          const random =
            available[Math.floor(Math.random() * available.length)];
          const top = Math.floor(random / 10) * (columnSize + 4);
          const left = (random % 10) * (columnSize + 4);
          setFood({ top, left });
        } else {
          newPosition.pop();
        }
        newPosition.unshift(position);
        setSnakePosition(newPosition);
        clearTimeout(timeoutRef.current);
      }
      timeoutRef.current = setTimeout(() => {
        setPosition({
          left: position.left + direction.left,
          top: position.top + direction.top,
        });
      }, 200);
    }
  }, [gameStart, direction, position]);

  const handleKeyDown = (event) => {
    switch (event.key) {
      case "w":
      case "ArrowUp":
        clearTimeout(timeoutRef.current);
        setDirection({ left: 0, top: -(columnSize + 4) });
        break;
      case "ArrowDown":
      case "s":
        clearTimeout(timeoutRef.current);
        setDirection({ left: 0, top: columnSize + 4 });
        break;
      case "ArrowLeft":
      case "a":
        clearTimeout(timeoutRef.current);
        setDirection({ top: 0, left: -(columnSize + 4) });
        break;
      case "ArrowRight":
      case "d":
        clearTimeout(timeoutRef.current);
        setDirection({ top: 0, left: columnSize + 4 });
        break;
      case "Enter":
        if (!gameStart) {
          setGameStart(true);
        }
        break;
      default:
    }
  };

  const handleGameStart = () => {
    setGameStart(true);
    setGameOver(false);
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [position]);

  return (
    <div>
      {/* TODO: Adjust column and speed */}
      {/* <div className="d-flex justify-content-between mb-5">
        <div className="d-flex">
          {`Please input your size (>10): `}
          <input type="text" placeholder="10" />
        </div>
        <div className="d-flex">
          {`Please input speed:`}
          <input className="ms-2" type="text" placeholder="10" />
        </div>
      </div> */}
      <div className="border p-2 d-inline-block shadow m-auto">
        <div
          className="board m-auto"
          style={{
            width: SIZE,
            height: SIZE,
          }}>
          {[...Array(columns * columns)].map((_, index) => (
            <div key={index} ref={ref} className="cell" />
          ))}
          {[...Array(snakePosition.length)].map((_, index) => (
            <div
              key={index}
              style={{
                backgroundColor: index === 0 ? "#C23826" : "#D26927",
                width: columnSize,
                height: columnSize,
                ...snakePosition[index],
              }}
              className="snake"></div>
          ))}
          <div
            style={{ width: columnSize, height: columnSize, ...food }}
            className="food"></div>
          {(!gameStart || gameOver) && (
            <CustomModal
              gameStart={gameStart}
              gameOver={gameOver}
              handleGameStart={handleGameStart}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default SnakeGame;
