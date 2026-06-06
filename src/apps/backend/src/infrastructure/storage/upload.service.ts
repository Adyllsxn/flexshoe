import { Injectable, BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

export type EntityType = 'products' | 'users' | 'stores';

interface CallbackFunction {
  (error: Error | null, accepted: boolean): void;
}

interface FileFilterCallback {
  (error: Error | null, filename: string): void;
}

@Injectable()
export class UploadService {
  private readonly baseUploadDir = join(process.cwd(), 'uploads');

  constructor() {
    this.ensureDirectories();
  }

  private ensureDirectories() {
    const folders = [
      this.baseUploadDir,
      join(this.baseUploadDir, 'products'),
      join(this.baseUploadDir, 'users'),
      join(this.baseUploadDir, 'stores'),
    ];

    folders.forEach((folder) => {
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
      }
    });
  }

  getStorageConfig(entity: EntityType) {
    return diskStorage({
      destination: join(this.baseUploadDir, entity),
      filename: (
        _req: unknown,
        file: Express.Multer.File,
        callback: FileFilterCallback,
      ) => {
        const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
        callback(null, uniqueName);
      },
    });
  }

  getFileFilter() {
    return (
      _req: unknown,
      file: Express.Multer.File,
      callback: CallbackFunction,
    ) => {
      const allowedMimes = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/webp',
      ];
      if (allowedMimes.includes(file.mimetype)) {
        callback(null, true);
      } else {
        callback(
          new BadRequestException(
            'Apenas imagens são permitidas (JPEG, PNG, JPG, WEBP)',
          ),
          false,
        );
      }
    };
  }

  getFileOptions(entity: EntityType) {
    return {
      storage: this.getStorageConfig(entity),
      fileFilter: this.getFileFilter(),
      limits: {
        fileSize: 2 * 1024 * 1024,
      },
    };
  }

  async saveImage(
    file: Express.Multer.File,
    entity: EntityType,
  ): Promise<string> {
    // Preserva a extensão original
    const ext = extname(file.originalname);
    const filename = `${uuidv4()}${ext}`;
    const filepath = join(this.baseUploadDir, entity, filename);

    let sharpInstance = sharp(file.buffer).resize(800, 800, {
      fit: 'inside',
      withoutEnlargement: true,
    });

    // Preserva transparência baseado no formato original
    switch (file.mimetype) {
      case 'image/png':
        await sharpInstance.png({ quality: 90, compressionLevel: 6 }).toFile(filepath);
        break;
      case 'image/webp':
        await sharpInstance.webp({ quality: 90, alphaQuality: 100 }).toFile(filepath);
        break;
      case 'image/jpeg':
      case 'image/jpg':
        await sharpInstance.jpeg({ quality: 85 }).toFile(filepath);
        break;
      default:
        // Fallback para webp (suporta transparência)
        const webpFilename = `${uuidv4()}.webp`;
        const webpFilepath = join(this.baseUploadDir, entity, webpFilename);
        await sharpInstance.webp({ quality: 90, alphaQuality: 100 }).toFile(webpFilepath);
        return `/uploads/${entity}/${webpFilename}`;
    }

    return `/uploads/${entity}/${filename}`;
  }

  async saveImages(
    files: Express.Multer.File[],
    entity: EntityType,
  ): Promise<string[]> {
    const urls: string[] = [];
    for (const file of files) {
      const url = await this.saveImage(file, entity);
      urls.push(url);
    }
    return urls;
  }

  getImageUrl(filename: string, entity: EntityType): string {
    return `/uploads/${entity}/${filename}`;
  }

  deleteImage(url: string | null): boolean {
    if (!url) return false;

    const parts = url.split('/uploads/');
    if (parts.length < 2) return false;

    const filePath = join(process.cwd(), 'uploads', parts[1]);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  }

  extractFilenameFromUrl(url: string | null): string | null {
    if (!url) return null;
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
}