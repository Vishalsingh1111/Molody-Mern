import Song from '../Model/Song.model.js';

export const createSong = async (req, res) => {
    try {
        const { serialNo, songName, artist, categories, year } = req.body;
        const coverFile = req.files.cover ? req.files.cover[0] : null;
        const songFile = req.files.song ? req.files.song[0] : null;

        if (!coverFile || !songFile) {
            return res.status(400).json({ error: 'Cover and song files are required.' });
        }

        const newSong = new Song({
            serialNo,
            songName,
            artist,
            categories,
            year,
            coverUrl: coverFile.path,  // Cloudinary file URL
            songUrl: songFile.path     // Cloudinary file URL
        });

        const savedSong = await newSong.save();
        res.status(201).json(savedSong);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSongs = async (req, res) => {
    try {
        const songs = await Song.find();
        res.json(songs);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSongById = async (req, res) => {
    try {
        const song = await Song.findById(req.params.id);
        if (!song) return res.status(404).json({ message: 'Song not found' });
        res.json(song);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updateSong = async (req, res) => {
    try {
        const updatedData = { ...req.body };

        if (req.files.cover) {
            updatedData.coverUrl = req.files.cover[0].path;
        }
        if (req.files.song) {
            updatedData.songUrl = req.files.song[0].path;
        }

        const updatedSong = await Song.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        if (!updatedSong) return res.status(404).json({ message: 'Song not found' });
        res.json(updatedSong);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

export const deleteSong = async (req, res) => {
    try {
        const song = await Song.findByIdAndDelete(req.params.id);
        if (!song) return res.status(404).json({ message: 'Song not found' });
        // Note: You can also delete files from Cloudinary via API here if needed.
        res.json({ message: 'Song deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getSongCount = async (req, res) => {
    try {
        const count = await Song.countDocuments();
        res.status(200).json({ count });
    } catch (error) {
        console.error('Error getting song count:', error);
        res.status(500).json({ message: 'Failed to count songs' });
    }
};