import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class RegionsService {
  constructor(private prisma: PrismaService) {}

  async create(createRegionDto: CreateRegionDto) {
    try {
      let region = await this.prisma.regions.findUnique({
        where: {
          name: createRegionDto.name,
        },
      });

      if (region) {
        return new ConflictException('Region already exists');
      }

      let newRegion = await this.prisma.regions.create({
        data: createRegionDto,
      });

      return { data: newRegion };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findAll() {
    try {
      let data = await this.prisma.regions.findMany();

      if (!data) {
        return new BadRequestException('No regions found');
      }

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async findOne(id: string) {
    try {
      let data = await this.prisma.regions.findUnique({
        where: { id },
        include: { centers: true },
      });

      if (!data) {
        return new BadRequestException('Not found region');
      }

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async update(id: string, updateRegionDto: UpdateRegionDto) {
    try {
      let region = await this.prisma.regions.findUnique({
        where: { id },
      });

      if (!region) {
        return new BadRequestException('Not found region');
      }

      let existsregion = await this.prisma.regions.findUnique({
        where: {
          name: updateRegionDto.name,
        },
      });

      if (existsregion) {
        return new ConflictException('Region already exists');
      }

      let data = await this.prisma.regions.update({
        where: { id },
        data: updateRegionDto,
      });

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }

  async remove(id: string) {
    try {
      let region = await this.prisma.regions.findUnique({
        where: { id },
      });

      if (!region) {
        return new BadRequestException('Not found region');
      }

      let data = await this.prisma.regions.delete({
        where: { id },
      });

      return { data };
    } catch (error) {
      return new BadRequestException(error.message);
    }
  }
}
