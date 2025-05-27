import {
    Controller,
    Post,
    Get,
    Res,
    Req,
    Param,
    HttpException,
    HttpStatus,
    Delete,
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
        const id = req.headers['x-data-id'];

        if (!id) {
            throw new HttpException(
                'X-Data-ID header is missing',
                HttpStatus.BAD_REQUEST,
            );
        }

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

        await this.dataService.saveData(id as string, parsedData);

        res.status(200).json({
            message: 'Data received successfully',
            id,
            received: parsedData,
        });
    }

    @Get('all')
    getAll(@Res() res: Response) {
        return res.json(this.dataService.getAll());
    }

    @Get('by-id/:id')
    getById(@Param('id') id: string, @Res() res: Response) {
        if (!id) {
            throw new HttpException(
                'ID parameter is missing',
                HttpStatus.BAD_REQUEST,
            );
        }

        const data = this.dataService.getById(id);
        if (!data) {
            throw new HttpException(
                `Data with ID ${id} not found`,
                HttpStatus.NOT_FOUND,
            );
        }

        return res.json(data);
    }

    @Delete()
    clearAll(){
      this.dataService.clearAll()
    }
}