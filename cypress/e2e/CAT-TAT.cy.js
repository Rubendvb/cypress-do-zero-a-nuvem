/// <reference types="cypress" />

describe('Central de atendimento ao cliente TAT', () => {
  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o titulo da aplicação', () => {
    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT')
  })

  it('preenche os campos obrigatórios e envia o formulário', () => {
    cy.clock()
    const longText = Cypress._.repeat('teste ', 5)

    cy.get('#firstName').as('textName').should('be.visible').type('Rubén')
    cy.get('#lastName').as('textLastName').should('be.visible').type('Vásquez')
    cy.get('#email')
      .as('textEmail')
      .should('be.visible')
      .type('teste@gmail.com')
    // cy.get('#open-text-area').should('be.visible').type(longText, { delay: 30 })
    cy.get('#open-text-area').should('be.visible').type(longText)

    cy.contains('button', 'enviar', { matchCase: false }).click()

    cy.get('.success').should('be.visible')
    
    cy.tick(3000)
    
    cy.get('.success').should('not.be.visible')

  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.clock()
    cy.get('#firstName').as('textName').should('be.visible').type('Rubén')
    cy.get('#lastName').as('textLastName').should('be.visible').type('Vásquez')
    cy.get('#email')
      .as('textEmail')
      .should('be.visible')
      .type('teste@gmail,com')
    cy.get('#open-text-area').should('be.visible').type('Teste')
    cy.contains('button', 'enviar', { matchCase: false }).click()

    cy.get('.error').should('be.visible')
    
    cy.tick(3000)
    
    cy.get('.error').should('not.be.visible')
  })

  it('campo telefone continua vazio quando preenchido com um valor não-numérico', () => {
    cy.get('#phone').type('abcde').should('have.value', '')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () => {
    cy.clock()
    cy.get('#firstName').as('textName').should('be.visible').type('Rubén')
    cy.get('#lastName').as('textLastName').should('be.visible').type('Vásquez')
    cy.get('#email')
      .as('textEmail')
      .should('be.visible')
      .type('teste@gmail.com')
    cy.get('#open-text-area').should('be.visible').type('Teste')
    cy.get('#phone-checkbox').check()
    cy.contains('button', 'enviar', { matchCase: false }).click()

    cy.get('.error').should('be.visible')
    
    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
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
    cy.clock()
    cy.get('button[type="submit"]').click()

    cy.get('.error').should('be.visible')
    
    cy.tick(3000)

    cy.get('.error').should('not.be.visible')
  })

  Cypress._.times(5, () => {
    it('envia o formulário com sucesso usando um comando customizado', () => {
      cy.clock()
      const data = {
        firstName: 'Rubén',
        lastName: 'Vásquez',
        email: 'teste@gmail.com',
      }
  
      cy.fillMandatoryFieldsAndSubmit(data)
  
      cy.get('.success').should('be.visible')
      
      cy.tick(3000)
  
      cy.get('.success').should('not.be.visible')
    })
    
  })

  it('seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product').select('Mentoria').should('have.value', 'mentoria')
  })

  it('seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
  })

  it('seleciona um produto (Blog) por seu índice', () => {
    cy.get('#product').select(1).should('have.value', 'blog')
  })

  it('marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
  })

  it('marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]').each(($el) => {
      cy.wrap($el).check().should('be.checked')
    })
  })

  it('marca ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json')
      .then((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('input[type="file"]')
      .selectFile('cypress/fixtures/example.json', { action: 'drag-drop' })
      .then((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json').as('sampleFile')

    cy.get('input[type="file"]')
      .selectFile('@sampleFile')
      .then((input) => {
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
      .invoke('removeAttr', 'target')
      .click()

    cy.contains('h1', 'CAC TAT - Política de Privacidade').should('be.visible')
  })
})
