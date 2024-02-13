const { constantsPage, loginPage, sequencePage, tummeePortalUrls } = inject();
const loginCredentials = require("../config/loginCredentials.json");

Feature("Login");

let sequenceName = "Test1"; // can be read from inut file
let sequenceType = "Yoni";

let sequence = [
  "Downward Facing Dog Pose",
  "Three Legged Downward Facing Dog Pose",
  "Corpse Pose",
];

Before(async ({ I }) => {
  await I.amOnPage("/");

  // Verify page load
  await I.isElementAvailable(loginPage.locators.buttons.loginButton);
  await I.clickElement(loginPage.locators.buttons.loginButton);

  // wait for page/url update
  await I.waitInUrl(
    tummeePortalUrls.urls.login,
    constantsPage.waitTime.PAGE_LOAD_WAIT_TIME
  );

  await I.fillValue("#email", loginCredentials.email); //using id
  await I.fillValue("#pwd", loginCredentials.password); // using id

  await I.click("//button[text() = 'Login']"); //using relative xpath and text

  await I.waitInUrl("/user", 60);
});

Scenario("T1: Login and create sequence", async ({ I }) => {
  // Login steps covered in Before Hook

  await sequencePage.navigateToCreateSequence();

  await I.isElementAvailable("#txtSequenceTitle"); //input id
  await I.fillValue("#txtSequenceTitle", sequenceName);

  // Not working as a select box as checkbox is not available
  // await I.isElementAvailable("#js-yoga-type");
  // await I.selectOption("#js-yoga-type", "Acro");

  await I.clickElement("#js-yoga-type");
  await I.isElementAvailable(`//option[@value = '${sequenceType}']`);
  await I.click(
    `//select[@id = 'js-yoga-type']//option[contains(@value,'${sequenceType}')]`
  );

  await I.clickElement("#createSequenceGetStarted"); // Clicking button by id

  await I.waitInUrl(
    tummeePortalUrls.urls.createSequence,
    constantsPage.waitTime.PAGE_LOAD_WAIT_TIME
  );

  // Create Sequence by selecting every option from the sequence array

  let counter = 0;
  await sequence.forEach((pose) => {
    //select element from the available poses
    I.isElementAvailable(
      `//ul[@id='selectYogaSequencePoses']//p[text() = '${pose}']`
    );
    I.click(`//ul[@id='selectYogaSequencePoses']//p[text() = '${pose}']`);

    //verify selection - IN PARTICULAR ORDER
    I.isElementAvailable(
      `//ul[@id='yogaSequenceSelectedPoses']/li[${++counter}]//p[text() = '${pose}']`
    );
  });

  //await I.clickElement(sequencePage.locators.buttons.saveSequence);

  // // Now add another yoga pose to the right of 2nd yoga pose
  // await I.isElementAvailable(
  //   `//ul[@id='yogaSequenceSelectedPoses']//p[text() = '${sequence[1]}']//following-sibling::p[@title='Variations']/i`
  // );
}).tag("Login");
