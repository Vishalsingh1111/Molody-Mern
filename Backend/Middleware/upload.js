import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: async (req, file) => {
        let folder = 'songs';
        let resource_type = 'auto'; // auto detects type

        if (file.fieldname === 'cover') {
            folder = 'songs/covers';
            resource_type = 'image';
        } else if (file.fieldname === 'song') {
            folder = 'songs/audio';
            resource_type = 'video'; // 'video' resource_type works for audio too on Cloudinary
        }
        // Route for artist image
        else if (file.fieldname === 'image') {
            folder = 'artist_images';
            resource_type = 'image';
        }

        return {
            folder,
            resource_type,
            public_id: `${file.fieldname}-${Date.now()}`,
        };
    },
});

const upload = multer({ storage });

export default upload;
