import axios from "axios";
import React, { useState } from "react";
import GameBox from "../components/GameBox";
import "./browse.scss";

export default function Browse() {
  const [inputs, setInputs] = useState({
    search: "",
  });
  const [gameData, setGameData] = useState([]);

  const handleChange = (e) => {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  // async bc api request
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const games = await axios.post("/games/fetchGames", inputs);
      console.log(games.data);
      const gamesWithCovers = await axios.post(
        "/games/fetchCovers",
        games.data
      );
      setGameData(gamesWithCovers.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="browse">
      <div className="search">
        <h1>Search</h1>
        <form>
          <img src="assets/search.svg" alt="" />
          <input
            type="text"
            placeholder="search"
            name="search"
            onChange={handleChange}
          />
          <input type="submit" id="submit" onClick={handleSubmit} />
        </form>
      </div>
      <div className="games">
        <h1>Games</h1>
        <div className="game-container">
          {gameData.map((game) => (
            <GameBox
              key={game.id}
              id={game.id}
              name={game.name}
              cover={game.cover}
              url={game.url}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
