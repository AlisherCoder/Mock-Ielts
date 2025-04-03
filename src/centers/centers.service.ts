import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import {
  ActivateCenterDto,
  ActivateDto,
  LoginCenterDto,
  ResetPasswordDto,
  SendOtpDto,
} from './dto/login-center.dto';
import { CreateCenterDto } from './dto/create-center.dto';
import { UpdateCenterDto } from './dto/update-center.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { totp } from 'otplib';
import { Request } from 'express';
import * as bcrypt from 'bcrypt';

totp.options = { step: 600, digits: 5 };

@Injectable()
export class CentersService {
  private otpsecret = process.env.OTPKEY;
  private accsecret = process.env.ACCKEY;
  private refsecret = process.env.REFKEY;
  constructor(
    private prisma: PrismaService,
    private mailService: MailService,
    private jwtService: JwtService,
  ) {}

  async register(createCenterDto: CreateCenterDto) {
    let { email, password, region_id } = createCenterDto;
    try {
      let center = await this.prisma.centers.findUnique({ where: { email } });
      if (center) {
        return new ConflictException('This email already exists');
      }

      let region = await this.prisma.regions.findUnique({
        where: { id: region_id },
      });
      if (!region) {
        return new NotFoundException('Not found region');
      }

      let hashpass = bcrypt.hashSync(password, 10);
      await this.prisma.centers.create({
        data: { ...createCenterDto, password: hashpass },
      });

      let otp = totp.generate(this.otpsecret + email);
      await this.mailService.sendMail(
        email,
        'Activate account',
        `Code for verify account - ${otp}`,
      );

      return {
        data: 'Registered, please check your email and verify your account',
      };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async login(loginCenterDto: LoginCenterDto) {
    let { email, password } = loginCenterDto;
    try {
      let center = await this.prisma.centers.findUnique({ where: { email } });
      if (!center) {
        return new UnauthorizedException('Unauthorized');
      }

      let match = bcrypt.compareSync(password, center.password);
      if (!match) {
        return new BadRequestException('Email or password is wrong');
      }

      if (center.status != 'PENDING') {
        return new BadRequestException(
          'Your account is not active, please activate your account',
        );
      }

      let accessToken = this.genAccessToken({
        id: center.id,
        role: center.role,
      });

      let refreshToken = this.genRefreshToken({
        id: center.id,
        role: center.role,
      });

      return { accessToken, refreshToken };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async activate(activateCenterDto: ActivateCenterDto) {
    let { email, otp } = activateCenterDto;
    try {
      let isValid = totp.check(otp, this.otpsecret + email);
      if (!isValid) {
        return new BadRequestException('Email or otp is wrong');
      }

      let center = await this.prisma.centers.update({
        data: { status: 'PENDING' },
        where: { email },
      });

      return { data: 'Your account has been successfully activated.', center };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async sendOTP(sendOtpDto: SendOtpDto) {
    let { email } = sendOtpDto;
    try {
      let center = await this.prisma.centers.findUnique({ where: { email } });
      if (!center) {
        return new UnauthorizedException('Unauthorized');
      }

      let otp = totp.generate(this.otpsecret + email);
      await this.mailService.sendMail(
        email,
        'One time password',
        `OTP code - ${otp}`,
      );

      return { data: 'Code sent to your email', otp };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async refreshToken(req: Request) {
    let user = req['user'];
    try {
      let accessToken = this.genAccessToken({
        id: user.id,
        role: user.role,
      });

      return { accessToken };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto) {
    let { email, otp, new_Password } = resetPasswordDto;
    try {
      let isValid = totp.check(otp, this.otpsecret + email);
      if (!isValid) {
        return new BadRequestException('Email or otp is wrong');
      }

      let hashpass = bcrypt.hashSync(new_Password, 10);
      await this.prisma.centers.update({
        data: { password: hashpass },
        where: { email },
      });

      return { data: 'Your password updated' };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async getMydata(req: Request) {
    let center = req['user'];
    try {
      let data = await this.prisma.centers.findUnique({
        where: { id: center.id },
      });
      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      let data = await this.prisma.centers.findMany({
        where: { status: 'ACTIVE' },
      });

      if (!data.length) {
        return new NotFoundException('Not found centers');
      }

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findPending() {
    try {
      let data = await this.prisma.centers.findMany({
        where: { status: 'PENDING' },
      });

      if (!data.length) {
        return new NotFoundException('Not found centers');
      }

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findInActive() {
    try {
      let data = await this.prisma.centers.findMany({
        where: { status: 'INACTIVE' },
      });

      if (!data.length) {
        return new NotFoundException('Not found centers');
      }

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async activateCenter(activateDto: ActivateDto) {
    let { center_id } = activateDto;
    try {
      let center = await this.prisma.centers.findUnique({
        where: { id: center_id },
      });

      if (!center) {
        return new NotFoundException('Not found centers');
      }

      let data = await this.prisma.centers.update({
        where: { id: center_id },
        data: { status: 'ACTIVE' },
      });

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let data = await this.prisma.centers.findUnique({ where: { id } });

      if (!data) {
        return new NotFoundException('Not found center');
      }

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(id: string, updateCenterDto: UpdateCenterDto) {
    try {
      let center = await this.prisma.centers.findUnique({ where: { id } });

      if (!center) {
        return new NotFoundException('Not found center');
      }

      let data = await this.prisma.centers.update({
        data: updateCenterDto,
        where: { id },
      });

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      let center = await this.prisma.centers.findUnique({ where: { id } });

      if (!center) {
        return new NotFoundException('Not found center');
      }

      let data = await this.prisma.centers.delete({ where: { id } });

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  genRefreshToken(payload: object) {
    return this.jwtService.sign(payload, {
      secret: this.refsecret,
      expiresIn: '7d',
    });
  }

  genAccessToken(payload: object) {
    return this.jwtService.sign(payload, {
      secret: this.accsecret,
      expiresIn: '12h',
    });
  }
}
