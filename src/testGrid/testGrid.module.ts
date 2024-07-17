import { Module } from '@nestjs/common';
import { TestGridController } from './testGrid.controller';
import { TestGridService } from './testGrid.service';

@Module({
  controllers: [TestGridController],
  providers: [TestGridService],
})
export class TestGridModule {}
