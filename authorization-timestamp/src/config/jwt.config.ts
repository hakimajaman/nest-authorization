import { JwtModuleAsyncOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleAsyncOptions = {
  useFactory: () => {
    return {
      secret: process.env.JWTSECRET,
      signOptions: {
        expiresIn: '168h',
      },
    };
  },
};
