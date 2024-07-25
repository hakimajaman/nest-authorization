import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserDto } from 'src/dtos/user/CreateUser.dto';
import { UserServices } from 'src/services/user.service';
import { hashing } from 'src/utils/hashing';
import { ErrorResponse, SuccessResponse } from 'src/utils/response';

@Controller('users')
export class UserControllers {
  constructor(private userServices: UserServices) {}

  @Post()
  @UsePipes(ValidationPipe)
  async registerUser(@Body() createUserDto: CreateUserDto) {
    let password = await hashing(createUserDto.password);
    let email = createUserDto.email.toLowerCase();

    try {
      let newUser = await this.userServices.createUser({
        ...createUserDto,
        email,
        password,
      });

      return SuccessResponse(201, 'User created!', newUser);
    } catch (err) {
      return ErrorResponse(400, err);
    }
  }

  @Get()
  async getAllUsers() {
    try {
      const users = await this.userServices.getUsers();
      return SuccessResponse(200, 'Users fetched!', users);
    } catch (err) {
      return ErrorResponse(400, err);
    }
  }

  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    try {
      const user = await this.userServices.getUserById(id);
      if (!user) return ErrorResponse(404, 'User not found');
      return SuccessResponse(200, 'User fetched!', user);
    } catch (err) {
      return ErrorResponse(400, err);
    }
  }
}
