import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
    {
        fileName: {
            type: String,
            required: [true, 'Video name is required'],
            minlength: [1, 'Video name should have 1 or more characters']
        },
        fileSize: {
            type: Number,
            required: [true, 'Missing file size']
        },
        length: {
            type: Number,
            required: [true, 'Missing video length']
        },
        codecName: {
            type: String,
            required: [true, 'Missing codec name']
        },
        dimensions: {
            type: [String],
            required: [true, 'Missing video dimensions']
        },
        avgFramerate: {
            type: String,
            required: [true, 'Missing video framerate']
        },
        videoBitrate: {
            type: Number,
            required: [true, 'Missing video bitrate']
        },
        rotation: {
            type: Number,
            required: [true, 'Missing video rotation']
        },
        cuts: [[]],
    }
)

const video = mongoose.model('video', videoSchema)
export default video
