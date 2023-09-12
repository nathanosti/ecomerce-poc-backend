import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address } from './address.entity';

@Schema()
export class User extends Document {
  @Prop()
  name: string;

  @Prop()
  email: string;

  @Prop()
  readonly password: string;

  @Prop({ default: false })
  seller: boolean;

  @Prop({ type: Address })
  address: Address;
}

export const UserSchema = SchemaFactory.createForClass(User);
