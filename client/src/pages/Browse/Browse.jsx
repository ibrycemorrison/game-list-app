import axios from "axios";
import React, { useState } from "react";
import GameBox from "../../components/GameBox/GameBox";
import GameModal from "../../components/GameModal/GameModal";
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
  // selectedGame state, representing the current game as an object
  const [selectedGame, setSelectedGame] = useState();

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

  /**
   * Opens a modal for the given game
   * @param {Object} game The game the modal is being opened for
   */
  const openModal = (game) => {
    console.log(game);
    setSelectedGame(game);
    document.getElementById("gamemodal").style.opacity = "1";
    document.getElementById("gamemodal").style.pointerEvents = "auto";
  };

  /**
   * Closes the current game modal, and sets the game to undefined
   */
  const closeModal = () => {
    setSelectedGame(undefined);
    document.getElementById("gamemodal").style.opacity = "0";
    document.getElementById("gamemodal").style.pointerEvents = "none";
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
            <GameBox key={game.id} game={game} openModal={openModal} />
          ))}
        </div>
      </div>
      <div className="gamemodal-container">
        <GameModal selectedGame={selectedGame} closeModal={closeModal} />
      </div>
    </div>
  );
}
