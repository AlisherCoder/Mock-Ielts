import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateTeacherDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({ example: 'image.jpg' })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({ example: 'john@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+998953901313' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: '1234' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'Teacher' })
  @IsNotEmpty()
  @IsString()
  bio: string;

  @ApiProperty({ example: 'passport.pdf' })
  @IsNotEmpty()
  @IsString()
  passport: string;

  @ApiProperty({ example: 'sertificate.pdf' })
  @IsNotEmpty()
  @IsString()
  sertificate: string;
}

export class LoginTeacherDto {
  @ApiProperty({ example: 'john@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '1234' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
