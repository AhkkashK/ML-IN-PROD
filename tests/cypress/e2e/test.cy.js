describe('Spam Classification E2E', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); 
  });

  it('should classify a spam message correctly', () => {
    cy.get('.message-textarea', { timeout: 10000 }).should('be.visible')
      .type("Claim your prize! You've won a 100€ gift voucher!");
    cy.get('.classify-button').should('be.visible').click();
    cy.get('.resultSpam', { timeout: 10000 }).should('contain', 'The message is classified as: SPAM');
  });

  it('should classify a ham message correctly', () => {
    cy.get('.message-textarea').should('be.visible')
      .type('Hi, how are you today?');
    cy.get('.classify-button').should('be.visible').click();
    cy.get('.resultHam').should('contain', 'The message is classified as: HAM');
  });

});
