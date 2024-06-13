import { ApiProperty } from "@nestjs/swagger";

export class LoginUserDTO {
  @ApiProperty({
    example: 'fdlajflk@mail.ru',
    description: 'User email',
  })
  email: string;
  @ApiProperty({
    example: 'fdklsajflsjfkdjaslfjaskl',
    description: 'User password',
  })
  password: string
}