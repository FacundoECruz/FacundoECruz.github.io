import mongoose from 'mongoose';
const Schema = mongoose.Schema

const GameSchema = new Schema({
  results: Array,
  duration: Number,
  date: String,
  rounds: Number,
})

const Game = mongoose.model("Game", GameSchema);

export default Game;
