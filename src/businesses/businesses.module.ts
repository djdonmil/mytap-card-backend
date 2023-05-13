import { Module } from '@nestjs/common';
import { BusinessesController } from './businesses.controller';
import { BusinessesService } from './businesses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BusinessRepository } from './businesses.repository';

@Module({
  imports:[
    TypeOrmModule.forFeature([BusinessRepository])
  ],
  controllers: [BusinessesController],
  providers: [BusinessesService]
})
export class BusinessesModule {}
