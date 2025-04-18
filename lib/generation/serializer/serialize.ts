import serializeAssociations from './serializeAssociations';
import serializeBody from './serializeBody';
import serializeColumns from './serializeColumns';
import serializeImports from './serializeImports';
import serializeIndexes from './serializeIndexes';
import { PascalCase } from './utils';

export default (
  model: Superluminal.Model,
  models: Superluminal.Models,
  options: Superluminal.Args,
  associationMapping: Superluminal.AssociationMapping
): string => {
  // sort all imports first.

  const importStatement = serializeImports(model);

  const columnsStatement = serializeColumns(model);

  const indexesStatement = serializeIndexes(model);

  // const associationsStatement = serializeAssociations(
  //   model,
  //   models,
  //   associationMapping
  // );

  const bodyStatement = serializeBody(
    model.name,
    indexesStatement,
    model.schema,
    PascalCase(model.name),
    columnsStatement,
    '',
  );

  const finalStatement = [importStatement, bodyStatement].join('\n');

  return finalStatement;
};
