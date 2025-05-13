"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path = require("path");
const DATA_DIR = path.resolve(__dirname, '../../data');
const storeType = class SddService {
    baseDir = path.join(__dirname, '..', '..', 'data');
    createTable(tableName, type) {
        console.log(tableName, type);
        return { message: `table ${tableName} created` };
    }
};
//# sourceMappingURL=sdd.service.js.map