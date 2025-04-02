import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTeacherDto {
  @ApiProperty({ example: 'John' })
  @IsNotEmpty()
  @IsString()
  first_name?: string;

  @ApiProperty({ example: 'Doe' })
  @IsNotEmpty()
  @IsString()
  last_name?: string;

  @ApiProperty({ example: 'image.jpg' })
  @IsNotEmpty()
  @IsString()
  image?: string;

  @ApiProperty({ example: '+998953901313' })
  @IsNotEmpty()
  @IsString()
  phone?: string;

  @ApiProperty({ example: 'Teacher' })
  @IsNotEmpty()
  @IsString()
  bio?: string;
}
