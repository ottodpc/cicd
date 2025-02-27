import { Injectable } from '@nestjs/common';
import { UserContext } from '../entities/usercontext';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt } from 'passport-jwt';
import { Strategy } from 'passport-jwt';
import { passportJwtSecret } from 'jwks-rsa';
import { User } from '../models/user';
import { ConfigService } from '@nestjs/config';

import { Context } from '../entities/context';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    const issuer_url = configService.get('authentication.bearerJWT.issuerUrl');
    super({
      secretOrKeyProvider: passportJwtSecret({
        cache: true,
        rateLimit: true,
        jwksRequestsPerMinute: 5,
        jwksUri: `${issuer_url}`,
      }),

      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: ['RS256'],
    });
  }

  validate(user: any): Context {
    const isEnabled = this.configService.get('authentication.enabled');
    if (!isEnabled) {
      return new Context(new UserContext('anonymous'), false);
    }
    const typedObject = user as User;
    const userId = typedObject.userId ?? 'anonymous';
    return new Context(new UserContext(userId), true);
  }
}
