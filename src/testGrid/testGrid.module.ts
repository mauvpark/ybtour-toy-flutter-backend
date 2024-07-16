import { Module } from '@nestjs/common';
import { TestGridController } from 'src/testGrid/testGrid.controller';
import { TestGridService } from 'src/testGrid/testGrid.service';

@Module({
  controllers: [TestGridController],
  providers: [TestGridService],
})
export class TestGridModule {}
