import userImage from "../../../assets/userImage.jpg"

export const player = {
  id: "default",
  username: "Tucu",
  gamesPlayed: 15,
  gamesWon: 2,
  createdGames: 7,
  totalScore: 476,
  level: 92,
  image: userImage,
  games: [
    {
      id: "12343223768",
      date: "23/2/2019",
      results: [
        {
          player: "Barack Obama",
          score: 55,
        },
        {
          player: "Angelina Jolie",
          score: 40,
        },
        {
          player: "Buda",
          score: 38,
        },
        {
          player: "Tatekieto",
          score: 30,
        },
      ],
    },
    {
      id: "12341223245",
      date: "23/2/2019",
      results: [
        {
          player: "Messi",
          score: 60,
        },
        {
          player: "Diego",
          score: 43,
        },
        {
          player: "Barack Obama",
          score: 35,
        },
        {
          player: "Grondona",
          score: 12,
        },
      ],
    },
  ],
};
