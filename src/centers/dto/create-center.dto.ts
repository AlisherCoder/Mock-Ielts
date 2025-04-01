import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class CreateCenterDto {
  @ApiProperty({ example: 'Registon' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'alishersharipov670@gmail.com' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ example: '+998991234567' })
  @IsNotEmpty()
  @IsString()
  phone: string;

  @ApiProperty({ example: '1234' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'image.jpg' })
  @IsNotEmpty()
  @IsString()
  image: string;

  @ApiProperty({ example: 'Registon learning center' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: 'sertificate.pdf' })
  @IsNotEmpty()
  @IsString()
  document: string;

  @ApiProperty({ example: 'Chilonzor 20, street 1' })
  @IsNotEmpty()
  @IsString()
  location: string;

  @ApiProperty({ example: '0552ec15-a82a-4319-a234-cd02dd25598e' })
  @IsNotEmpty()
  @IsString()
  region_id: string;
}
