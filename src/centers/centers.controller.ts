import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CentersService } from './centers.service';
import { CreateCenterDto } from './dto/create-center.dto';
import { UpdateCenterDto } from './dto/update-center.dto';
import {
  ActivateCenterDto,
  ActivateDto,
  LoginCenterDto,
  RefreshDto,
  ResetPasswordDto,
  SendOtpDto,
} from './dto/login-center.dto';
import { Request } from 'express';
import { AuthGuard } from 'src/guards/auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role, Roles } from 'src/guards/roles.decorator';
import { RefreshGuard } from 'src/guards/refresh.guard';

@Controller('centers')
export class CentersController {
  constructor(private readonly centersService: CentersService) {}

  @Post('register')
  register(@Body() createCenterDto: CreateCenterDto) {
    return this.centersService.register(createCenterDto);
  }

  @Post('login')
  login(@Body() loginCenterDto: LoginCenterDto) {
    return this.centersService.login(loginCenterDto);
  }

  @Post('verify')
  activate(@Body() activateCenterDto: ActivateCenterDto) {
    return this.centersService.activate(activateCenterDto);
  }

  @Post('send-otp')
  sendOTP(@Body() sendOtpDto: SendOtpDto) {
    return this.centersService.sendOTP(sendOtpDto);
  }

  @UseGuards(RefreshGuard)
  @Post('refresh-token')
  refreshToken(@Body() refreshDto: RefreshDto, @Req() req: Request) {
    return this.centersService.refreshToken(req);
  }

  @Post('reset-password')
  resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.centersService.resetPassword(resetPasswordDto);
  }

  @Post('activate-center')
  activateCenter(@Body() activateDto: ActivateDto) {
    return this.centersService.activateCenter(activateDto);
  }

  @Get()
  findAll() {
    return this.centersService.findAll();
  }

  @Get('pending')
  findPending() {
    return this.centersService.findPending();
  }

  @Get('inactive')
  findInActive() {
    return this.centersService.findInActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.centersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCenterDto: UpdateCenterDto) {
    return this.centersService.update(id, updateCenterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.centersService.remove(id);
  }
}
