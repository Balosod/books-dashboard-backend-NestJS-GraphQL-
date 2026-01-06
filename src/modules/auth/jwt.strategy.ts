import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { ConfigService } from '@nestjs/config';
/**
 * JwtStrategy
 *
 * This strategy validates JWT access tokens issued by Auth0.
 * It uses Auth0's JWKS endpoint to dynamically fetch public keys
 * for verifying RS256-signed tokens.
 *
 * If the token is valid, the decoded payload is attached to `req.user`.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      /**
       * Fetch the signing key from Auth0 using JWKS.
       * This allows key rotation without redeploying your app.
       */
      secretOrKeyProvider: passportJwtSecret({
        cache: true, // Cache signing keys
        rateLimit: true, // Prevent too many JWKS requests
        jwksRequestsPerMinute: 5, // Max requests per minute,
        jwksUri: `${config.get('AUTH0_DOMAIN')}/.well-known/jwks.json`,
        // jwksUri:
        //   'https://dev-f0ki7tsfhhvakmfg.us.auth0.com/.well-known/jwks.json',
      }),

      /**
       * The expected audience (API identifier in Auth0).
       * The token must be issued specifically for this API.
       */
      audience: config.get('AUTH0_AUDIENCE'),

      /**
       * The expected token issuer (Auth0 domain).
       * Must exactly match the `iss` claim in the JWT.
       */
      issuer: `${config.get('AUTH0_DOMAIN')}/`,

      /**
       * Auth0 signs access tokens using RS256 by default.
       */
      algorithms: ['RS256'],

      /**
       * Extract JWT from Authorization header:
       * Authorization: Bearer <token>
       */
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  /**
   * validate()
   *
   * This method is called ONLY after:
   * - The JWT signature is valid
   * - The token is not expired
   * - The issuer and audience match
   *
   * Whatever is returned here will be assigned to `req.user`.
   */
  async validate(payload: any) {
    // console.log('✅ JWT verified:', payload);
    return payload;
  }
}
