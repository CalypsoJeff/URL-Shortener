import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { Url, UrlSchema } from 'src/url/url.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([{ name: Url.name, schema: UrlSchema }]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    UserService,
  ],
})
export class UserModule {}
