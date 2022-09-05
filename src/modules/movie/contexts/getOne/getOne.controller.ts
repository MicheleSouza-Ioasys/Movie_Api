import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'modules/auth/guards/jwt-auth.guards';
import { RolesGuard } from 'modules/auth/guards/role.guards';
import { Roles } from 'modules/auth/guards/roles.decorator';
import { roles } from 'shared/constants/roles';
import { GetOneMovieService } from './getOne.service';

@Controller('movies')
export class GetOneMovieController {
  constructor(private readonly getOneMovieService: GetOneMovieService) {}

  @ApiBearerAuth()
  @Get(':id')
  @Roles(roles.BASIC, roles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @HttpCode(HttpStatus.OK)
  @UsePipes(
    new ValidationPipe({
      transform: true,
    }),
  )
  async findOne(@Param('id') id: string) {
    return this.getOneMovieService.findOne(id);
  }
}
