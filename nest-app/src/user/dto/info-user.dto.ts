import { ApiProperty } from "@nestjs/swagger";

export class InfoUserDto {
  @ApiProperty({
    example: 'Elizavetha',
    description: 'User name',
  })
  name: string;
  @ApiProperty({
    example: 'Surmach',
    description: 'User second name',
  })
  secondName: string;
  @ApiProperty({
    example: 'fdlajflk@mail.ru',
    description: 'User email',
  })
  email: string;
  @ApiProperty({
    example: 'Admin',
    description: 'Role',
  })
  role: string;
}