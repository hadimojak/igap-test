"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SddService = void 0;
const common_1 = require("@nestjs/common");
const fs = require("fs");
const path = require("path");
const yaml = require("yaml");
const uuid_1 = require("uuid");
const DATA_DIR = path.resolve(__dirname, '../../data');
const storeType = process.env.SDD_STORE_TYPE;
let SddService = class SddService {
    constructor() {
        if (!fs.existsSync(DATA_DIR))
            fs.mkdirSync(DATA_DIR);
    }
    getFilePath(tableName) {
        const ext = storeType === 'YAML' ? 'yaml' : storeType === 'BINARY' ? 'bin' : 'json';
        return path.join(DATA_DIR, `${tableName}.${ext}`);
    }
    readTable(tableName) {
        const filePath = this.getFilePath(tableName);
        if (!fs.existsSync(filePath))
            return [];
        const table = fs.readFileSync(filePath, storeType === 'BINARY' ? null : 'utf-8');
        if (storeType === 'YAML') {
            return yaml.parse(table.toString('utf-8'));
        }
        else if (storeType === 'BINARY') {
            const jsonStr = table.toString('utf-8');
            return JSON.parse(jsonStr);
        }
        else {
            return JSON.parse(table.toString('utf-8'));
        }
    }
    writeTable(tableName, data) {
        const filePath = this.getFilePath(tableName);
        let serialized;
        if (storeType === 'YAML') {
            serialized = yaml.stringify(data);
        }
        else if (storeType === 'BINARY') {
            const jsonStr = JSON.stringify(data);
            serialized = Buffer.from(jsonStr, 'utf8');
        }
        else {
            serialized = JSON.stringify(data, null, 2);
        }
        fs.writeFileSync(filePath, serialized, storeType === 'BINARY' ? null : 'utf8');
    }
    createTable(tableName) {
        const filePath = this.getFilePath(tableName);
        if (fs.existsSync(filePath))
            return { mesasge: `table ${tableName} already exict` };
        const emptyData = [];
        let serialized;
        if (storeType === 'YAML') {
            serialized = yaml.stringify(emptyData);
        }
        else if (storeType === 'BINARY') {
            const jsonStr = JSON.stringify(emptyData);
            serialized = Buffer.from(jsonStr, 'utf8');
        }
        else {
            serialized = JSON.stringify(emptyData, null, 2);
        }
        fs.writeFileSync(filePath, serialized, storeType === 'BINARY' ? undefined : 'utf8');
        const metaPath = path.join(DATA_DIR, '_meta.json');
        if (fs.existsSync(metaPath)) {
            const meta = JSON.parse(fs.readFileSync(metaPath, 'utf8'));
            delete meta[tableName];
            fs.writeFileSync(metaPath, JSON.stringify(meta, null, 2));
        }
        return { message: `table: '${tableName}' created` };
    }
    deleteTable(tableName) {
        const filePath = this.getFilePath(tableName);
        if (!fs.existsSync(filePath))
            throw new common_1.HttpException('Table not found', common_1.HttpStatus.NOT_FOUND);
        fs.unlinkSync(filePath);
        return { message: `Table "${tableName}" deleted successfully.` };
    }
    insertRecord(tableName, record) {
        const records = this.readTable(tableName);
        const id = (0, uuid_1.v4)();
        const newRecord = { id, ...record };
        console.log({ newRecord });
        records.push(newRecord);
        this.writeTable(tableName, records);
        return newRecord;
    }
    getAllRecords(tableName, skip = 0, limit = 100) {
        const records = this.readTable(tableName);
        return records.slice(skip, skip + limit);
    }
    getRecord(tableName, id) {
        const records = this.readTable(tableName);
        const record = records.find((r) => r.id === id);
        if (!record)
            throw new common_1.HttpException('recond not found', common_1.HttpStatus.NOT_FOUND);
        return record;
    }
    updateRecord(tableName, id, update) {
        const records = this.readTable(tableName);
        const index = records.findIndex((r) => r.id === id);
        if (index === -1)
            throw new common_1.HttpException('recond not found', common_1.HttpStatus.NOT_FOUND);
        records[index] = { ...records[index], ...update };
        this.writeTable(tableName, records);
        return records[index];
    }
    deleteRecord(tableName, id) {
        const records = this.readTable(tableName);
        const index = records.findIndex((r) => r.id === id);
        if (index === -1)
            throw new common_1.HttpException('recond not found', common_1.HttpStatus.NOT_FOUND);
        const deleted = records.splice(index, 1)[0];
        this.writeTable(tableName, records);
        return { message: 'Record deleted', record: deleted };
    }
    listCollections() {
        const metaPath = path.join(DATA_DIR, '_meta.json');
        if (!fs.existsSync(metaPath))
            return {};
        return JSON.parse(fs.readFileSync(metaPath, 'utf8'));
    }
};
exports.SddService = SddService;
exports.SddService = SddService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], SddService);
//# sourceMappingURL=sdd.service.js.map