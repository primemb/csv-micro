import { Controller, Get, Logger } from '@nestjs/common';
import { StorageService } from './storage.service';
import { EventPattern } from '@nestjs/microservices';

@Controller()
export class StorageController {
  private readonly logger = new Logger(StorageController.name);
  constructor(private readonly storageService: StorageService) {}

  @EventPattern('user.create')
  async handleUserCreated(data: any) {
    this.logger.log(`User created event received ${JSON.stringify(data)}`);
    console.log(data);
  }
}
