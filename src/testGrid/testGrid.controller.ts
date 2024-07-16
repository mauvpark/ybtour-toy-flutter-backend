import { Controller, Delete, Get, Patch, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { TestGridService } from 'src/testGrid/testGrid.service';

@Controller('testGrid')
export class TestGridController {
  constructor(private testGridService: TestGridService) {}

  @Get('/fetch')
  async fetch(@Req() req: Request) {
    try {
      return await this.testGridService.fetch(req);
    } catch (error) {
      return { status: error.status, code: error.code };
    }
  }

  @Post('/insert')
  async insert(@Req() req: Request) {
    try {
      return await this.testGridService.insert(req);
    } catch (error) {
      return { status: error.status, code: error.code };
    }
  }

  @Patch('/update')
  async update(@Req() req: Request) {
    try {
      return await this.testGridService.update(req);
    } catch (error) {
      return { status: error.status, code: error.code };
    }
  }

  @Delete('/delete')
  async delete(@Req() req: Request) {
    try {
      return await this.testGridService.delete(req);
    } catch (error) {
      return { status: error.status, code: error.code };
    }
  }
}
