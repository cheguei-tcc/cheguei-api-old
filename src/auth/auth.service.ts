import { Injectable } from '@nestjs/common';
import { UserService } from '../account/services/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserInfoDto } from '../account/dtos/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<UserInfoDto> {
    const userInfo = await this.userService.login({
      username,
      password: pass,
    });
    return userInfo;
  }

  async login(user: UserInfoDto) {
    const payload = {
      name: user.name,
      cpf: user.cpf,
      roles: user.roles,
      ...(user.parent && { parent: user.parent }),
      ...(user.school && { school: user.school }),
    };

    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
