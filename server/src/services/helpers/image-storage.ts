import { diskStorage} from 'multer';
import { v4 as uuidv4 } from 'uuid';

import path = require('path');

type validFileExtension = 'png' | 'jpg' | 'jpeg';
type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';

const validFileExtentions: validFileExtension[] = ['png', 'jpg', 'jpeg'];
const validMimeTypes: validMimeType[] = [
  'image/png',
  'image/jpg',
  'image/jpeg',
];

export const saveImageToStorage = {
  storage: diskStorage({
    destination: './src/avatar',
    filename: (req, file, cb) => {
      console.log(file.mimetype);
      const filename: string =
        path.parse(file.originalname).name.replace(/\s/g, '') + uuidv4(); // regexr : regular expressions / '\s' for Whitespace / '/g' expression flags for global
      const extension: string = path.parse(file.originalname).ext;
      cb(null, `${filename}${extension}`);
    },
  }),
  fileFilter: (req, file, cb) => {
    const allowedMimeType: validMimeType[] = validMimeTypes;
    allowedMimeType.includes(file.mimetype) ? cb(null, true) : cb(null, false);
  },
};
