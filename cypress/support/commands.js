Cypress.Commands.add(
  'fillMandatoryFieldsAndSubmit',
  (
    data = {
      firstName: 'John',
      lastName: 'Snow',
      email: 'johnSnow@gmail.com',
    }
  ) => {
    const longText = Cypress._.repeat('teste ', 10)

    cy.get('#firstName')
      .as('textName')
      .should('be.visible')
      .type(data.firstName)
    cy.get('#lastName')
      .as('textLastName')
      .should('be.visible')
      .type(data.lastName)
    cy.get('#email').as('textEmail').should('be.visible').type(data.email)
    cy.get('#open-text-area').should('be.visible').type(longText, { delay: 30 })
    cy.contains('button', 'enviar', { matchCase: false }).click()
  }
)
