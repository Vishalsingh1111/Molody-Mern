import express from 'express';
import upload from '../Middleware/upload.js';
import {
    createArtist,
    getArtists,
    getArtistById,
    updateArtist,
    deleteArtist
} from '../Controller/Artist.controller.js';

const router = express.Router();

router.post('/', upload.single('image'), createArtist);
router.get('/', getArtists);
router.get('/:id', getArtistById);
router.put('/:id', upload.single('image'), updateArtist);
router.delete('/:id', deleteArtist);

export default router;
