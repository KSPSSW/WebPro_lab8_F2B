import { Controller, Query, Body, Param, Get, Post } from '@nestjs/common';
import { TemperatureService } from './temperature.service';

@Controller('temperature')
export class TemperatureController {
  constructor(private readonly temperatureService: TemperatureService) {}
  @Get('convert')
  convert(@Query('celsius') celsius: string) {
    return this.temperatureService.convert(parseFloat(celsius));
  }

  @Post('convert')
  convertByPost(@Body('celsius') celsius: number) {
    return this.temperatureService.convert(celsius);
  }

  @Get('convert/:celsius')
  convertParam(@Param('celsius') celsius: string) {
    return this.temperatureService.convert(parseFloat(celsius));
  }
}
