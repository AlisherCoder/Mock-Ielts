import { Injectable } from '@nestjs/common';
import { CreateCenterDto } from './dto/create-center.dto';
import { UpdateCenterDto } from './dto/update-center.dto';

@Injectable()
export class CentersService {
  register(createCenterDto: CreateCenterDto) {
    return 'This action adds a new center';
  }

  findAll() {
    return `This action returns all centers`;
  }

  findOne(id: string) {
    return `This action returns a #${id} center`;
  }

  update(id: string, updateCenterDto: UpdateCenterDto) {
    return `This action updates a #${id} center`;
  }

  remove(id: string) {
    return `This action removes a #${id} center`;
  }
}
