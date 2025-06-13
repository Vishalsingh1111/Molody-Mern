import express from 'express';
import upload from '../Middleware/upload.js';
import { createSong, getSongs, getSongById, updateSong, deleteSong, getSongCount } from '../Controller/Song.controller.js';

const router = express.Router();

router.post('/', upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'song', maxCount: 1 }]), createSong);
router.get('/', getSongs);
router.get('/count', getSongCount);
router.get('/:id', getSongById);
router.put('/:id', upload.fields([{ name: 'cover', maxCount: 1 }, { name: 'song', maxCount: 1 }]), updateSong);
router.delete('/:id', deleteSong);


export default router;
