import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateTeacherDto } from './dto/create-teacher.dto';
import { UpdateTeacherDto } from './dto/update-teacher.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class TeachersService {
  constructor(private prisma: PrismaService) {}

  create(createTeacherDto: CreateTeacherDto) {
    let { email, password } = createTeacherDto;
    try {

    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  findAll() {
    return `This action returns all teachers`;
  }

  findOne(id: string) {
    return `This action returns a #${id} teacher`;
  }

  update(id: string, updateTeacherDto: UpdateTeacherDto) {
    return `This action updates a #${id} teacher`;
  }

  remove(id: string) {
    return `This action removes a #${id} teacher`;
  }
}
