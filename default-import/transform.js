import rule from './rule';

export default function transform(file, api) {
  const j = api.jscodeshift;

  const toDefaultImport = (specifier, source) => (
    j.importDeclaration(
      [j.importDefaultSpecifier(
        j.identifier(rule.mapSpecifier(specifier, source))
      )],
      j.literal(rule.mapSource(specifier, source))
    )
  );

  return j(file.source)
    .find(j.ImportDeclaration, rule.filter)
    .replaceWith(({ value: { source, specifiers } }) => (
      specifiers.map((specifier) => toDefaultImport(specifier, source))
    ))
    .toSource();
}
