import { SddService } from './sdd.service';
export declare class SddController {
    private readonly sddService;
    constructor(sddService: SddService);
    createTable(tableName: string, type: string): {
        mesasge: string;
        message?: undefined;
    } | {
        message: string;
        mesasge?: undefined;
    };
}
