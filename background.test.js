/* to start testing: (for mac)
    npm install
    npm install --save-dev jest  // this is for writing and runing tests
    npm install --save-dev puppeteer // this is for running tests on the browser

    npm test to run tests
*/
// Authors: MLH POD 2.1.3 Goofy Goffy {Elizabeth Crouther, Sakshi Gupta, Myat Thu Ko}
const { TestScheduler } = require("jest"); // need to dowload to test: npm install --save-dev jest
const { treeArray, makeNode, addDesc, chrome } = require("./background");
const puppeteer = require("puppeteer"); // need to dowload to test: npm install --save-dev puppeteer

test("test node", () => {
  // just a test that should always pass to test that jest is working
  const text = "hello";
  expect(text).toBe("hello");
});

test("test that treeArray is made", () => {
  const array = treeArray;
  expect(array).toBeUndefined();
});

test("test TreeNode functions", () => {
  var node = makeNode("www.hello.com");
  node = addDesc(node, "www.bye.com");
  expect(node.value).toBe("www.hello.com");
  expect(node.descendants).toStrictEqual(["www.bye.com"]);
  node = addDesc(node, "www.notyet.com");
  expect(["www.bye.com", "www.notyet.com"]).toEqual(
    expect.arrayContaining(node.descendants)
  );
});

test("test toggle on/off", async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto("file:///Users/mac/IdeaProjects/search-savior/popup.html");

  await page.click("label#toggle");
  await page.click("label#projectspage");
}, 10000);
