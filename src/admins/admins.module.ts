import { Module } from '@nestjs/common';
import { AdminsService } from './admins.service';
import { AdminsController } from './admins.controller';
import { CentersModule } from 'src/centers/centers.module';

@Module({
  imports: [CentersModule],
  controllers: [AdminsController],
  providers: [AdminsService],
})
export class AdminsModule {}
