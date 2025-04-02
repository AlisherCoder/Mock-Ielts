import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginCenterDto {
  @ApiProperty({ example: 'alishersharipov670@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234' })
  @IsNotEmpty()
  @IsString()
  password: string;
}

export class ActivateCenterDto {
  @ApiProperty({ example: 'alishersharipov670@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345' })
  @IsNotEmpty()
  @IsString()
  otp: string;
}

export class SendOtpDto {
  @ApiProperty({ example: 'alishersharipov670@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;
}

export class RefreshDto {
  @ApiProperty({ example: 'refresh token' })
  @IsNotEmpty()
  @IsString()
  refreshToken: string;
}

export class ResetPasswordDto {
  @ApiProperty({ example: 'alishersharipov670@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '12345' })
  @IsNotEmpty()
  @IsString()
  otp: string;

  @ApiProperty({ example: '1234' })
  @IsNotEmpty()
  @IsString()
  new_Password: string;
}

export class ActivateDto {
  @ApiProperty({ example: 'center id' })
  @IsNotEmpty()
  @IsString()
  center_id: string;
}
