# example-todo-vue

This is a basic Vue.js todo application.

Notes during development:
* to try, use npx to avoid global @vue/cli installation
* uuidv4 is used to create todo object id

Environment:
* nodeJs: `v12.14`
* npm: `v6.13`
* @vue/cli: `v4.2.3`

Vue CLI is awesome to kick-start Vue projects, but comes with little in the way of styling.

```bash
npm install bootstrap jquery popper.js
```

And import it into the main script by adding these lines to the top of 
`<project-root>/src/main.js`:
```javascript
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
```

The todo form is sourcing online free photos [source.unsplash.com](https://source.unsplash.com) as live background. An example api is like `https://source.unsplash.com/1280x700/?coffee`.

The production deployment is configured to deploy to github web page.
To avoid gh-pages blank page (not loading js) issue, use `master` branch `docs` folder as deployed content root. 

See `config/index.js` files for custom configuration details.

Since contents are now built to `docs` folder instead of `dist`, to verify with `serve`
```bash
npm run build
serve -s docs
```

Don't forget to go to github repo settings page and set gh-pages branch to `master/docs` folder (or any specific branch containing the `docs` folder).

Now the github demo webpage is at [binlecode.github.io/example-todo-vue/index.html](https://binlecode.github.io/example-todo-vue/index.html)

Note if in github gh-pages setting if choose `master` branch without `docs` subfolder, the web url would then be [binlecode.github.io/example-todo-vue/docs/index.html](https://binlecode.github.io/example-todo-vue/docs/index.html).

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
