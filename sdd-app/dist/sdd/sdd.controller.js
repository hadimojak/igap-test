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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SddController = void 0;
const common_1 = require("@nestjs/common");
const sdd_service_1 = require("./sdd.service");
let SddController = class SddController {
    sddService;
    constructor(sddService) {
        this.sddService = sddService;
    }
    createTable(body) {
        if (!body.tableName)
            throw new common_1.HttpException('missing tableName', common_1.HttpStatus.BAD_REQUEST);
        return this.sddService.createTable(body.tableName, body.type);
    }
    deleteTable(tableName) {
        return this.sddService.deleteTable(tableName);
    }
    insertRecord(tableName, data) {
        return this.sddService.insertRecord(tableName, data);
    }
    getAllRecords(tableName, skip = 0, limit = 100) {
        return this.sddService.getAllRecords(tableName, skip, limit);
    }
    getRecord(tableName, id) {
        return this.sddService.getRecord(tableName, id);
    }
    updateRecord(tableName, id, update) {
        return this.sddService.updateRecord(tableName, id, update);
    }
    deleteRecord(tableName, id) {
        return this.sddService.deleteRecord(tableName, id);
    }
    listCollections() {
        return this.sddService.listCollections();
    }
};
exports.SddController = SddController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], SddController.prototype, "createTable", null);
__decorate([
    (0, common_1.Delete)(':table'),
    __param(0, (0, common_1.Param)('table')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], SddController.prototype, "deleteTable", null);
__decorate([
    (0, common_1.Post)(':table'),
    __param(0, (0, common_1.Param)('table')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Object)
], SddController.prototype, "insertRecord", null);
__decorate([
    (0, common_1.Get)(':table'),
    __param(0, (0, common_1.Param)('table')),
    __param(1, (0, common_1.Query)('skip')),
    __param(2, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", void 0)
], SddController.prototype, "getAllRecords", null);
__decorate([
    (0, common_1.Get)(':table/:id'),
    __param(0, (0, common_1.Param)('table')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SddController.prototype, "getRecord", null);
__decorate([
    (0, common_1.Put)(':table/:id'),
    __param(0, (0, common_1.Param)('table')),
    __param(1, (0, common_1.Param)('id')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", void 0)
], SddController.prototype, "updateRecord", null);
__decorate([
    (0, common_1.Delete)(':table/:id'),
    __param(0, (0, common_1.Param)('table')),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SddController.prototype, "deleteRecord", null);
__decorate([
    (0, common_1.Get)('collections'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], SddController.prototype, "listCollections", null);
exports.SddController = SddController = __decorate([
    (0, common_1.Controller)('sdd'),
    __metadata("design:paramtypes", [sdd_service_1.SddService])
], SddController);
//# sourceMappingURL=sdd.controller.js.map