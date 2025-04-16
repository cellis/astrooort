"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (name, indexes, schema, PascalName, columns, associations) => {
    // prettier-ignore
    const result = [
        `${indexes}`,
        `@Entity('${name}', { schema: '${schema}' })`,
        `export class ${PascalName} extends BaseEntity {`,
        `${columns}${associations ? '\n' : ''}`,
        `${associations}`,
        '}',
    ].filter(s => s.trim().length).join('\n');
    return result;
};
//# sourceMappingURL=serializeBody.js.map