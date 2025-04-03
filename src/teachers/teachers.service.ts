import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateTeacherDto, LoginTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';
import { CentersService } from 'src/centers/centers.service';
import { SendOtpDto } from 'src/centers/dto/login-center.dto';
import { MailService } from 'src/mail/mail.service';
import * as bcrypt from 'bcrypt';
import { totp } from 'otplib';

@Injectable()
export class TeachersService {
  private otpsecret = process.env.OTPKEY;

  constructor(
    private prisma: PrismaService,
    private centerService: CentersService,
    private mailService: MailService,
  ) {}

  async create(createTeacherDto: CreateTeacherDto, req: Request) {
    let user = req['user'];
    let { email, password } = createTeacherDto;
    try {
      let teacher = await this.prisma.teachers.findUnique({ where: { email } });
      if (teacher) {
        return new ConflictException('This email already exists');
      }

      let hashpass = bcrypt.hashSync(password, 10);
      let newTeacher = await this.prisma.teachers.create({
        data: { ...createTeacherDto, password: hashpass, center_id: user.id },
      });

      return { data: newTeacher };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async login(loginTeacherDto: LoginTeacherDto) {
    let { email, password } = loginTeacherDto;
    try {
      let teacher = await this.prisma.teachers.findUnique({ where: { email } });
      if (!teacher) {
        return new UnauthorizedException('Unauthorized');
      }

      let match = bcrypt.compareSync(password, teacher.password);
      if (!match) {
        return new BadRequestException('Password or email is wrong');
      }

      let accessToken = this.centerService.genAccessToken({
        id: teacher.id,
        role: teacher.role,
      });

      let refreshToken = this.centerService.genRefreshToken({
        id: teacher.id,
        role: teacher.role,
      });

      return { accessToken, refreshToken };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async getMydata(req: Request) {
    let teacher = req['user'];
    try {
      let data = await this.prisma.teachers.findUnique({
        where: { id: teacher.id },
      });
      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      let data = await this.prisma.teachers.findMany();
      if (!data.length) {
        return new NotFoundException('Not found teachers');
      }

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let teacher = await this.prisma.teachers.findUnique({ where: { id } });
      if (!teacher) {
        return new NotFoundException('Not found teacher');
      }

      return { data: teacher };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(id: string, updateTeacherDto: UpdateTeacherDto) {
    try {
      let teacher = await this.prisma.teachers.findUnique({ where: { id } });
      if (!teacher) {
        return new NotFoundException('Not found teacher');
      }

      if (updateTeacherDto.password) {
        updateTeacherDto.password = bcrypt.hashSync(
          updateTeacherDto.password,
          10,
        );
      }

      let data = await this.prisma.teachers.update({
        where: { id },
        data: updateTeacherDto,
      });

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      let teacher = await this.prisma.teachers.findUnique({ where: { id } });
      if (!teacher) {
        return new NotFoundException('Not found teacher');
      }

      let data = await this.prisma.teachers.delete({ where: { id } });

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
