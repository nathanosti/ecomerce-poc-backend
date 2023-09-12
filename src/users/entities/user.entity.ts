import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Address } from './address.entity';

@Schema()
export class User extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: false })
  seller: boolean;

  @Prop({ type: Address, required: false })
  address: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const hashedPass = await bcrypt.hash(this.password, 10);
    this.password = hashedPass;

    return next();
  } catch (err) {
    return next(err);
  }
});
