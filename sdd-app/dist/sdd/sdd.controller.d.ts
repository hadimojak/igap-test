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
    deleteTable(params: {
        tableName: string;
    }): {
        message: string;
    };
    insertRecord(params: {
        tableName: string;
    }, data: any): any;
    listCollections(): any;
    getAllRecords(params: {
        tableName: string;
    }, query: {
        skip: number;
        limit: number;
    }): Record<string, any>[];
    getRecord(params: {
        tableName: string;
        id: string;
    }): Record<string, any>;
    updateRecord(params: {
        tableName: string;
        id: string;
    }, update: any): Record<string, any>;
    deleteRecord(params: {
        tableName: string;
        id: string;
    }): {
        message: string;
        record: Record<string, any>;
    };
}
