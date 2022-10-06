declare const module: any;

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  const configService = app.get(ConfigService);
  const port = configService.get<number>('SERVER_POR') || 3000;

  await app.listen(port, async () => {
    console.log(
      `The server is running on ${port} port: http://localhost:${port}`,
    );
  });
}
bootstrap();
