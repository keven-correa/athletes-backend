import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, SetMetadata, HttpCode, HttpStatus, ParseIntPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { GetUserDecorator } from './decorators/get-user.decorator';
import { RoleProtected } from './decorators/role-protected.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { InactivateUserDto } from './dto/inactivate-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { Role } from './enums/user.roles';
import { UserRoleGuard } from './guards/user-role.guard';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Auth(Role.Admin)
  create(@Body() createUserDto: CreateUserDto, @GetUserDecorator() user: User) {
    return this.authService.create(createUserDto, user);
  }

  @Post('login')
  login(@Body() loginUserDto: LoginUserDto){
    return this.authService.login(loginUserDto);
  }

  @Get('list-users')
  @Auth(Role.Admin)
  getAllUsers(){
    return this.authService.getAllUsers();
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @Auth(Role.Admin)
  changeStatusUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() inactivateUserDto: InactivateUserDto,
    @GetUserDecorator() user: User,
  ){
    return this.authService.inactivateUser(id, inactivateUserDto)
  }

  // @Get('private')
  // @UseGuards(AuthGuard())
  // testingPrivateRoute(@GetUserDecorator('email') user: User){
  //   console.log(user)
  //   return {
  //     message: 'Hola mundo private'
  //   }
  // }
  
  // @Get('private2')
  // // @SetMetadata('role', Role.Admin)
  // @RoleProtected(Role.Admin, Role.Secretary)
  // @UseGuards(AuthGuard(), UserRoleGuard)
  // privateRoute2(@GetUserDecorator() user: User){
  //   return {user}
  // }

  // @Get('private3')
  // @Auth(Role.Admin)
  // privateRoute3(@GetUserDecorator() user: User){
  //   return {user}
  // }

}
