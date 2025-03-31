import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateCenterDto {
  @ApiProperty({ example: 'Registon' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({ example: '+998991234567' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({ example: 'image.jpg' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  image?: string;

  @ApiProperty({ example: 'Registon learning center' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ example: 'Chilonzor 20, street 1' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  location?: string;

  @ApiProperty({ example: 'region id' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  region_id?: string;
}
