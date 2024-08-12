import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';
import dotenv from 'dotenv';

dotenv.config();

// Configurer Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configurer Multer pour utiliser Cloudinary avec des formats multiples
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads', // Dossier où les fichiers seront stockés sur Cloudinary
    format: async (req, file) => {
      // Déterminez le format à utiliser en fonction du mimetype ou du nom de fichier
      const mimeTypesMap = {
        'image/jpeg': 'jpg',
        'image/png': 'png',
        'image/gif': 'gif',
        'image/webp': 'webp'
      };
      const extension = mimeTypesMap[file.mimetype] || 'png'; // 'png' par défaut si le type n'est pas dans la map
      return extension;
    },
    public_id: (req, file) => file.originalname.split('.')[0], // Utiliser le nom de fichier sans extension comme ID public
  },
});

const upload = multer({ storage: storage });

export { cloudinary, upload };
