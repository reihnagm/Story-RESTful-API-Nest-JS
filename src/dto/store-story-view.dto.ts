import { IsInt, IsString, MinLength, ValidationArguments } from 'class-validator';

export class StoreStoryViewDto {
  @IsString()
  @MinLength(36, {
    message: (args: ValidationArguments) => {
      return `${args.property} is too short, maximum length is 36 characters`;
    }
  })
  uid: string;
  
  @IsString()
  @MinLength(10, {
    message: (args: ValidationArguments) => {
      if (args.value.length === 1) {
        return `${args.property} is too short, minimum length is 1 character`;
      } else {
        return `${args.property} is too short, minimum length is ${args.constraints[0]} characters`;
      }
    },
  })
  content: string;

  @IsString()
  @MinLength(36, {
    message: (args: ValidationArguments) => {
      return `${args.property} is too short, maximum length is 36 characters`;
    }
  })
  uid_content_type: string;

  @IsString()
  backgroundColor: string;
  
  @IsInt()
  isBackgroundColor: number;
  
  createdAt: any;
  
  updatedAt: any;
}

  