import axios from "axios";
import React, { useState } from "react";
import GameBox from "../../components/GameBox";
import "./browse.scss";

/**
 *
 * @returns Browse Page HTML
 */
export default function Browse() {
  // inputs state, representing the input to the search bar
  const [inputs, setInputs] = useState({
    search: "",
  });
  // gameData state, representing the current array of game data pulled from IGDB
  const [gameData, setGameData] = useState([]);

  /**
   * Function to handle change to the search bar input
   * @param {HTML Element} e The input HTML element being changed
   */
  const handleChange = (e) => {
    // Change only the changed values in the current input state
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  /**
   * Asynchronous function to call the {/games/fetchGames} endpoint, to populate the list of game data
   * @param {HTML Element} e The HTML form
   */
  const handleSubmit = async (e) => {
    // Prevent the page from refreshing
    e.preventDefault();
    try {
      // Retrieve the base game data for the search query
      const games = await axios.post("/games/fetchGames", inputs);
      // Populate that game data with links to cover art
      const gamesWithCovers = await axios.post(
        "/games/fetchCovers",
        games.data
      );
      // Set the {gameData} state
      setGameData(gamesWithCovers.data);
    } catch (err) {
      // Blank the game data on an empty or invalid search
      setGameData([]);
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
            placeholder=""
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
