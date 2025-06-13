import Artist from '../Model/Artist.model.js';

// Create a new artist
export const createArtist = async (req, res) => {
    try {
        const { Name, Nationalism, Duration } = req.body;
        const image = req.file?.path;

        if (!image) return res.status(400).json({ error: 'Image is required' });

        const artist = new Artist({
            Name,
            Nationalism,
            Duration,
            image
        });

        const savedArtist = await artist.save();
        res.status(201).json(savedArtist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update an existing artist
export const updateArtist = async (req, res) => {
    try {
        const { Name, Nationalism, Duration } = req.body;
        const artist = await Artist.findById(req.params.id);

        if (!artist) return res.status(404).json({ error: 'Artist not found' });

        const updatedData = {
            Name: Name || artist.Name,
            Nationalism: Nationalism || artist.Nationalism,
            Duration: Duration || artist.Duration,
        };

        if (req.file) {
            updatedData.image = req.file.path;
        }

        const updatedArtist = await Artist.findByIdAndUpdate(req.params.id, updatedData, { new: true });
        res.status(200).json(updatedArtist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all artists
export const getArtists = async (req, res) => {
    try {
        const artists = await Artist.find().sort({ createdAt: -1 });
        res.status(200).json(artists);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get single artist by ID
export const getArtistById = async (req, res) => {
    try {
        const artist = await Artist.findById(req.params.id);
        if (!artist) return res.status(404).json({ error: 'Artist not found' });
        res.status(200).json(artist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete artist
export const deleteArtist = async (req, res) => {
    try {
        const artist = await Artist.findByIdAndDelete(req.params.id);
        if (!artist) return res.status(404).json({ error: 'Artist not found' });
        res.status(200).json({ message: 'Artist deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
