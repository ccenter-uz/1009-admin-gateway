import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { FtpService } from './ftp.service';
import { scriptResponse } from 'types/organization/organization/dto/create-exel.dto';

@ApiBearerAuth()
@ApiTags('ftp')
@Controller('ftp')
export class FtpController {
  constructor(private readonly ftpService: FtpService) {}

  @Post('create-organizations')
  @ApiBody({ type: scriptResponse })
  @HttpCode(HttpStatus.CREATED)
  async readExcel(@Body() rows: any): Promise<any> {
    return this.ftpService.readExcel(rows);
  }
}
