import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    await app.listen(5000);

    // const app = await NestFactory.create<NestExpressApplication>(AppModule);
    // app.useStaticAssets(join(__dirname, '..', 'static'));
    // await app.listen(5000);
}
bootstrap();
