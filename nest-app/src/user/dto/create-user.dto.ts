import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
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
    example: 'fdklsajflsjfkdjaslfjaskl',
    description: 'User password',
  })
  password: string;
  @ApiProperty({
    example: '20.02.2002',
    description: 'User birthday',
  })
  birthday: string;
}