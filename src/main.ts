import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from "dotenv";

const cc = dotenv.config({ path: ".env" });


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT || 3000);

  console.log(`Application is running on port:  ${await app.getUrl()}`);
  
}
bootstrap();
