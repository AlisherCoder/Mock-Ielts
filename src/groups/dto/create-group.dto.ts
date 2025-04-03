import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupDto {
  @ApiProperty({ example: 'Group 1' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '2025-04-02' })
  @IsNotEmpty()
  @IsDateString()
  start_time: Date;

  @ApiProperty({ example: '2025-09-02' })
  @IsNotEmpty()
  @IsDateString()
  end_time: Date;

  @ApiProperty({ example: 'teacher id' })
  @IsNotEmpty()
  @IsString()
  teacher_id: string;

  @ApiProperty({ example: 'checker id' })
  @IsNotEmpty()
  @IsString()
  checker_id: string;
}
