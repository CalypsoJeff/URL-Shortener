import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Get,
  Param,
  Res,
} from '@nestjs/common';
import { UrlService } from './url.service';
import { AuthGuard } from 'src/guards/auth.guard';
import { Response } from 'express';

@Controller('shorten-url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}
  @UseGuards(AuthGuard)
  @Post()
  async createShortUrl(
    @Body('originalUrl') originalUrl: string,
    @Req() req: any,
  ) {
    console.log('Request received in createShortUrl');
    console.log('Headers:', req.headers);
    const userId = req.user.sub;
    console.log(userId, 'blaaaaaaaaa');
    return this.urlService.shortenUrl(originalUrl, userId);
  }

  @Get(':shortId')
  async redirectToOriginalUrl(
    @Param('shortId') shortId: string,
    @Res() res: Response,
  ) {
    const originalUrl = await this.urlService.getOriginalUrl(shortId);
    return res.redirect(originalUrl);
  }
}
