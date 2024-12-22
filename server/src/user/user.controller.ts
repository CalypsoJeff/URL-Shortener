import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { CreateUserDto } from './create-user.dto';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  async register(@Body() createUserDto: CreateUserDto) {
    const { name, email, password } = createUserDto;
    const user = await this.userService.registerUser(name, email, password);
    return {
      statusCode: HttpStatus.CREATED,
      success: true,
      message: 'User registered successfully',
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    };
  }

  @Get(':userId/urls')
  async shortUrl(@Param('userId') userId: string) {
    return await this.userService.fetchUrlsByUser(userId);
  }
}
