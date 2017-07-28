# sync-package-description

[![Greenkeeper badge](https://badges.greenkeeper.io/saibotsivad/sync-package-description.svg)](https://greenkeeper.io/)

Synchronize an npm package.json description to Github.

For help setting this up as a git hook, see the
[cli version](https://github.com/saibotsivad/sync-package-description-cli).

This module takes an
[authentication object](https://github.com/mikedeboer/node-github#authentication)
and a local module path, and proceeds to update the Github repo
description with the values from the `package.json` file.

## install

The normal way:

```bash
npm install sync-package-description
```

## use

Create an instance with the authentication object:

```js
const SyncDescription = require('sync-package-description')
const auth = {
	type: 'token',
	token: '<SECRET TOKEN>'
}
const sync = SyncDescription(auth)
```

Then call it with the path to your module:

```js
sync('./')
	.then(() => console.log('success!'))
	.catch(error => console.log('error!', error))
```

## api: `SyncDescription(authorization[, options]) : callable(path)`

### `authorization`

Must be an [authentication object](https://github.com/mikedeboer/node-github#authentication).

### `options`

The [Github module](https://github.com/mikedeboer/node-github) is called with
sensible default options, but if you need to pass in special options this is
where to do it.

Passed in options will override the default options using `Object.assign`.

### `path`

Pass in the path to the module containing the `package.json` file.

## license

Published and released under the [VOL](http://veryopenlicense.com).

<3
