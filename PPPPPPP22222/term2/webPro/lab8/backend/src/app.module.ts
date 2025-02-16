import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TemperatureModule } from './temperature/temperature.module';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [TemperatureModule, UsersModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService],
  exports: [],
})
export class AppModule {}
