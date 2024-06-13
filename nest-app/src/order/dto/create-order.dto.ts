import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({
    example: 'ID',
    description: "user id"
  })
  userId: number;
  @ApiProperty({
    example: '1999',
    description: 'Total cost',
  })
  totalCost: number
  @ApiProperty({
    example: 'Russia',
    description: 'Order country',
  })
  country: string;
  @ApiProperty({
    example: 'John',
    description: 'Order name',
  })
  name: string;
  @ApiProperty({
    example: 'Smith',
    description: 'Order second name',
  })
  secondName: string;
  @ApiProperty({
    example: 'helloworld@mail.ru',
    description: 'Order email',
  })
  email: string;
  @ApiProperty({
    example: 'Krygina 16, 45',
    description: 'Order address',
  })
  address: string;
  @ApiProperty({
    example: '12345',
    description: 'Order postal code',
  })
  postalCode: number;
  @ApiProperty({
    example: 'Vladivostok',
    description: 'Order city',
  })
  city: string;
  @ApiProperty({
    example: '89146639501',
    description: 'Order phone number',
  })
  phoneNumber: string;
  @ApiProperty({
    example: '[ 1,2,3 ]',
    description: 'Order products ids',
  })
  products: number[];
}
