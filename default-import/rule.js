
export default {
  filter() {
    return true;
  },
  mapSpecifier(specifier, /* source */) {
    return specifier.local.name;
  },
  mapSource(specifier, source) {
    return `${source.value}/${specifier.imported.name}`;
  },
};
