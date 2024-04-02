import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiBasicAuth, ApiTags } from '@nestjs/swagger';
import { Public } from '../common/decorators/public.decorator';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../common/enums/role.enum';
import { AuthService } from './auth.service';

@ApiTags('users')
@Roles(Role.ADMIN)
@Controller('internal/users')
export class UsersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post()
  @Public()
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Get()
  @ApiBasicAuth()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiBasicAuth()
  findOne(@Param('id') id: number) {
    console.log(typeof id);
    return this.usersService.findOne({ where: { id } });
  }

  @Patch(':id')
  @ApiBasicAuth()
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  @ApiBasicAuth()
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
