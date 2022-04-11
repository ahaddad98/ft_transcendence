import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';

import path = require('path');
import { readChunkSync } from 'read-chunk';

import fs = require('fs');
import imageType = require('image-type');

type validMimeType = 'image/png' | 'image/jpg' | 'image/jpeg';

const validMimeTypes: validMimeType[] = [
  'image/png',
  'image/jpg',
  'image/jpeg',
];

export const saveImageToStorage = {
  storage: diskStorage({
    destination: './src/avatar',
    filename: (req, file, cb) => {
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

export const fullImagePath = (filename: string): string => {
  const imagesFolderPath = process.cwd() + '/src/avatar';
  const fullPath = imagesFolderPath + '/' + filename;
  return fullPath;
};

export const isFileExtensionSafe = async (path: string) => {
  if (imageType(fs.readFileSync(path))) return true;
  else {
    fs.unlink(path, (err) => {
      if (err) throw err;
      console.log('file is deleted');
    });
    return false;
  }
};
