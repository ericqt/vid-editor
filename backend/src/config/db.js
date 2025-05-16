import mongoose from 'mongoose'

const redisHost = process.env.REDIS_HOST
const ffmpegPath = process.env.FFMPEG_PATH

const db = () => {
  mongoose.connect('mongodb://mongodb:27017/mydb', {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log('connected!');
  })
  .catch( (error) => {
    throw new Error('failed to connect to monbodb', error)
  })
}
export default db
