describe('Test API', () => {
    it('Validate Header', () =>{
        cy.request('https://pokeapi.co/api/v2/pokemon/ditto').as('pokemon')
        cy.get('@pokemon').its('headers').its('content-type')
            .should('include', 'application/json; charset=utf-8')
    })

    it('Validate Body', () => {
        cy.request('GET', 'https://pokeapi.co/api/v2/pokemon/ditto')
        .its('body')
        .then(body => {
            cy.wrap(body.forms).each(form => {
              expect(form).to.have.property('name', 'ditto');
              expect(form).to.have.property('url', 'https://pokeapi.co/api/v2/pokemon-form/132/');
            })
        }) 
    })
    it('Validate Status', () => {
        cy.request('https://pokeapi.co/api/v2/pokemon/ditto').as('pokemon')
        cy.get('@pokemon').its('status').should('equal', 200)
    })

    it('Validate Status 2', () => {
        cy.request({
            method : 'GET',
            url : 'https://reqres.in/api/users?pages=2&per_pages=1&delay=3'
        }). as('pokemon')
        cy.get('@pokemon').its('status').should('equal', 200)
    })

    it('Validate Content', () => {
        cy.request('https://pokeapi.co/api/v2/pokemon/ditto').as('pokemon')
        cy.get('@pokemon').its('body').should('include', {name : 'ditto'})
    })

    it('Validate Content Task', () => {
        cy.request('GET', 'https://pokeapi.co/api/v2/pokemon/ditto')
        .then(response => {
            expect(response.body.abilities[0].ability.name).to.equal('limber')
            expect(response.body.abilities[0].ability.url).to.equal('https://pokeapi.co/api/v2/ability/7/')
        })
    });

    it('Validate Negative Response', () => {
        cy.request({
            method : 'GET',
            url : 'https://pokeapi.co/api/v2/pokemon/eduwork',
            failOnStatusCode: false
        }). as('eduwork')
        cy.get('@eduwork').its('status').should('equal', 404)
    });

})