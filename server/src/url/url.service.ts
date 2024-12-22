import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url, UrlDocument } from './url.schema';

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(Url.name)
    private readonly urlModel: Model<UrlDocument>,
  ) {}
  async shortenUrl(originalUrl: string, userId: string): Promise<Url> {
    const { nanoid } = await import('nanoid');
    console.log('Nanoid successfully loaded:', nanoid); // Debugshort
    const shortId = nanoid(8);
    const newShortendUrl = new this.urlModel({
      originalUrl,
      shortId,
      userId,
    });
    return newShortendUrl.save();
  }
  async getOriginalUrl(shortId: string): Promise<string> {
    const urlRecord = await this.urlModel.findOne({ shortId });
    if (!urlRecord) {
      throw new NotFoundException('Shortened URL not found');
    }
    return urlRecord.originalUrl;
  }
}
