# example-todo-vue

This is a basic Vue.js todo application.

Notes during development:
* to try, use npx to avoid global @vue/cli installation
* uuidv4 is used to create todo object id

Environment:
* nodeJs: `v12.14`
* npm: `v6.13`
* @vue/cli: `v4.2.3`

## Bootstrap

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

The todo form is sourcing online free photos [source.unsplash.com](https://source.unsplash.com) as live background. An example api is like `https://source.unsplash.com/1280x700/?coffee`. There is a little background change button on the footer to switch different background image categories.

## json-server as backend REST data endpoints

Json server is used and loading `db.json` as mock backend REST data service.
The seeding `db.json` file is created using [json-generator](https://www.json-generator.com/) online service.

Switch code to `json-server` branch, then:

```bash
npm install json-server --dev-save
# start it
node_modules/.bin/json-server --watch db.json
# to run json-server in background
node_modules/.bin/json-server -p 3000 db.json >> ./json-server.log 2>&1 </dev/null &
# then tail the log
tail -f json-server.log
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

## Deployment

The production deployment is configured to deploy to github web page.
To avoid gh-pages blank page (not loading js) issue, use `master` branch `docs` folder as deployed content root. 

See `config/index.js` files for custom configuration details.

Since contents are now built to `docs` folder instead of `dist`, to verify with `serve`
```bash
npm run build
serve -s docs
```

If serve verifies, then push to remote
```bash
git add docs
git commit -m 'deploy to docs folder'
git push
```

Don't forget to go to github repo settings page and set gh-pages branch to `master/docs` folder (or any specific branch containing the `docs` folder).

This is composted to a bash script [`deploy-docs.sh`](./deploy-docs.sh).

Now the github demo webpage is at [binlecode.github.io/example-todo-vue/index.html](https://binlecode.github.io/example-todo-vue/index.html)

Note if in github gh-pages setting if choose `master` branch without `docs` subfolder, the web url would then be [binlecode.github.io/example-todo-vue/docs/index.html](https://binlecode.github.io/example-todo-vue/docs/index.html).



## todo

- [x] support filter by 'all', 'active', and 'completed'
- [ ] basic todo input text validation before save
- [x] support inline todo text modification
- [ ] pagination and total count
- [ ] sort todos by time DESC
- [x] add backend RESTful endpoint for todo CRUD (using Axios lib)
- [ ] move same-page inline styles and js to separated .css file and load it in .vue file

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
