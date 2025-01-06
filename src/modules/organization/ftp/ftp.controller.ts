import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { FtpService } from './ftp.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('ftp')
@Controller('ftp')
export class FtpController {
  constructor(private readonly ftpService: FtpService) {}

  @Get('read-excel')
  @HttpCode(HttpStatus.OK)
  async readExcel(
    @Query('remoteFilePath') remoteFilePath: string,
    @Query('localFilePath') localFilePath: string
  ): Promise<any> {
    return await this.ftpService.readExcel(remoteFilePath, localFilePath);
  }
}
