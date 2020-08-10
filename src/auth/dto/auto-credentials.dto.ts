import {
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class AuthCredentialsDto {
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  username: string;

  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'The password is too weak.',
  }) //validates that the pass has at least 1 uppercase char 1 lower case char and at least one number or special charachter
  password: string;
}
