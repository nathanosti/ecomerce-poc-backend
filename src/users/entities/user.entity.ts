import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { Address } from './address.entity';

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop({ default: false })
  seller: boolean;

  @Prop({ type: Address })
  address: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async (next) => {
  const user = this as User;

  if (!user.isModified('password')) return next();
  try {
    const hashedPass = await bcrypt.hash(user.password, 10);
    user.password = hashedPass;

    return next();
  } catch (err) {
    return next(err);
  }
});
