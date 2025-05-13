import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';
import { v4 as uuid } from 'uuid';

const DATA_DIR = path.resolve(__dirname, '../../data');
type StoreType = 'json' | 'yaml';

const storeType = 

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
