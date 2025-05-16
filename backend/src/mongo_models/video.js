import mongoose from 'mongoose';

const videoSchema = new mongoose.Schema(
    {
        file_name: {
            type: String,
            required: [true, 'Video name is required'],
            minlength: [1, 'Video name should have 1 or more characters']
        },
        file_size: {
            type: Number,
            required: [true, 'Missing file size']
        },
        length: {
            type: Number,
            required: [true, 'Missing video length']
        },
        cuts: [[]],
    }
)
