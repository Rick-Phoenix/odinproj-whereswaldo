import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchImage(id) {
  const image = await prisma.picture.findUnique({
    where: {
      id,
    },
  });

  return image;
}

export async function fetchCharacters() {
  const characters = await prisma.charachter.findMany();

  return characters;
}

export async function addPlayerTime(nickname = null, time) {
  const playerTime = await prisma.playerTimes.create({
    data: {
      ...(nickname && { nickname }),
      time,
    },
  });

  return playerTime;
}

export async function getLeaderboard() {
  const leaderboard = await prisma.playerTimes.findMany();

  return leaderboard;
}
