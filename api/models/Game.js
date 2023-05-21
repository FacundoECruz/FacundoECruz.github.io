import mongoose from 'mongoose';
const Schema = mongoose.Schema

const GameSchema = new Schema({
  results: Array,
  duration: String,
  date: Date,
  rounds: Number,
})

const Game = mongoose.model("Game", GameSchema);

export default Game;
