import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateAdminDto, LoginAdminDto } from './dto/create-admin.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { CentersService } from 'src/centers/centers.service';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminsService {
  constructor(
    private centerService: CentersService,
    private prisma: PrismaService,
  ) {}

  async create(createAdminDto: CreateAdminDto) {
    let { email, password } = createAdminDto;
    try {
      let admin = await this.prisma.admins.findUnique({ where: { email } });
      if (admin) {
        return new ConflictException('This email already exists');
      }

      let hashpass = bcrypt.hashSync(password, 10);
      let newAdmin = await this.prisma.admins.create({
        data: { ...createAdminDto, password: hashpass },
      });

      return { data: newAdmin };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async login(loginAdminDto: LoginAdminDto) {
    let { email, password } = loginAdminDto;
    try {
      let admin = await this.prisma.admins.findUnique({ where: { email } });
      if (!admin) {
        return new UnauthorizedException('Unauthorized');
      }

      let match = bcrypt.compareSync(password, admin.password);
      if (!match) {
        return new BadRequestException('Password or email is wrong');
      }

      let accessToken = this.centerService.genAccessToken({
        id: admin.id,
        role: admin.role,
      });

      let refreshToken = this.centerService.genRefreshToken({
        id: admin.id,
        role: admin.role,
      });

      return { accessToken, refreshToken };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      let data = await this.prisma.admins.findMany();
      if (!data.length) {
        return new BadRequestException('Not found admins');
      }
      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let data = await this.prisma.admins.findUnique({ where: { id } });
      if (!data) {
        return new BadRequestException('Not found admin');
      }
      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(id: string, updateAdminDto: UpdateAdminDto) {
    try {
      let admin = await this.prisma.admins.findUnique({ where: { id } });
      if (!admin) {
        return new BadRequestException('Not found admin');
      }

      if (updateAdminDto.password) {
        updateAdminDto.password = bcrypt.hashSync(updateAdminDto.password, 10);
      }

      let data = await this.prisma.admins.update({
        where: { id },
        data: updateAdminDto,
      });

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      let admin = await this.prisma.admins.findUnique({ where: { id } });
      if (!admin) {
        return new BadRequestException('Not found admin');
      }

      let data = await this.prisma.admins.delete({
        where: { id },
      });

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
