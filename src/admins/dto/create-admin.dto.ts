import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum AdminRole {
  ADMIN = 'ADMIN',
  SUPERADMIN = 'SUPER_ADMIN',
}

export class CreateAdminDto {
  @ApiProperty({ example: 'Alex' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'alex@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'SUPER_ADMIN' })
  @IsNotEmpty()
  @IsEnum(AdminRole)
  role: AdminRole;
}

export class LoginAdminDto {
  @ApiProperty({ example: 'alex@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
