import { Injectable } from '@nestjs/common';

@Injectable()
export class TemperatureService {
  convert(celsius: number) {
    return {
      celsius: celsius,
      fahrenheit: (celsius * 9.0) / 5 + 32,
    };
  }
}
