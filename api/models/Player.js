import mongoose from 'mongoose';
const Schema = mongoose.Schema

const PlayerSchema = new Schema({
  username: String,
  image: String,
  password: String,
})

const Player = mongoose.model("Player", PlayerSchema);

export default Player;
