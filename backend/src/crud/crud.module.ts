import {Module} from '@nestjs/common';
import {CrudService} from './crud.service';
import {CrudController} from './crud.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {Product, ProductSchema} from "./entities/product.entity";

@Module({
    imports: [
        MongooseModule.forFeature([{name: Product.name, schema: ProductSchema}]),
    ],
    controllers: [CrudController],
    providers: [CrudService]
})
export class CrudModule {
}
