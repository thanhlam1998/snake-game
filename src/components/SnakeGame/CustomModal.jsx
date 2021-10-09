import React from "react";

const CustomModal = ({ gameOver, handleGameStart }) => {
  return (
    <div
      style={{
        zIndex: 2,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
      }}
      className="position-absolute d-flex flex-column text-white align-items-center justify-content-center left-0 top-0">
      {gameOver ? (
        <>
          <h1>Game Over</h1>
          <button
            onClick={handleGameStart}
            type="button"
            className="btn btn-light">
            Click here or press ENTER to try again
          </button>
        </>
      ) : (
        <>
          <button
            onClick={handleGameStart}
            type="button"
            className="btn btn-light">
            Click here ore press ENTER to start
          </button>
        </>
      )}
    </div>
  );
};

export default CustomModal;
