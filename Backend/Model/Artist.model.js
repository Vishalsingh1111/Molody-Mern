import mongoose from "mongoose";

const ArtistSchema = new mongoose.Schema({
    Name: { type: String, required: true },
    Nationalism: { type: String, required: false },
    Duration: { type: String },
    image: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model('Artist', ArtistSchema);
