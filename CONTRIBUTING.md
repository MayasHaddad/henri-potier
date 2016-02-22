# Prequisites
You must have [nodejs](https://nodejs.org/en/) and [npm](https://www.npmjs.com/package/npm) installed on your machine.

# Setting up Dev Environment

After cloning the repository to your local dev directory, reach the repository with your (CMD, shell ... ) 
console and install the project dependencies by typing:

`npm install`

Now you use webpack-dev-server to benefit from live reload:

`node node_modules/webpack-dev-server\bin\webpack-dev-server.js --config webpack.conf.js`

When you're done type:

`node node_modules/webpack-dev-server\bin\webpack-dev-server.js --config webpack.dist.conf.js`

This will generate a minimified bundle under `dist/` directory, ready to ship.
