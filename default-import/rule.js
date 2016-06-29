export default {
  filter: {},
  mapSpecifier(specifier, /* source */) {
    return specifier.local.name;
  },
  mapSource(specifier, source) {
    return `${source.value}/${specifier.imported.name}`;
  },
};
