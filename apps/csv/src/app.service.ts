import { CreateUserDto } from '@app/common';
import { RabbitClient } from '@app/common/rabbit-client/rabbit.client';
import { Injectable } from '@nestjs/common';
import * as csv from 'csv-parser';
import * as fs from 'fs';

@Injectable()
export class AppService {
  constructor(private readonly rabbitClient: RabbitClient) {}

  async uploadFile(file: Express.Multer.File) {
    const results = await new Promise((resolve, reject) => {
      const results: CreateUserDto[] = [];
      const stream = fs.createReadStream(file.path);
      stream
        .pipe(csv(['firstName', 'lastName', 'phone', 'email']))
        .on('data', (row) => {
          results.push(row);
        })
        .on('error', (err) => {
          reject(err);
        })
        .on('end', () => {
          fs.unlinkSync(file.path);
          resolve(results);
        });
    });

    await this.rabbitClient.emit('user.list.create', results);
    return {
      message: 'Users created successfully',
    };
  }
}
