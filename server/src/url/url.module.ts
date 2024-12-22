import { Module } from '@nestjs/common';
import { UrlService } from './url.service';
import { UrlController } from './url.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Url, UrlSchema } from './url.schema';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }]),
    AuthModule,
  ],
  controllers: [UrlController],
  providers: [UrlService],
  exports: [MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }])],
})
export class UrlModule {}
