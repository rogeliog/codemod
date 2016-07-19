import path from 'path';

export default function transform(file, api, options) {
  const j = api.jscodeshift;

  const rule = options.rule ?
    require(path.resolve(process.cwd(), options.rule)) :
    require('./rule');

  const toDefaultImport = (specifier, source) => (
    j.importDeclaration(
      [j.importDefaultSpecifier(
        j.identifier(rule.mapSpecifier(specifier, source))
      )],
      j.literal(rule.mapSource(specifier, source))
    )
  );

  return j(file.source)
    .find(j.ImportDeclaration, {})
    .filter((node) => {
      const { value: { specifiers } } = node;
      return !specifiers.some(({ type }) => type === 'ImportDefaultSpecifier')
        && rule.filter(node);
    })
    .replaceWith(({ value: { source, specifiers } }) => (
      specifiers.map((specifier) => toDefaultImport(specifier, source))
    ))
    .toSource({ quote: 'single' });
}
