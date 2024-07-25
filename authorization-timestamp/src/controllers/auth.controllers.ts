import { Body, Controller, Post } from '@nestjs/common';
import { AuthServices } from 'src/services/auth.service';
import { BrowserServices } from 'src/services/browser.service';
import { hashing, matching } from 'src/utils/hashing';
import { ErrorResponse, SuccessResponse } from 'src/utils/response';

@Controller('auth')
export class AuthControllers {
  constructor(
    private authServices: AuthServices,
    private browserServices: BrowserServices,
  ) {}

  @Post()
  async loginAuth(
    @Body()
    {
      email,
      password,
      browserId,
      browserName,
      browserOS,
    }: {
      email: string;
      password: string;
      browserId?: number;
      browserName: string;
      browserOS: string;
    },
  ) {
    if (!email || !password)
      return ErrorResponse(401, 'Invalid email or password');

    try {
      const login = await this.authServices.loginUser(email, password);
      if (!login) return ErrorResponse(401, 'Invalid email or password');

      const decoded = await this.authServices.decodeToken(login);
      const encryptedToken = await hashing(login);

      if (!browserId) {
        if (!browserName || !browserOS) {
          return ErrorResponse(401, 'Browser not detected!');
        }
        const browser = await this.browserServices.createBrowser(decoded.id, {
          name: browserName,
          os: browserOS,
        });
        const authLog = await this.authServices.createAuthLog(
          decoded.id,
          browser.id,
          encryptedToken,
        );

        return SuccessResponse(200, 'Login successful!', {
          token: login,
          browserId: browser.id,
          authLogId: authLog.id,
        });
      }

      const findBrowser = await this.browserServices.getBrowserByDetails(
        browserId,
        browserName,
        browserOS,
      );

      if (!findBrowser) {
        if (!browserName || !browserOS) {
          return ErrorResponse(401, 'Browser not detected!');
        }
        const browser = await this.browserServices.createBrowser(decoded.id, {
          name: browserName,
          os: browserOS,
        });
        const authLog = await this.authServices.createAuthLog(
          decoded.id,
          browser.id,
          encryptedToken,
        );

        return SuccessResponse(200, 'Login successful!', {
          token: login,
          browserId: browser.id,
          authLogId: authLog.id,
        });
      }

      const findUser = findBrowser.users.find((id) => id.userId === decoded.id);
      if (!findUser) {
        await this.browserServices.addUserOnBrowser(browserId, decoded.id);
        const authLog = await this.authServices.createAuthLog(
          decoded.id,
          browserId,
          encryptedToken,
        );

        return SuccessResponse(200, 'Login successful!', {
          token: login,
          browserId,
          authLogId: authLog.id,
        });
      }

      const authLog = await this.authServices.createAuthLog(
        decoded.id,
        browserId,
        encryptedToken,
      );

      return SuccessResponse(200, 'Login successful!', {
        token: login,
        browserId: findBrowser.id,
        authLogId: authLog.id,
      });
    } catch (err) {
      return ErrorResponse(401, err);
    }
  }

  @Post()
  async authorizeAuth(
    @Body()
    {
      token,
      browserId,
      authLogId
    }: {
      token: string,
      browserId: number,
      authLogId: number
    }
  ) {
    if (!token || !browserId || !authLogId) {
      return ErrorResponse(401, 'Unauthorized');
    }

    try {
      const decoded = await this.authServices.decodeToken(token)

      const findUserOnBrowser = await this.browserServices.getUserOnBrowser(browserId, decoded.id)
      if (!findUserOnBrowser) {
        return ErrorResponse(401, 'Unauthorized');
      }

      const findAuthLog = await this.authServices.getAuthLogByDetails(authLogId, decoded.id)
      if (!findAuthLog) {
        return ErrorResponse(401, 'Unauthorized');
      }

      const isTokenMatching = await matching(token, findAuthLog.token);
      if (!isTokenMatching) {
        return ErrorResponse(401, 'Unauthorized');
      }


    } catch (err) {
      return ErrorResponse(401, err)
    }
  }
}
