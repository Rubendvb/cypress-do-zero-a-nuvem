/// <reference types="cypress" />

describe('Central de atendimento ao cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o titulo da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('teste ', 10)

    cy.get('#firstName').as('textName').should('be.visible').type('Rubén')
    cy.get('#lastName').as('textLastName').should('be.visible').type('Vásquez')
    cy.get('#email')
      .as('textEmail')
      .should('be.visible')
      .type('teste@gmail.com')

    cy.get('#phone').as('phoneField').should('be.visible').type('21999999999')
    cy.get('@phoneField').then(($text) => {
      console.log('$text', $text[0].value)
    })
    cy.get('#open-text-area').should('be.visible').type(longText, { delay: 30 })
    cy.get('button[type="submit"]').click()
    cy.get('.success').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').as('textName').should('be.visible').type('Rubén')
    cy.get('#lastName').as('textLastName').should('be.visible').type('Vásquez')

    cy.get('#email')
      .as('textEmail')
      .should('be.visible')
      .type('teste@gmail,com')

    cy.get('#open-text-area').should('be.visible').type('Teste')
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })
})
