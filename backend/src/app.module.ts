import {Module} from '@nestjs/common';
import {CrudModule} from './crud/crud.module';
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [
        CrudModule,
        MongooseModule.forRoot("mongodb+srv://mdhouib195:dhouib50810555@cluster0.ek8ct41.mongodb.net/?retryWrites=true&w=majority")
    ],
})
export class AppModule {
}
