import multer from 'multer';
import path from 'path';
import fs from 'fs';

// Ensure uploads folder exists
const uploadPath = './uploads';
if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const filename = `${Date.now()}-${file.fieldname}${ext}`;
        cb(null, filename);
    }
});

export const upload = multer({ storage });
