import { IsString, IsEmail, IsBoolean } from 'class-validator';

export class RegisterUserDTO {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsBoolean()
  seller: boolean;
}

export class LoginUserDTO {
  @IsEmail()
  email: string;

  @IsString()
  password: string;
}
