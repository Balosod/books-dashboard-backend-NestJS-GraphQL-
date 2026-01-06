import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlExecutionContext } from '@nestjs/graphql';
import { ConfigService } from '@nestjs/config';

/**
 * GqlAuthGuard
 *
 * This guard adapts Passport's JWT AuthGuard to work with GraphQL.
 * Unlike REST, GraphQL does not expose the request object directly,
 * so we must manually extract it from the GraphQL execution context.
 *
 * This guard:
 * - Extracts the HTTP request from the GraphQL context
 * - Allows Passport to validate the JWT from the Authorization header
 * - Attaches the decoded user object to req.user
 */
@Injectable()
export class GqlAuthGuard extends AuthGuard('jwt') {
  getRequest(context: ExecutionContext) {
    // Convert the execution context into a GraphQL context
    const ctx = GqlExecutionContext.create(context);

    // Return the HTTP request so Passport can read headers (Authorization)
    return ctx.getContext().req;
  }
}

/**
 * AdminGuard
 *
 * This guard is responsible for role-based authorization.
 * It assumes authentication has already happened
 * (i.e. GqlAuthGuard runs before this guard).
 *
 * This guard:
 * - Reads the authenticated user from req.user
 * - Extracts roles from the Auth0 custom claim namespace
 * - Allows access only if the user has the "admin" role
 */
@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private config: ConfigService) {} // inject ConfigService

  canActivate(context: ExecutionContext): boolean {
    const ctx = GqlExecutionContext.create(context);
    const { user } = ctx.getContext().req;

    // Safety check: ensure user is authenticated
    if (!user) {
      throw new UnauthorizedException('Authentication required');
    }

    // Get the role namespace from environment
    const ROLE_NAMESPACE = this.config.get<string>(
      'ROLE_NAMESPACE',
      'https://myapp.com/roles',
    );

    // Extract roles array from the JWT payload
    const roles: string[] = user[ROLE_NAMESPACE] || [];

    /**
     * Returning false automatically causes NestJS to throw
     * a ForbiddenException (403).
     */
    return roles.includes('admin');
  }
}
