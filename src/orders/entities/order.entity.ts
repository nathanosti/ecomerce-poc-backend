import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { Product } from './product.entity';
import { User } from 'src/users/entities/user.entity';

@Schema()
export class Order extends Document {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop([
    {
      product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
      quantity: { type: Number, default: 0 },
    },
  ])
  products: Array<{ product: Product; quantity: number }>;

  @Prop({ default: 0 })
  totalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
