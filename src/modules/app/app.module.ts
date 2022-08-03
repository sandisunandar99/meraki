import { Module } from '@nestjs/common';
import { MongooseModule  } from "@nestjs/mongoose";
import { ConfigModule } from "@nestjs/config";

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { V1Module  } from "../v1/v1.module"; 

@Module({
  imports: [
    // Environment variables config
    ConfigModule.forRoot({
      cache : true,
      isGlobal: true
    }),

    // Mongoose connection to MongoDB
    MongooseModule.forRoot(process.env.MONGO_DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    }),
    V1Module,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
