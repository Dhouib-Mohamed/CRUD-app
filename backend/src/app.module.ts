import {Module} from '@nestjs/common';
import {CrudModule} from './crud/crud.module';
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";

const env = process.env
console.log(env)

@Module({
    imports: [
        ConfigModule.forRoot(),
        CrudModule,
        MongooseModule.forRoot(
            "mongodb+srv://" +
            process.env.MONGO_USER +
            ":" +
            process.env.MONGO_PASSWORD +
            "@" +
            process.env.MONGO_CLUSTER +
            "/?retryWrites=true&w=majority"
        )
    ],
})
export class AppModule {
}
