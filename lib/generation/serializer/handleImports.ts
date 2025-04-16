import resolveType from '../resolveType';
import { PascalCase } from './utils';

export interface Import {
  partial?: string[];
  isModule?: boolean;
}
export type Imports = Record<string, Import>;
export interface SerializedModel {
  imports?: Imports;
  schema?: string;
  columns?: Record<string, Superluminal.Column>;
  name?: string;
  primaryKeys?: string[];
  indexes?: Superluminal.Indexes;
}

const handleImports = (
  model: Superluminal.Model,
): Imports => {
  // serialized
  const imp0rts: Imports = {};

  const typeormImports = ['BaseEntity', 'Column', 'Entity'];

  

  if (model.primaryKeys) {
    

    model.primaryKeys.forEach((pk) => {
      const column = model.columns[pk];

      if (column.autoIncrement
    && resolveType(column.dataType) === 'number') {
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

export default handleImports;
