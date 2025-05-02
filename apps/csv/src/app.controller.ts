import { Controller, Post, UploadedFile } from '@nestjs/common';
import { AppService } from './app.service';
import { UploadFile } from './decorators/upload-file.decorator';
import { ImageFileValidatorPipe } from './pipe/file-validator.pipe';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  @UploadFile('file', 'csv')
  uploadFile(
    @UploadedFile(new ImageFileValidatorPipe({ storeFolder: 'csv' }))
    file: Express.Multer.File,
  ) {
    return this.appService.uploadFile(file);
  }
}
