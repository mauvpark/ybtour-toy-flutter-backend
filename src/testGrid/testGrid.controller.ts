import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthAuthorizationDto } from '../auth/model/dto/authorization.dto';
import { TestGridDeleteDto } from './model/dto/delete.dto';
import { TestGridInsertDto } from './model/dto/insert.dto';
import { TestGridUpdateDto } from './model/dto/update.dto';
import { TestGridService } from './testGrid.service';

@ApiTags('TestGrid')
@ApiBearerAuth('Authorization')
@Controller('testGrid')
export class TestGridController {
  constructor(private testGridService: TestGridService) {}

  @ApiOperation({ description: '데이터베이스 GET TEST API' })
  @Get('/fetch')
  async fetch(
    @Headers()
    authorizationDto: AuthAuthorizationDto,
  ) {
    console.log('header', authorizationDto);
    try {
      return await this.testGridService.fetch(authorizationDto);
    } catch (error) {
      return { status: error.status, code: error.code };
    }
  }

  @Post('/insert')
  async insert(
    @Headers() authorizationDto: AuthAuthorizationDto,
    @Body() insertDto: TestGridInsertDto,
  ) {
    try {
      return await this.testGridService.insert(authorizationDto, insertDto);
    } catch (error) {
      return { status: error.status, code: error.code };
    }
  }

  @Patch('/update')
  async update(
    @Headers() authorizationDto: AuthAuthorizationDto,
    @Body() updateDto: TestGridUpdateDto,
  ) {
    try {
      return await this.testGridService.update(authorizationDto, updateDto);
    } catch (error) {
      return { status: error.status, code: error.code };
    }
  }

  @Delete('/delete')
  async delete(
    @Headers() authorizationDto: AuthAuthorizationDto,
    @Body() deleteDto: TestGridDeleteDto,
  ) {
    try {
      return await this.testGridService.delete(authorizationDto, deleteDto);
    } catch (error) {
      return { status: error.status, code: error.code };
    }
  }
}
