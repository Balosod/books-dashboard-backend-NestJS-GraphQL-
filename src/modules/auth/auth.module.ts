import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  /**
   * PassportModule is used to handle authentication strategies.
   * Here we register the JWT strategy as the default strategy
   * so that any guard using Passport will automatically use JWT.
   *
   * Auth0 issues JWT access tokens, which are validated by JwtStrategy.
   */
  imports: [
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
  ],

  /**
   * JwtStrategy contains the logic for validating JWT tokens
   * (issuer, audience, signature, expiration, etc.).
   * It is provided here so NestJS can inject and use it in guards.
   */

  providers: [JwtStrategy],

  /**
   * Exporting PassportModule allows other modules (e.g. BooksModule)
   * to use authentication guards like GqlAuthGuard.
   */

  exports: [PassportModule],
})
export class AuthModule {}
