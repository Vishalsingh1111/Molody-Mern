import mongoose from 'mongoose';

const SongSchema = new mongoose.Schema({
    serialNo: { type: Number, required: true, unique: true },
    songName: { type: String, required: true },
    artist: { type: String },
    categories: { type: String },
    year: { type: String },
    coverUrl: { type: String, required: true },  // URL of cover in S3
    songUrl: { type: String, required: true }    // URL of song in S3
}, { timestamps: true });

export default mongoose.model('Song', SongSchema);
