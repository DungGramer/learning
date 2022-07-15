import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Res() response: any) {
    response.status(200).send('This action returns all coffees.');
  }

  @Get(':id')
  findOne(@Param('id ') id: string) {
    return `This action returns a #${id} coffee.`;
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() body: any) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return `This action updates a #${id} coffee.`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes a #${id} coffee.`;
  }
}
