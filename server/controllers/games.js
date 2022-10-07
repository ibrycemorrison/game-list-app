import { db } from "../database.js";
import axios from "axios";

const limit = 20;

export const fetchGames = (req, res) => {
  const client_id = process.env["CLIENT_ID"];
  const access_token = process.env["ACCESS_TOKEN"];
  const search_query = req.body.search;

  const options = {
    headers: {
      "Client-ID": client_id,
      Authorization: `Bearer ${access_token}`,
    },
  };

  const gameData = axios
    .post(
      "https://api.igdb.com/v4/games",
      `fields id, name, artworks, collection, cover, genres, rating, slug, url; limit ${limit}; search "${search_query}";`,
      options
    )
    .then(
      (response) => {
        res.status(200).json(response.data);
      },
      (error) => {
        res.status(400).json("Game Fetch Failed!");
      }
    );
};

export const fetchCovers = (req, res) => {
  const client_id = process.env["CLIENT_ID"];
  const access_token = process.env["ACCESS_TOKEN"];

  const options = {
    headers: {
      "Client-ID": client_id,
      Authorization: `Bearer ${access_token}`,
    },
  };

  const gameIDStringList = [];
  req.body.forEach((game) => {
    gameIDStringList.push(`game = ${game.id}`);
  });
  const gameQueryString = gameIDStringList.join(" | ");

  const coverData = axios
    .post(
      "https://api.igdb.com/v4/covers",
      `fields id, game, image_id; limit ${limit}; where ${gameQueryString};`,
      options
    )
    .then(
      (response) => {
        const data = response.data;
        req.body.forEach((game) => {
          data.forEach((cover) => {
            if (game.id === cover.game) {
              game.cover = `https://images.igdb.com/igdb/image/upload/t_cover_big/${cover.image_id}.png`;
            }
          });
        });
        res.status(200).json(req.body);
      },
      (error) => {
        res.status(400).json("Covers Fetch Failed!");
      }
    );
};
