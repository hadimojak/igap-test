import { SddService } from './sdd.service';
export declare class SddController {
    private readonly sddService;
    constructor(sddService: SddService);
    createTable(body: {
        tableName: string;
    }): {
        mesasge: string;
        message?: undefined;
    } | {
        message: string;
        mesasge?: undefined;
    };
    deleteTable(tableName: string): {
        message: string;
    };
    insertRecord(tableName: string, data: any): any;
    getAllRecords(tableName: string, skip?: number, limit?: number): Record<string, any>[];
    getRecord(tableName: string, id: string): Record<string, any>;
    updateRecord(tableName: string, id: string, update: any): Record<string, any>;
    deleteRecord(tableName: string, id: string): {
        message: string;
        record: Record<string, any>;
    };
    listCollections(): any;
}
