/// <reference types="cypress" />

context('Fitting Ships', () => {
    beforeEach(() => {
      cy.visit('https://localhost:5001/')
    })
  
    describe('Page Load', () => {
        it('should load successfully', () => {
            cy.get('h2').should('have.text', 'Fitting Ships')
        });
    })
})

  