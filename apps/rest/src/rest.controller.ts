import { Body, Controller, Get, Post } from '@nestjs/common';
import { RestService } from './rest.service';
import { CreateUserDto } from '@app/common';

@Controller()
export class RestController {
  constructor(private readonly restService: RestService) {}

  @Post()
  createUser(@Body() user: CreateUserDto) {
    return this.restService.createUser(user);
  }
}
