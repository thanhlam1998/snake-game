import React, { useState } from "react";

const SnakeGame = () => {
  const [size, setSize] = useState(10);

  return (
    <div>
      <div className="flex">
        {`Please input your size (>10): `}
        <input type="text" placeholder="10" />
      </div>
    </div>
  );
};

export default SnakeGame;
