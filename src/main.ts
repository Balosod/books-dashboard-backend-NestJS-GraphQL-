import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

/**
 * Bootstrap function
 *
 * This is the entry point of the NestJS application.
 */
async function bootstrap() {
  // Create the NestJS app using the root AppModule
  const app = await NestFactory.create(AppModule);

  /**
   * Enable CORS (Cross-Origin Resource Sharing)
   *
   * - Allows the frontend (running on localhost:3000) to make requests
   *   to this backend (GraphQL API).
   * - credentials: true allows cookies or authentication headers
   *   to be sent along with requests.
   */
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Strips properties that don't have decorators
      forbidNonWhitelisted: true, // Throws error if unknown properties are sent
      transform: true, // Automatically transforms payloads to DTO instances
      skipMissingProperties: false, // IMPORTANT: Ensure this is false so missing fields are validated
    }),
  );
  /**
   * Start listening on a port
   * - Uses PORT environment variable if defined
   * - Defaults to 3001 if PORT is undefined
   */
  await app.listen(process.env.PORT ?? 3001);

  console.log(
    `🚀 Application is running on: http://localhost:${process.env.PORT ?? 3001}`,
  );
}

// Run bootstrap
bootstrap();
