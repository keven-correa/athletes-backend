import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
  SetMetadata,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { GetUserDecorator } from './decorators/get-user.decorator';
import { RoleProtected } from './decorators/role-protected.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { InactivateUserDto } from './dto/inactivate-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { User } from './entities/user.entity';
import { Role } from './enums/user.roles';

@ApiTags('Authentication and users management')
@ApiBearerAuth('Bearer')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Auth(Role.Admin)
  @ApiOperation({ summary: 'Register a new user' })
  create(@Body() createUserDto: CreateUserDto, @GetUserDecorator() user: User) {
    return this.authService.create(createUserDto, user);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login with email and password' })
  login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('list-users')
  @Auth(Role.Admin)
  @ApiOperation({ summary: 'List of all registered users' })
  getAllUsers(@Query() paginationDto: PaginationDto) {
    return this.authService.getAllUsers(paginationDto);
  }

  @Get('get-all-physicians')
  getAllPhysicians(){
    return this.authService.getAllPhysicians();
  }

  @Get('get-all-physiotherapists')
  getAllPhysiotherapist(){
    return this.authService.getAllPhysioTherapist();
  }

  @Get('get-all-secretaries')
  getAllSecretaries(){
    return this.authService.getAllSecretaries();
  }

  @Get('get-physician/:id')
  getUserPhysicianById(@Param('id', ParseIntPipe) id: number) {
    return this.authService.getUserPhysicianById(id);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  @Auth(Role.Admin)
  @ApiOperation({ summary: 'Change the status of a user or any user data' })
  changeStatusUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() inactivateUserDto: InactivateUserDto,
    @GetUserDecorator() user: User,
  ) {
    return this.authService.inactivateUser(id, inactivateUserDto);
  }
}
