import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Request } from 'express';

@Injectable()
export class GroupsService {
  constructor(private prisma: PrismaService) {}

  async create(createGroupDto: CreateGroupDto, req: Request) {
    let user = req['user'];
    try {
      createGroupDto.start_time = new Date(createGroupDto.start_time);
      createGroupDto.end_time = new Date(createGroupDto.end_time);
      let data = await this.prisma.groups.create({
        data: { ...createGroupDto, center_id: user.id },
      });
      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      let data = await this.prisma.groups.findMany();
      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let data = await this.prisma.groups.findUnique({ where: { id } });
      if (!data) {
        return new NotFoundException('Not found data');
      }
      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(id: string, updateGroupDto: UpdateGroupDto) {
    try {
      let data = await this.prisma.groups.update({
        where: { id },
        data: updateGroupDto,
      });
      if (!data) {
        return new NotFoundException('Not found data');
      }
      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      let data = await this.prisma.groups.delete({ where: { id } });
      if (!data) {
        return new NotFoundException('Not found data');
      }
      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
