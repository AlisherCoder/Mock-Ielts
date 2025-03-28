import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RegionsModule } from './regions/regions.module';
import { CentersModule } from './centers/centers.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [RegionsModule, CentersModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
