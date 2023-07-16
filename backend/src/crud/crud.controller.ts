import {Body, Controller, Delete, Get, Param, Patch, Post, Put} from '@nestjs/common';
import {CrudService} from './crud.service';
import {CreateCrudDto} from './dto/create-crud.dto';
import {UpdateCrudDto} from './dto/update-crud.dto';
import {FilterDto} from "./dto/filter.dto";

@Controller('crud')
export class CrudController {
  constructor(private readonly crudService: CrudService) {
  }

  @Put()
  create(@Body() createCrudDto: CreateCrudDto) {
    return this.crudService.create(createCrudDto);
  }

  @Post()
  findAll(@Body() options: FilterDto) {
    return this.crudService.findFilter(options);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crudService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCrudDto: UpdateCrudDto) {
    return this.crudService.update(id, updateCrudDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crudService.remove(id);
  }
}
