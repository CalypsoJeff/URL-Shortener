import { ConflictException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { User, UserDocument } from './user.schema';
import { Url, UrlDocument } from '../url/url.schema';

import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    @InjectModel(Url.name) private urlModel: Model<UrlDocument>,
  ) {}
  async registerUser(
    name: string,
    email: string,
    password: string,
  ): Promise<User> {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new this.userModel({
      name,
      email,
      password: hashedPassword,
    });
    return await newUser.save();
  }
  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }
  async fetchUrlsByUser(userId: string): Promise<Url[]> {
    return await this.urlModel.find({ userId }).sort({ createdAt: -1 }).exec();
  }
}
