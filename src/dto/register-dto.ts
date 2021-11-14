import { IsEmail, IsPhoneNumber, IsString, MinLength, ValidationArguments } from 'class-validator';

export class RegisterDto {
  @IsString()
  @MinLength(36, {
    message: (args: ValidationArguments) => {
      return `${args.property} is too short, maximum length is 36 characters`;
    }
  })
  uid: string;

  @IsString()
  @MinLength(3, {
    message: (args: ValidationArguments) => {
      return `${args.property} is too short, minimum length is 3 characters`;
    }
  })
  displayName: string;

  @IsEmail()
  email: string;
  
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
  
  createdAt: any;
  
  updatedAt: any;
}

  