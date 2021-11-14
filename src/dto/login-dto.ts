import { IsPhoneNumber, IsString, MinLength, ValidationArguments } from 'class-validator';

export class LoginDto {  
  @IsPhoneNumber('ID')
  @MinLength(8, {
    message: (args: ValidationArguments) => {
      if (args.value.length === 1) {
        return `${args.property} is too short, minimum length is 1 character`;
      } else {
        return `${args.property} is too short, minimum length is ${args.constraints[0]} characters`;
      }
    },
  })
  phone: number;

  @IsString()
  @MinLength(8, {
    message: (args: ValidationArguments) => {
      return `${args.property} is too short, maximum length is 8 characters`;
    }
  })
  password: string;
}

  