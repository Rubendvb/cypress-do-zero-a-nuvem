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
    cy.get('#open-text-area').should('be.visible').type(longText, { delay: 30 })

    cy.contains('button', 'enviar', { matchCase: false }).click()

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
    cy.contains('button', 'enviar', { matchCase: false }).click()

    cy.get('.error').should('be.visible')
  })

  it('campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
    cy.get('#phone').type('abcde').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.get('#firstName').as('textName').should('be.visible').type('Rubén')
    cy.get('#lastName').as('textLastName').should('be.visible').type('Vásquez')
    cy.get('#email')
      .as('textEmail')
      .should('be.visible')
      .type('teste@gmail.com')
    cy.get('#open-text-area').should('be.visible').type('Teste')
    cy.get('#phone-checkbox').click()
    cy.contains('button', 'enviar', { matchCase: false }).click()

    cy.get('.error').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Rubén')
      .should('have.value', 'Rubén')
      .clear()
      .should('have.value', '')
    cy.get('#lastName')
      .type('Vásquez')
      .should('have.value', 'Vásquez')
      .clear()
      .should('have.value', '')
    cy.get('#email')
      .type('teste@gmail.com')
      .should('have.value', 'teste@gmail.com')
      .clear()
      .should('have.value', '')
    cy.get('#open-text-area').type('Teste').clear().should('have.value', '')
    cy.get('#phone').type('21999999999').clear().should('have.value', '')

    cy.contains('button', 'enviar', { matchCase: false }).click()
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
  })

  it('envia o formulário com sucesso usando um comando customizado', () => {
    const data = {
      firstName: 'Rubén',
      lastName: 'Vásquez',
      email: 'teste@gmail.com',
    }

    cy.fillMandatoryFieldsAndSubmit(data)

    cy.get('.success').should('be.visible')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('select').select('YouTube').should('have.value', 'youtube')
  })

  it.only('seleciona um produto (Blog) por seu índice', () => {
    cy.get('select').select(1).should('have.value', 'blog')
  })
})
