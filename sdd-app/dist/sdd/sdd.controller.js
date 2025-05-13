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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SddController = void 0;
const common_1 = require("@nestjs/common");
const sdd_service_1 = require("./sdd.service");
let SddController = class SddController {
    sddService;
    constructor(sddService) {
        this.sddService = sddService;
    }
    createTable(tableName, type) {
        if (!tableName)
            throw new common_1.HttpException('missing tableName', common_1.HttpStatus.BAD_REQUEST);
        return this.sddService.createTable(tableName, type);
    }
    async deleteTable(tableName) {
        return this.sddService.deleteTable(tableName);
    }
};
exports.SddController = SddController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)('tableName')),
    __param(1, (0, common_1.Body)('type')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], SddController.prototype, "createTable", null);
__decorate([
    (0, common_1.Delete)(':tableName'),
    __param(0, (0, common_1.Param)('tableName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SddController.prototype, "deleteTable", null);
exports.SddController = SddController = __decorate([
    (0, common_1.Controller)('sdd'),
    __metadata("design:paramtypes", [typeof (_a = typeof sdd_service_1.SddService !== "undefined" && sdd_service_1.SddService) === "function" ? _a : Object])
], SddController);
//# sourceMappingURL=sdd.controller.js.map