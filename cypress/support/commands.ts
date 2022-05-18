declare namespace Cypress {
  interface Chainable<Subject = any> {
    loginUser(userName?: string, password?: string): typeof loginUser;
    goToRoute(route: string): typeof goToRoute;
    checkForDetectableAccessibilityIssues(options?: {
      elsToExclude: string[];
    }): typeof checkForDetectableAccessibilityIssues;
  }
}

function goToRoute(route: string) {
  cy.visit(route);
}
function loginUser(
  userName: string = 'theDoctor',
  password: string = 'wordpass'
) {
  cy.visit('/login');
  cy.get('#userName').type(userName);
  cy.get('#password').type(password);
  cy.get('[data-auth-login-submit]').click();
}

function checkForDetectableAccessibilityIssues(options?: {
  elsToExclude: string[];
}) {
  const { elsToExclude = [] } = options || {};
  cy.injectAxe();
  cy.configureAxe({
    // How to configure this: https://www.deque.com/axe/core-documentation/api-documentation/#api-name-axeconfigure
    reporter: 'v2',
    runOnly: {
      type: 'tag',
      values: ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'],
    },
  });
  const axeContextParameter = {
    exclude: elsToExclude,
  };

  // const axeCallback = logViolationsInTerminal;

  cy.checkA11y(axeContextParameter, undefined);
}

Cypress.Commands.add('loginUser', loginUser);
Cypress.Commands.add('goToRoute', goToRoute);
Cypress.Commands.add(
  'checkForDetectableAccessibilityIssues',
  checkForDetectableAccessibilityIssues
);
// ***********************************************
// This example namespace declaration will help
// with Intellisense and code completion in your
// IDE or Text Editor.
// ***********************************************
// declare namespace Cypress {
//   interface Chainable<Subject = any> {
//     customCommand(param: any): typeof customCommand;
//   }
// }
//
// function customCommand(param: any): void {
//   console.warn(param);
// }
//
// NOTE: You can use it like so:
// Cypress.Commands.add('customCommand', customCommand);
//
// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
