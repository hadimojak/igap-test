import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class SddService {
  baseDir = path.join(__dirname, '..', '..', 'data');

  createTable(tableName: string, type: string) {
    console.log(tableName, type);

    // const filePath = path.join(this.baseDir, `${tableName}.json`);
    // if (!fs.existsSync(this.baseDir)) fs.mkdirSync(this.baseDir);
    // if (!fs.existsSync(filePath))
    //   fs.writeFileSync(filePath, JSON.stringify([]));
    return { message: `table ${tableName} created` };
  }
}
