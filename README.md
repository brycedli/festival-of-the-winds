# festival-of-the-winds

A website

Communications Studio CMU 2023

## Getting started with Node http-server

From: https://github.com/processing/p5.js/wiki/Local-server

Download and Install node.js

Open a terminal or command prompt (on Windows you might need to open the command prompt as admin)

In the terminal type:

```npm install -g http-server```

Done!

From then on just cd to the folder that has the files you want to serve and type

```http-server```

Then point your browser at http://localhost:8080/

Note 1: If you are having problems where the browser does not reload your javascript files after changes are made, you may need to instantiate the server with a specific cache value. To do this, include the cache timeout flag, with a value of '-1'. This tells the browser not to cache files (like sketch.js).

```http-server -c-1```

Alternatively, you can setup a browser-sync server which has the added benefit of automatically reloading the webpage when any changes were saved in the source code.

Follow instructions above to install node.js and open a Terminal/Command Prompt window

Type

```npm install -g browser-sync```

cd into your project folder.

Type

```browser-sync start --server -f -w```

Your website should be available at http://localhost:3000 and whenever you save a file in your project, the webpage will automatically reload.

https://www.browsersync.io/#install
https://github.com/CodingTrain/Rainbow-Topics/issues/646
Note 2: If you encountered an error that says EACCES when installing either http-server or browser-sync it means npm is not installed with the right permissions, follow the steps outlined at https://docs.npmjs.com/getting-started/fixing-npm-permissions to fix it.

