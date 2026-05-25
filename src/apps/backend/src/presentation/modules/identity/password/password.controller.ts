import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PasswordService } from './password.service';
import { CreatePasswordDto } from './dto/create-password.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';

@Controller('password')
export class PasswordController {
  constructor(private readonly passwordService: PasswordService) {}

  @Post()
  create(@Body() createPasswordDto: CreatePasswordDto) {
    return this.passwordService.create(createPasswordDto);
  }

  @Get()
  findAll() {
    return this.passwordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.passwordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePasswordDto: UpdatePasswordDto) {
    return this.passwordService.update(+id, updatePasswordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.passwordService.remove(+id);
  }
}
