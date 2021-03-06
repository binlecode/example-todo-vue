# example-todo-vue

This is a basic Vue.js todo application.

Github demo webpage is at [binlecode.github.io/example-todo-vue/index.html](https://binlecode.github.io/example-todo-vue/index.html).

## Environment

Runtime and framework specifications:
* nodeJs: `v12.14`
* npm: `v6.13`
* @vue/cli: `v4.2.3`

## Quick and dirty

Ensure environment above, checkout code and run:

``` bash
cd <project-root>
# install dependencies
npm install
# serve with hot reload at localhost:8080
npm run dev
```

## Bootstrap configuration

Use BootstrapVue integrate bootstrap 4 and icons.
```bash
npm install bootstrap-vue
```

And import it into the main script by adding these lines to the top of 
`<project-root>/src/main.js`:
```javascript
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// need to explicitely import BootstrapVue and Icons
import { BootstrapVue, BootstrapVueIcons } from 'bootstrap-vue'
```

## background splash picture

The todo form is sourcing online free photos [source.unsplash.com](https://source.unsplash.com) as live background. An example api is like `https://source.unsplash.com/1280x700/?coffee`. There is a little background change button on the footer to switch different background image categories.

## Backend modes

There are two backend modes supported: RESTful, and local-storage.

Local-storage mode: CRUD APIs are supported by `LocalStorageApiService` with localStorage on client (browser) side. 
This provides an easy way to run the SPA without REST web endpoints.

REST mode: CRUD APIs calls are made from `ApiService` to a true REST endpoint `http://localhost:3000/todos`.
This URL is reconfurable.

The mode is set by `CRUD_API` environment variable in [`prod.env.js`](./config/prod.env.js) file.
Uncomment this key to enable REST endpoint.

A json-server based REST endpoint implementation is provided in this application to run along with SPA, see section below.

## json-server as backend REST data endpoints

Json server is used and loaded with a `db.json` file as mock backend REST data service.
The seeding `db.json` file is created using [json-generator](https://www.json-generator.com/) online service.

Switch code to `rest-api` branch, then:
```bash
npm install json-server --dev-save
# start it
node_modules/.bin/json-server --watch db.json
```

Alternatively, run json-server in background:
```bash
node_modules/.bin/json-server -p 3000 db.json >> ./json-server.log 2>&1 </dev/null &
# then tail the log
tail -f json-server.log
```

An npm task is also created (in `package.json`) to save typing of the above.
```bash
npm run json-server
```

This generates a `todos` resource endpoints: `http://localhost:3000/todos`.
Json-server provides both standard CRUDs as well as pagination, sorting, and text search. 
It is nicely explained in this [post](https://blog.eleven-labs.com/en/json-server/) and its github [documentation](https://github.com/typicode/json-server).


## Axios api 

Axios library is used to as API client to call json-server endpoints.

```bash
npm install axios
```

The axios specific API code is externalized from vue components to separate [`ApiService.js`](./src/services/ApiService.js) file in `services` folder.

## UUID for todo id

`uuidv4` (https://github.com/uuidjs/uuid) is used to create todo object id.

## Error message rendering

`izitoast` (https://izitoast.marcelodolza.com/) is used to provide user-friendly error and warning messages.

See usage in `toast` callback definition in [ApiService](./src/services/ApiService.js).

## Deployment

The production deployment is configured to deploy to github web page.
To avoid gh-pages blank page (not loading js) issue, use `master` branch `docs` folder as deployed content root. 

See `config/index.js` files for custom configuration details.

Since contents are now built to `docs` folder instead of `dist`, to verify with `serve`:
```bash
# --report paramter is optional to view the bundle analyzer report
npm run build --report
serve -s docs
```

If local `serve` command works, then push to remote:
```bash
git add docs
git commit -m 'deploy to docs folder'
git push
```

Don't forget to go to github repo settings page and set gh-pages branch to `master/docs` folder (or any specific branch containing the `docs` folder).

This is composed to a bash script [`deploy-docs.sh`](./deploy-docs.sh).

The github demo URL is at [binlecode.github.io/example-todo-vue/index.html](https://binlecode.github.io/example-todo-vue/index.html)

Note if in github gh-pages setting if choose `master` branch without `docs` subfolder, the web url would then be [binlecode.github.io/example-todo-vue/docs/index.html](https://binlecode.github.io/example-todo-vue/docs/index.html).

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Deploy with a REST backend




## todo

- [x] support filter by 'all', 'active', and 'completed'
- [ ] basic todo input text validation before save
- [x] support inline todo text modification
- [ ] pagination and total count
- [ ] sort todos by time DESC
- [x] add backend RESTful endpoint for todo CRUD (using Axios lib)
- [ ] move same-page inline styles and js to separated .css file and load it in .vue file

