/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'yaml';
import { v4 as uuid } from 'uuid';

const DATA_DIR = path.resolve(__dirname, '../../data');
type StoreType = 'JSON' | 'YAML' | 'BINARY';

const storeType = process.env.SDD_STORE_TYPE as StoreType;

@Injectable()
export class SddService {
  constructor() {
    if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR);
  }

  //utilities method
  private getFilePath(tableName: string): string {
    const ext =
      storeType === 'YAML' ? 'yaml' : storeType === 'BINARY' ? 'bin' : 'json';
    return path.join(DATA_DIR, `${tableName}.${ext}`);
  }

  private readTable(tableName: string): Record<string, any>[] {
    const filePath = this.getFilePath(tableName);
    if (!fs.existsSync(filePath)) return [];

    const table = fs.readFileSync(
      filePath,
      storeType === 'BINARY' ? null : 'utf-8',
    );

    if (storeType === 'YAML') {
      return yaml.parse(table.toString('utf-8'));
    } else if (storeType === 'BINARY') {
      const jsonStr = table.toString('utf-8');
      return JSON.parse(jsonStr);
    } else {
      return JSON.parse(table.toString('utf-8'));
    }
  }

  private writeTable(tableName: string, data: any): void {
    const filePath = this.getFilePath(tableName);

    let serialized: string | Buffer;
    if (storeType === 'YAML') {
      serialized = yaml.stringify(data);
    } else if (storeType === 'BINARY') {
      const jsonStr = JSON.stringify(data);
      serialized = Buffer.from(jsonStr, 'utf8');
    } else {
      serialized = JSON.stringify(data, null, 2);
    }

    fs.writeFileSync(
      filePath,
      serialized,
      storeType === 'BINARY' ? null : 'utf8',
    );
  }

  //main method
  createTable(tableName: string) {
    const filePath = this.getFilePath(tableName);
    if (fs.existsSync(filePath))
      return { mesasge: `table ${tableName} already exict` };

    const emptyData = [];

    let serialized: string | Buffer;
    if (storeType === 'YAML') {
      serialized = yaml.stringify(emptyData);
    } else if (storeType === 'BINARY') {
      const jsonStr = JSON.stringify(emptyData);
      serialized = Buffer.from(jsonStr, 'utf8');
    } else {
      serialized = JSON.stringify(emptyData, null, 2);
    }

    fs.writeFileSync(
      filePath,
      serialized,
      storeType === 'BINARY' ? undefined : 'utf8',
    );

    const metaPath = path.join(DATA_DIR, '_meta.json');
    if (fs.existsSync(metaPath)) {
      const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
      delete meta[tableName];
      fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
    }

    return { message: `table: '${tableName}' created` };
  }

  deleteTable(tableName: string) {
    const filePath = this.getFilePath(tableName);
    if (!fs.existsSync(filePath))
      throw new HttpException('Table not found', HttpStatus.NOT_FOUND);

    fs.unlinkSync(filePath);

    return { message: `Table (${tableName}) deleted successfully.` };
  }

  insertRecord(tableName: string, record: any) {
    const records = this.readTable(tableName);

    const id = uuid();
    const newRecord = { id, ...record };

    records.push(newRecord);
    this.writeTable(tableName, records);
    return newRecord;
  }

  getAllRecords(tableName: string, skip = 0, limit = 100) {
    const records = this.readTable(tableName);
    return records.slice(skip, skip + limit);
  }

  getRecord(tableName: string, id: string) {
    const records = this.readTable(tableName);
    const record = records.find((r) => r.id === id);
    if (!record)
      throw new HttpException('recond not found', HttpStatus.NOT_FOUND);
    return record;
  }

  updateRecord(tableName: string, id: string, update: any) {
    const records = this.readTable(tableName);
    const index = records.findIndex((r) => r.id === id);
    if (index === -1)
      throw new HttpException('recond not found', HttpStatus.NOT_FOUND);

    records[index] = { ...records[index], ...update };
    this.writeTable(tableName, records);
    return records[index];
  }

  deleteRecord(tableName: string, id: string) {
    const records = this.readTable(tableName);
    const index = records.findIndex((r) => r.id === id);
    if (index === -1)
      throw new HttpException('recond not found', HttpStatus.NOT_FOUND);

    const deleted = records.splice(index, 1)[0];
    this.writeTable(tableName, records);
    return { message: 'Record deleted', record: deleted };
  }

  listCollections() {
    if (!fs.existsSync(DATA_DIR)) return [];

    const extension =
      storeType === 'YAML'
        ? '.yaml'
        : storeType === 'BINARY'
          ? '.bin'
          : '.json';

    const files = fs.readdirSync(DATA_DIR);

    return files
      .filter((file) => file.endsWith(extension))
      .map((file) => path.basename(file, extension));
  }
}
