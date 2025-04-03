import { Module } from '@nestjs/common';
import { TeachersService } from './teachers.service';
import { TeachersController } from './teachers.controller';
import { CentersModule } from 'src/centers/centers.module';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [CentersModule, MailModule],
  controllers: [TeachersController],
  providers: [TeachersService],
})
export class TeachersModule {}
