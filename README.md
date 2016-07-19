# Work in progress, not ready

Make sure to look at [cpojer/js-codemod](https://github.com/cpojer/js-codemod) for a well maintained codemod collection :)

## Setup

```
npm install -g jscodeshift
git clone https://github.com/rogeliog/codemod
jscodeshift -t <codemod-script> <file>
```

## default-import

Change imports to default imports.

##### Usage

`jscodeshift -t default-import/transform.js path/to/foo/`

###### Example:

```javascript
// Before
import {
  Button,
  Menu,
} from 'components';

//After
import Button from "components/Button";
import Menu from "components/Menu";
```

##### Customization

You can edit `default-import/rule.js` to customize this codemod.

For example we can change `default-import/rule.js` to only modify the imports that have `components` as the source, and also map imported icons from the component source to a different path. _Note that the React import was not modified._

```javascript
export default {
  filter({ value: { source } }) {
    return source.value.match(/^components/);
  },
  mapSpecifier(specifier, /* source */) {
    return specifier.local.name;
  },
  mapSource(specifier, source) {
    const importValue = specifier.imported.name;

    if (importValue.includes('Icon')) {
      return `${source.value}/Icon/lib/${importValue.replace(/Icon$/, '')}`;
    }

    return `${source.value}/${importValue}`;
  },
}

```

```javascript
// Before
import React, { Component } from 'react';
import {
  Button,
  GithubIcon,
  Menu,
} from 'components';

// After
import React, { Component } from 'react';
import Button from "components/Button";
import GithubIcon from "components/Icon/lib/Github";
import Menu from "components/Menu";
```
