// cloudinaryConfig.js

import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Configurer Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configurer Multer pour utiliser Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Dossier sur Cloudinary
    format: async (req, file) => {
      const mimeTypesMap = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'image/webp': 'webp',
      };
      return mimeTypesMap[file.mimetype] || 'png'; // Format par défaut
    },
    public_id: (req, file) => file.originalname.split('.')[0], // ID public basé sur le nom de fichier
  },
});

// Initialiser Multer avec le stockage Cloudinary
const upload = multer({ storage: storage });

export { cloudinary, upload };
