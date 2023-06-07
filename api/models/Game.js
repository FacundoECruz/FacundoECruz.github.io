import mongoose from 'mongoose';
const Schema = mongoose.Schema

const GameSchema = new Schema({
  results: Array,
  duration: Number,
  date: String,
  rounds: Number,
  usersId: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
})

const Game = mongoose.model("Game", GameSchema);

export default Game;
