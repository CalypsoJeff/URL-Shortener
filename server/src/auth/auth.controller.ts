import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    try {
      const token = await this.authService.login(body.email, body.password);
      return { access_token: token };
    } catch (error) {
      console.error('Error during login:', error.message);
      throw new HttpException(
        error.message || 'An error occurred during login',
        HttpStatus.UNAUTHORIZED,
      );
    }
  }
}
