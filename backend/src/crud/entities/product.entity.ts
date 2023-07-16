import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';

@Schema()
export class Product extends Document {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    unitPrice: number;

    @Prop({required: true})
    quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
