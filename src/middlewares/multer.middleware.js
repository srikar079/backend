import multer from 'multer';
import path from 'path';

// Configure multer storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const fullPath = 'E:/study/ext/Backend/03/public/keep'; // Updated to the absolute path
        console.log("Destination path:", fullPath);
        cb(null, fullPath);
    },
    filename: (req, file, cb) => {
        console.log("Saving file:", file.originalname); // Log filename

        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

// Initialize multer
const upload = multer({ storage });

export { upload };
