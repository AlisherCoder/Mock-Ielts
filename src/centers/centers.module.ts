import { Module } from '@nestjs/common';
import { CentersService } from './centers.service';
import { CentersController } from './centers.controller';
import { JwtModule } from '@nestjs/jwt';
import { MailModule } from 'src/mail/mail.module';

@Module({
  imports: [MailModule, JwtModule.register({ global: true })],
  controllers: [CentersController],
  providers: [CentersService],
})
export class CentersModule {}
