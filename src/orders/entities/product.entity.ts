import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from 'src/users/entities/user.entity';

@Schema()
export class Product extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  image: string;

  @Prop()
  price: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
