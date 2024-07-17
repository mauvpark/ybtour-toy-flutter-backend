import { Module } from '@nestjs/common';
import { TestGridController } from './testGrid/testGrid.controller';
import { TestGridService } from './testGrid/testGrid.service';

@Module({
  controllers: [TestGridController],
  providers: [TestGridService],
})
export class TestGridModule {}
