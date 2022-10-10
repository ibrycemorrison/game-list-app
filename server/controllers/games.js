import axios from "axios";

// Define constant for the limit of games to pull
const limit = 20;

/**
 * Function to fetch a list of games from the IGDB database, based on a search query
 * @param {*} req The request from the frontend
 * @param {*} res The response to the frontend
 * @returns The appropriate response to the frontend app
 */
export const fetchGames = (req, res) => {
  // Define the environment variables
  const client_id = process.env["CLIENT_ID"];
  const access_token = process.env["ACCESS_TOKEN"];
  // Pull the search query
  const search_query = req.body.search;

  // Define HTTP request options
  const options = {
    headers: {
      "Client-ID": client_id,
      Authorization: `Bearer ${access_token}`,
    },
  };

  // Make API request to IGDB API
  const gameData = axios
    .post(
      "https://api.igdb.com/v4/games",
      `fields id, name, artworks, collection, cover, genres, rating, slug, url; limit ${limit}; search "${search_query}";`,
      options
    )
    .then(
      (response) => {
        // Return successful response, with JSON data
        return res.status(200).json(response.data);
      },
      (error) => {
        // Return error
        return res.status(400).json("Game Fetch Failed!");
      }
    );
};

/**
 * Function to fetch covers for a list of games from the IGDB database
 * @param {*} req Request from the frontend
 * @param {*} res Response to the frontend
 * @returns The appropriate response to the frontend app
 */
export const fetchCovers = (req, res) => {
  // Define the environment variables
  const client_id = process.env["CLIENT_ID"];
  const access_token = process.env["ACCESS_TOKEN"];

  // Define HTTP request options
  const options = {
    headers: {
      "Client-ID": client_id,
      Authorization: `Bearer ${access_token}`,
    },
  };

  // Create a string of the game ids in the format "game 1 | game 2 | game 3 | ..."
  const gameIDStringList = [];
  req.body.forEach((game) => {
    gameIDStringList.push(`game = ${game.id}`);
  });
  const gameQueryString = gameIDStringList.join(" | ");

  // Make API request to IGDB API
  const coverData = axios
    .post(
      "https://api.igdb.com/v4/covers",
      `fields id, game, image_id; limit ${limit}; where ${gameQueryString};`,
      options
    )
    .then(
      (response) => {
        // Append proper cover art url to each game, and return the JSON game data
        const data = response.data;
        req.body.forEach((game) => {
          data.forEach((cover) => {
            if (game.id === cover.game) {
              game.cover = `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover.image_id}.png`;
            }
          });
        });
        return res.status(200).json(req.body);
      },
      (error) => {
        // Return error
        return res.status(400).json("Covers Fetch Failed!");
      }
    );
};
