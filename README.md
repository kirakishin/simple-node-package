# simple-node-package

Simple Node.js package used for a tutorial : Starting with NPM

# Starting with NPM

Let's create our first Node.js module

NPM is the package manager of Node.js and all packages are stored in a public registry :
`https://registry.npmjs.org`.
But to find one, use the website [https://npmjs.org/](https://npmjs.org/).
NodeJs introduced this manager since version 0.6.3.
It manage dependencies and other configurations trough a `package.json` file.
Today, there is a least 560K+ packages : that's a lot!

You also can store packages in private NPM registry : useful inside enterprises.

## pre-requisites

In order to use NPM, we need to install Node.js if not already done.

You can `sudo apt-get install nodejs nodejs-dev nodejs-legacy` on Ubuntu,
or download [Node.js](https://nodejs.org/).

## search in the registry

You may want a package to do some stuff :
look first in the registry, someone probably worked on that.
Go to find a package on [https://npmjs.org/](https://npmjs.org/)

If not, find a name for your package and check if it is already taken :

```
$ npm view my-package
npm ERR! 404 Registry returned 404 for GET on http://registry.npmjs.org/
```
If npm displays a 404 error, the package does not exists, you can create it.

## create your repository

Before creating the package, start to create a repository on github or other repository manager.
Then, clone it in your working directory :
```bash
$ mkdir my-first-npm-package
$ cd my-first-npm-package
$ git clone git@github.com:USER/my-first-npm-package.git
```

## First script with node

You can execute a javascript file using node like this :
```bash
$ node index.js
simple-node-package started
```
where `index.js` contains :
```javascript
console.log('simple-node-package started');
```

As we can see, the message `simple-node-package started` is logged.
So, use this way to create a script that do something right now.
Imagine :
```bash
$ node display-the-date.js
2017-09-27T14:21:01.755Z
```
where `display-the-date.js` contains :
```
console.log(new Date());
```

Now execute the script using the Node.js **REPL**.
Its a Javascript prompt called **REPL** for **R**ead **E**val **P**rint **L**oop.
It works in a way like your browser javascript console does but with node features.
The most important thing to know is the import of your module with `require('./file.js')`.
It loads your javascript file.
Just do :
```javascript
$ node
> var module = require('./index.js');
simple-node-package started
undefined
```
The same log message is displayed. Use CTRL+C twice to exit REPL
(exit before try again if you change your script).

Be careful :
`require` is a function that will load synchronously the indicated module.
Once the first load is done, it will cache the script, so if we load it a second time, it is not re-loaded :
```
> var module = require('./index.js');
simple-node-package started
undefined
> var module = require('./index.js');
undefined
```
Depending your code, you may have some side effects if you code wrong.

## Exporting some stuff

Now there is a magic keyword with node : `module.exports` or `exports`.
It permit to exports whatever you want, like literal, object, function, ...
Try with `index.js`:
```javascript
module.exports = 'myExport';
```
And import it:
```javascript
$ node
> var module = require('./index.js');
simple-node-package started
undefined
> module
'myExport'
```
Here `module` equals `'myExport'` string.

Now imagine exporting a function :
```javascript
module.exports = function(moduleArgument) {
    console.log('moduleArgument is', moduleArgument);
    return 'moduleResult';
};
```
And try it :
```javascript
$ node
> var module = require('./index.js');
simple-node-package started
undefined
> module
[Function]
```
We can see that `module` is a (our) function and if we execute it with an argument `'moduleParameter'`:
```javascript
> module('moduleParameter')
moduleArgument is moduleParameter
'moduleResult'
```
There is a log message that indicates our first argument and the returned value `'moduleResult'`

## More useful script

Now we will export something more useful : a module with some utility functions, an addition and multiplication functions.
We start with our `index.js` file :
```javascript
module.exports = function (coefficient) {
    // no coefficient means coefficient of 1
    if (!coefficient && coefficient !== 0) {
        coefficient = 1;
    }
    console.log('moduleArgument coefficient is', coefficient);
    this.coefficient = coefficient;
    return {
        addition: addition.bind(this),
        multiplication: multiplication.bind(this)
    }
};

function addition(x, y) {
    return this.coefficient * (x + y);
}

function multiplication(x, y) {
    return this.coefficient * x * y;
}
```
Here the function used for the module return an object of functions :
```json
{
    addition: addition.bind(this),
    multiplication: multiplication.bind(this)
}
```
So when after importing our module with the `coefficient` parameter,
you can call `addition` or `multiplication` functions.

Let's try to use it :
```javascript
> var module = require('./index.js');
simple-node-package started
undefined
>
> module().addition(1,1)
moduleArgument coefficient is 1
2
> module(2).addition(1,1)
moduleArgument coefficient is 2
4
> var coef4 = module(4)
moduleArgument coefficient is 4
undefined
> coef4.multiplication(2,2)
16
```

Finally, our module parameter `coefficient` is useful for our entire module
and we benefit of these two functions you can use elsewhere, even in another NPM module.

## create a package

We are now ready to create the package with `npm init`. Don't forget to add a `README.md` :
it will appears on the NPM registry to describe the package.
It will ask a couple of questions as the package name, version, description, author, keywords and repository :

```
$ npm init
  This utility will walk you through creating a package.json file.
  It only covers the most common items, and tries to guess sensible defaults.
  
  See `npm help json` for definitive documentation on these fields
  and exactly what they do.
  
  Use `npm install <pkg> --save` afterwards to install a package and
  save it as a dependency in the package.json file.
  
  Press ^C at any time to quit.
  name: (simple-node-package) simple-node-package
  version: (1.0.0) 0.0.0
  description: simple node module with an addition and a multiplication methods
  entry point: (index.js)
  test command:
  git repository: (https://github.com/kirakishin/simple-node-package.git)
  keywords: addition, multiplication
  author: **@**
  license: (ISC) MIT
  About to write to C:\git\github\kirakishin\simple-node-package\package.json:
  
  {
    "name": "simple-node-package",
    "version": "0.0.0",
    "description": "simple node module with an addition and a multiplication methods",
    "main": "index.js",
    "scripts": {
      "test": "echo \"Error: no test specified\" && exit 1"
    },
    "repository": {
      "type": "git",
      "url": "git+https://github.com/kirakishin/simple-node-package.git"
    },
    "keywords": [
      "addition",
      "multiplication"
    ],
    "author": "kirakishin@bkm.me",
    "license": "MIT",
    "bugs": {
      "url": "https://github.com/kirakishin/simple-node-package/issues"
    },
    "homepage": "https://github.com/kirakishin/simple-node-package#readme"
  }
  
  
  Is this ok? (yes) yes
```

Once finished, the `package.json` file is created.
You can edit it by changing the name or adding some tests.

Now take our previous script `display-the-date.js`:
```bash
$ node display-the-date.js
2017-09-27T14:21:01.755Z
```

So, you can execute it through a NPM script by adding a `start` script in `package.json` :
```
{
  [...]
  "scripts": {
    "start": "node display-the-date.js"
  },
  [...]
}
```
And try :
```
$ npm start
> simple-node-package@0.0.0 start /home/kirakishin/simple-node-package
> node display-the-date.js
2017-09-27T14:21:01.755Z
```

## publish your package

If you never used the NPM public registry, you must add your account :
```
$ npm adduser <USER>
```

Now add new files and commit it :
```
$ git add index.js package.json README.md display-the-date.js
$ git commit -a -m "chore(init): first init"
$ npm version minor
$ git push && git push --tags
```

Then publish your package on the registry :
```
npm publish
```

that's all !

## Few words

In an open source World, check first if anyone already done the thing you want. If not, do it and share!

We saw how to create a node module, use it, and publish it:
- NPM is a **package manager** and comes with Node.js
- `https://npmjs.org/` is the NPM website to find packages in the NPM registry
- `http://registry.npmjs.org/` is the NPM registry where packages are stored
- you also can use a **private NPM registry** inside your organization
- start a node script with `node script.js`
- exports things from your module with `module.exports = 'exportedThing'`
- use **REPL** from node to send commands like `console.log('hello')`
- use `var module = require('./index.js')` to import the module from `index.js`
- then use it with `var ask = module(42); var response = ask.bigQuestion('all')`
- and see the answer to everything in the universe

## see more

- [NPM package.json Doc](https://docs.npmjs.com/files/package.json)
- [`module.exports` vs `exports`](https://medium.freecodecamp.org/node-js-module-exports-vs-exports-ec7e254d63ac)
- [export more things](https://team.goodeggs.com/export-this-interface-design-patterns-for-node-js-modules-b48a3b1f8f40)
- [NPM version](https://docs.npmjs.com/cli/version)
- [Semantic versioning](http://semver.org/)