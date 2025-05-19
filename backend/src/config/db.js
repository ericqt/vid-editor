import mongoose from 'mongoose'

const redisHost = process.env.REDIS_HOST
const ffmpegPath = process.env.FFMPEG_PATH

const db = () => {
  mongoose.connect('mongodb://mongodb:27017/mydb')
  .then(() => {
    console.log('connected!');
  })
  .catch( (error) => {
    throw new Error('failed to connect to mongodb', error)
  })
}
export default db
