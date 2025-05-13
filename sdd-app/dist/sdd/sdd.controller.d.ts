import { SddService } from './sdd.service';
export declare class SddController {
    private readonly sddService;
    constructor(sddService: SddService);
    createTable(tableName: string, type: string): any;
    deleteTable(tableName: string): Promise<any>;
}
