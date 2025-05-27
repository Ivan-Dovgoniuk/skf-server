import {
    Controller,
    Post,
    Get,
    Res,
    Req,
    HttpException,
    HttpStatus,
  } from '@nestjs/common';
  import { Response, Request as ExpressRequest } from 'express';
  import { DataService } from './data.service';
  import REGISTER_MAP from './register.map';
  
  @Controller('api')
  export class DataController {
    constructor(private readonly dataService: DataService) {}
  
    @Post()
    async postData(@Req() req: ExpressRequest, @Res() res: Response) {
      const contentType = req.headers['content-type'];
      let parsedData: any;
  
      if (contentType?.includes('application/octet-stream')) {
        const buffer = req.body as Buffer;
  
        if (!Buffer.isBuffer(buffer) || buffer.length < 2) {
          throw new HttpException('Invalid binary data', HttpStatus.BAD_REQUEST);
        }
  
        const decoded: Record<string, { value: number; unit: string }> = {};
        const sortedRegisterEntries = Object.entries(REGISTER_MAP).sort(
          ([a], [b]) => Number(a) - Number(b),
        );
  
        let offset = 0;
        for (const [_, meta] of sortedRegisterEntries) {
          const dataLength = meta.dataLength || 2;
  
          if (offset + dataLength > buffer.length) break;
  
          let rawValue = 0;
          if (dataLength === 2) {
            rawValue = buffer.readUInt16BE(offset);
          } else if (dataLength === 4) {
            rawValue = buffer.readUInt32BE(offset);
          } else if (dataLength === 8) {
            rawValue = Number(buffer.readBigUInt64BE(offset));
          } else {
            continue;
          }
  
          decoded[meta.name] = {
            value: parseFloat((rawValue * meta.multiplier).toFixed(3)),
            unit: meta.measureItem,
          };
  
          offset += dataLength;
        }
  
        parsedData = decoded;
      } else if (contentType?.includes('application/json')) {
        parsedData = req.body;
      } else {
        throw new HttpException(
          'Unsupported Content-Type. Use application/json or application/octet-stream',
          HttpStatus.UNSUPPORTED_MEDIA_TYPE,
        );
      }
  
      await this.dataService.saveData(parsedData);
  
      res.status(200).json({
        message: 'Data received successfully',
        received: parsedData,
      });
    }
  
    @Get('latest')
    getLatest(@Res() res: Response) {
      const latest = this.dataService.getLatest();
      if (!latest) {
        return res.status(404).json({ message: 'No data yet' });
      }
      return res.json(latest);
    }
  
    @Get('all')
    getAll(@Res() res: Response) {
      return res.json(this.dataService.getAll());
    }
  }