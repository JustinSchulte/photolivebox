# photolivebox

## By Justin
Mit den unteren Befehlen kann das Projekt einfach gestartet werden.
1. `yarn install`
2. `yarn dev` (oder "yarn build" -> "yarn start" für prod)

Mit `yarn add` können npm module ergänzt werden.

Alle erreichbare Seiten sind im Ordner `pages`.

Über `/` erreicht man die Seite index und über `/upload` erreicht man die Seite upload. Es ist kein router notwendig, die page xyz würde man entsprechend über `/xyz` erreichen.

Der Express Server bzw die server-middleware befindet sich unter `server-middleware/images`. Über die nuxt.config.js ist konfiguriert, dass alle Requests gegen `/api/images` von dieser server-middleware abgefangen werden.

Die hochgeladenen Bilder werden an den Express Server gesendet. Dieser speichert sie einfach im `images` Ordner. Bei Abfragen werden die "neuen" Bilder aus diesem Ordner base64 kodiert zurück gesendet.

Die initialen Beispiel Komponenten und Layout können noch entfernt/überarbeitet werden. Das Base-Layout ist unter `layouts/default.vue` definiert.

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).

### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
