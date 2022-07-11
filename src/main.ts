import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join, resolve } from 'path'
import { NestExpressApplication } from '@nestjs/platform-express';
import { createServer as createViteServer } from 'vite'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, 'public'))
  app.setBaseViewsDir(join(__dirname, 'views'))
  // app.useStaticAssets(resolve('./src/public'));
  // app.setBaseViewsDir(resolve('./src/views'));
  app.setViewEngine('hbs')

  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: 'ssr' },
    })
    // use vite's connect instance as middleware
    app.use(vite.middlewares)

  }
  
  await app.listen(3000);
}
bootstrap();
