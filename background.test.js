/* to start testing: (for mac)
    npm install
    npm install --save-dev jest  // this is for writing and runing tests
    npm install --save-dev puppeteer // this is for running tests on the browser

    npm test to run tests
*/

const { TestScheduler } = require('jest'); // need to dowload to test: npm install --save-dev jest
const { treeArray } = require('./background');
const puppeteer = require('puppeteer'); // need to dowload to test: npm install --save-dev puppeteer

test('test node', () =>{ // just a test that should always pass to test that jest is working
    const text = 'hello';
    expect(text).toBe('hello');
});

test('test that treeArray is made', () => {
     const array = treeArray;
    expect(array).toBeUndefined();
});