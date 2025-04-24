escribe('Главная страница кинотеатра', () => {
    let selectors;
  
    beforeEach(() => {
      cy.fixture('selectors').then((data) => {
        selectors = data.selectors;
      });
      cy.visit('https://qamid.tmweb.ru/client/index.php');
    });
  
    it('Заголовок страницы отображается корректно', () => {
      cy.title().should('eq', 'Идёмвкино');
    });
  
    it('Отображается список фильмов', () => {
      cy.get(selectors.movieList).should('exist');
      cy.get(selectors.movieItems).should('have.length.greaterThan', 0);
    });
  
    it('Отображается навигация по дням недели', () => {
      cy.get(selectors.pageNavDay).should('exist');
      cy.get(selectors.pageNavDayButtons).should('have.length', 7);
    });
  
    it('Содержит кнопку "Купить билет"', () => {
      cy.contains('Купить билет').should('exist');
    });
  
    it('Фильмы отображаются с постерами', () => {
      cy.get(selectors.movieImages).should('exist');
    });
  });