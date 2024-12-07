import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import {
  addPlayerTime,
  fetchCharacters,
  fetchImage,
  getLeaderboard,
} from "./prisma/queries.js";

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_ORIGIN,
  })
);

app.get("/picture/:id", async (req, res) => {
  const picData = await fetchImage(+req.params.id);

  res.json(picData);
});

app.get("/characters", async (req, res) => {
  const characters = await fetchCharacters();

  res.json(characters);
});

app.get("/leaderboard", async (req, res) => {
  const leaderboard = await getLeaderboard();

  res.json(leaderboard);
});

app.post("/leaderboard", async (req, res) => {
  const { time, nickname } = req.body;
  const timeEntry = await addPlayerTime(nickname, +time);

  res.json(timeEntry);
});

app.listen(3000);
