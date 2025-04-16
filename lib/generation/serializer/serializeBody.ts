export default (
  name?: string,
  indexes?: string,
  schema?: string,
  PascalName?: string,
  columns?: string,
  associations?: string,
) => {
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
