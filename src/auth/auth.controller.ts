import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  Query,
  Request,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../common/dtos/pagination.dto';
import { AuthService } from './auth.service';
import { Auth } from './decorators/auth.decorator';
import { GetUserDecorator } from './decorators/get-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { InactivateUserDto } from './dto/inactivate-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
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

  @Get('get-user/:id')
  getUserById(@Param('id', ParseIntPipe) id: number){
    return this.authService.getUserById(id);
  }

  @Get('get-all-physicians')
  getAllPhysicians(){
    return this.authService.getAllPhysicians();
  }

  @Get('get-all-physiotherapists')
  getAllPhysiotherapist(){
    return this.authService.getAllPhysioTherapist();
  }

  @Get('get-physiotherapist/:id')
  getAllPhysiotherapistById(@Param('id', ParseIntPipe)id: number){
    return this.authService.getUserPhysiotherapistById(id);
  }

  //Report
  @ApiOperation({ summary: 'REPORTE -> Todas las consultas pertenecientes un Fisioterapeuta' })
  @Get('get-physiotherapist-therapies-report/:id')
  getAllPhysiotherapistByIdRep(@Param('id')id: number){
    return this.authService.getUserPhysioterapistByIdReport(id);
  }
  @Get('get-all-secretaries')
  getAllSecretaries(){
    return this.authService.getAllSecretaries();
  }

  @Get('get-physicianById/:id')
  getPhysicianById(@Param('id', ParseIntPipe) id: number) {
    return this.authService.getPhysicianById(id);
  }
  //Report
  @Get('get-physician/:id')
  @ApiOperation({ summary: 'REPORTE -> Todas las consultas pertenecientes un medico general' })
  getUserPhysicianById(@Param('id', ParseIntPipe) id: number) {
    return this.authService.getUserPhysicianById(id);
  }

  //Report
  @Get('get-athletes-count-discipline/:id')
  @ApiOperation({ summary: 'REPORTE -> Trae un conteo de todas las consultas pertenecientes a cada disciplina' })
  getAthletesCountDiscipline(@Param('id', ParseIntPipe) id: number){
    return this.authService.getAthletesWithDisciplineCount(id)
  }

  @Get('get-athletes-count-discipline-therapies/:id')
  @ApiOperation({ summary: 'REPORTE -> Trae un conteo de todas las terapias pertenecientes a cada disciplina' })
  getAthletesCountDisciplineTherapies(@Param('id', ParseIntPipe) id: number){
    return this.authService.getTherapiesOfAthletesWithDisciplineCount(id)
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

  @Patch('update-user/:id')
  @HttpCode(HttpStatus.OK)
  @Auth(Role.Admin)
  updateUser(@Param('id', ParseIntPipe) id: number, @Body() updateUserDto: UpdateUserDto){
    return this.authService.updateUser(id, updateUserDto);
  }

}
