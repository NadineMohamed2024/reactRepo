import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, Res } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LogInDto } from './dto/login-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @UsePipes(ValidationPipe)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }
  @UsePipes(ValidationPipe)
  @Post('reg')
  Registeration(@Body() user:CreateUserDto){
    return this.usersService.Reg(user);
  }
  
  @UsePipes(ValidationPipe)
  @Post('log')
  Login(@Body() user:LogInDto , @Res({passthrough:true}) res){
    return this.usersService.Log(user , res);
  }



  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
