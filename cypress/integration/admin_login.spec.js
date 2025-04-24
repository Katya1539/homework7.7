describe('Логин в админ панель', () => {
    beforeEach(() => {
      cy.visit('https://qamid.tmweb.ru/admin/');
    });
  
    it('Проверка логина с данными из фикстуры', () => {
      cy.fixture('admin_login').then((data) => {
        const { selectors, testCases } = data;
  
        testCases.forEach((testCase) => {
          cy.log(`Тест: ${testCase.description}`);
  
          cy.get(selectors.loginInput).clear().type(testCase.username);
          cy.get(selectors.passwordInput).clear().type(testCase.password);
          cy.get(selectors.loginButton).click();
  
          if (testCase.expectedResult === 'success') {
            cy.url().should('include', '/admin/index.php');
          } else {
            cy.get(selectors.errorMsg).should('exist');
          }
        });
      });
    });
  });