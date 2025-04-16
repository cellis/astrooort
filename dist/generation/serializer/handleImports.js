"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const resolveType_1 = __importDefault(require("../resolveType"));
const handleImports = (model) => {
    // serialized
    const imp0rts = {};
    const typeormImports = ['BaseEntity', 'Column', 'Entity'];
    if (model.primaryKeys) {
        model.primaryKeys.forEach((pk) => {
            const column = model.columns[pk];
            if (column.autoIncrement
                && resolveType_1.default(column.dataType) === 'number') {
                // TODO investigate PrimaryGeneratedColumn
                // vs column ({ generated: true, primary: true })
                typeormImports.push('PrimaryGeneratedColumn');
            }
        });
    }
    if (model.indexes) {
        typeormImports.push('Index');
    }
    imp0rts.typeorm = {
        isModule: true,
        partial: typeormImports,
    };
    delete imp0rts[model.name.toLowerCase()];
    return imp0rts;
};
exports.default = handleImports;
//# sourceMappingURL=handleImports.js.map