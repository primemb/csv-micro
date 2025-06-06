import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  Logger,
  PipeTransform,
} from '@nestjs/common';
import { fromFile } from 'file-type';
import { unlinkSync } from 'fs';
import { ICustomUploadFile } from '../interfaces/custom-upload-file.interface';

interface IImageFileValidatorPipeOptions {
  storeFolder: string;
  isOptional?: boolean;
}

@Injectable()
export class ImageFileValidatorPipe implements PipeTransform {
  private readonly logger = new Logger(ImageFileValidatorPipe.name);
  constructor(private readonly options: IImageFileValidatorPipeOptions) {}

  async transform(
    file: ICustomUploadFile,
  ): Promise<Express.Multer.File | null> {
    if (!file) {
      if (this.options.isOptional) {
        return null;
      }
      throw new BadRequestException('file is required');
    }

    try {
      const max = 10 * 1024 * 1024;
      if (file.size > max) {
        this.removeFile(file);
        throw new BadRequestException('File is to big');
      }

      const validExt = ['csv'];
      const fileType = await fromFile(file.path);
      if (!file) {
        this.removeFile(file);
        throw new BadRequestException('File ext is not valid');
      }
      if (fileType && !validExt.includes(fileType.ext)) {
        this.removeFile(file);
        throw new BadRequestException('File ext is not valid');
      }
      const filePath = file.path.split('/');
      // find event_images in the path
      const index = filePath.findIndex(
        (path) => path === this.options.storeFolder,
      );

      const storePath = filePath.slice(index).join('/');
      file.storeDestination = storePath;

      return file;
    } catch (error) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        this.logger.error(error);
        throw new InternalServerErrorException('Something went wrong');
      }
    }
  }

  private removeFile(file: Express.Multer.File) {
    unlinkSync(file.path);
  }
}
