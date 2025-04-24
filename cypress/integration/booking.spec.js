    describe('Бронирование фильма в доступный зал', () => {
        let selectors;
        const adminCredentials = {
          login: 'qamid@qamid.ru',
          password: 'qamid'
        };
      
        let theaterName;
      
        before(() => {
          cy.fixture('selectors').then((data) => {
            selectors = data;
          });
        });
      
        it('Название зала и бронирование билета', () => {
          cy.visit(selectors.admin.url);
          cy.get(selectors.admin.loginInput).type(adminCredentials.login);
          cy.get(selectors.admin.passwordInput).type(adminCredentials.password);
          cy.get(selectors.admin.submitButton).click();
      
          cy.get('.theater-list .theater-item')
            .first()
            .then($el => {
              theaterName = $el.text().trim();
              cy.log('Зал для бронирования: ' + theaterName);
            });
      
          cy.visit(selectors.booking.url);
      
          cy.get(selectors.booking.movieItem).first().click();
      
          cy.get(selectors.booking.hallSelect).select(theaterName);
      
          cy.get(selectors.booking.sessionTime).first().click();
    
          cy.get(selectors.booking.seatAvailable).first().click();
      
          cy.get(selectors.booking.nameInput).type('Тест');
          cy.get(selectors.booking.emailInput).type('test@example.com');
      
          cy.get(selectors.booking.submitButton).click();
      
          cy.get(selectors.booking.successMessage)
            .should('contain.text', 'Бронирование успешно');
        });
      });