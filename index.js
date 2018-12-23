require('ts-node').register({
  project: './tsconfig.json'
}); // This will register the TypeScript compiler
// @ts-ignore
require('./build-scripts'); // This will load our Typescript application