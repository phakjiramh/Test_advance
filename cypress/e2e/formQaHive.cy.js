import {createFakeUser} from "./faker";

describe('Form',()=>{
beforeEach(() => {
    cy.visit('https://web-demo.qahive.com/form-demo')
});

it('inputRequireBox',()=>{
    
        cy.get('.form[class="form"]').within(() => {
            const randomUser = createFakeUser()
            const validateUser = [randomUser.randomEmail,randomUser.randomFirstName,randomUser.randomLastName]
            
            cy.get('div[class="form-row"]>input[id="username"]').type(randomUser.randomEmail)
            cy.get('div[class="form-row"]>input[name="firstname"]').type(randomUser.randomFirstName)
            cy.get('div[class="form-row"]>input[class="form-input lastname"]').type(randomUser.randomLastName)
            cy.get('div[class="form-row"]>div[class="radio"]>label>input[data-testid="other"]').should('be.checked')
            cy.get('div[class="form-row"]>select>option').should(($list)=>{
                expect($list, '5 list').to.have.length(5)
                expect($list.eq(0), ' ').to.contain('Select')
                expect($list.eq(1), 'TH').to.contain('Thailand')
                expect($list.eq(2), 'PH').to.contain('Philippines')
                expect($list.eq(3), 'HK').to.contain('Hongkong')
                expect($list.eq(4), 'VN').to.contain('Vietnam')
            })
        //สามารถ varify ด้วย within ได้ด้วย
            // cy.get('div[class="form-row"]>select').within(() => {
            //     cy.get('option').eq(0).contains('Select')
            //     cy.get('option').eq(1).contains('Thailand')
            //     cy.get('option').eq(2).contains('Philippines')
            //     cy.get('option').eq(3).contains('Hongkong')
            //     cy.get('option').eq(4).contains('Vietnam')

            // })


            cy.get('div[class="form-row"]>select').select([4])
            cy.get('div[class="form-row"]').contains("Accept agreement")
            cy.get('div[class="form-row"]>input[type="checkbox"]').check()
            cy.get('[data-testid="submit"]').should('be.visible')
           // cy.get('button').contains('submit').click() => button แบบไม่ใช้ data-testid
           cy.get('[data-testid="submit"]').contains('submit').click()

           cy.get('div[class="alert alert-success"]').then(() => {
            for(let index = 0; index < validateUser.length; index++){
                cy.get('pre').contains(validateUser[index])
                }
            })
        })//
           
        })//


it('NotInputRequireBox', ()=>{
    cy.get('form[class="form"]').within(()=>{
        cy.get('div[class="form-row"]').contains("Accept agreement")
        cy.get('div[class="form-row"]>input[type="checkbox"]').check()
        cy.get('[data-testid="submit"]').should('be.visible')
       cy.get('[data-testid="submit"]').contains('submit').click()

    })
   
})

it('downloadFile',()=>{
    cy.get('.form[class="form"]').within(() => {
        const randomUser = createFakeUser()
        const validateUser = [randomUser.randomEmail,randomUser.randomFirstName,randomUser.randomLastName]
        
        cy.get('div[class="form-row"]>input[id="username"]').type(randomUser.randomEmail)
        cy.get('div[class="form-row"]>input[name="firstname"]').type(randomUser.randomFirstName)
        cy.get('div[class="form-row"]>input[class="form-input lastname"]').type(randomUser.randomLastName)
        cy.get('div[class="form-row"]>div[class="radio"]>label>input[data-testid="other"]').should('be.checked')
        cy.get('div[class="form-row"]>select>option').should(($list)=>{
            expect($list, '5 list').to.have.length(5)
            expect($list.eq(0), ' ').to.contain('Select')
            expect($list.eq(1), 'TH').to.contain('Thailand')
            expect($list.eq(2), 'PH').to.contain('Philippines')
            expect($list.eq(3), 'HK').to.contain('Hongkong')
            expect($list.eq(4), 'VN').to.contain('Vietnam')
        })
        cy.get('div[class="form-row"]>select').select([4])
            cy.get('div[class="form-row"]').contains("Accept agreement")
            cy.get('div[class="form-row"]>input[type="checkbox"]').check()
            cy.get('[data-testid="submit"]').should('be.visible')
           // cy.get('button').contains('submit').click() => button แบบไม่ใช้ data-testid
           cy.get('[data-testid="submit"]').contains('submit').click()

           cy.get('div[class="alert alert-success"]').then(() => {
            for(let index = 0; index < validateUser.length; index++){
                cy.get('pre').contains(validateUser[index])
            }
        })
        
       
        cy.get('div[class="form-row"]>a').contains('Download file').click()
        cy.intercept('GET', '/https://api-web-demo.qahive.com/auth/getCurrentUser').as('file')
        cy.request('https://jsonplaceholder.typicode.com/comments').then((response) => {
            expect(response.status).to.eq(200)
         })
    })

})

          
            

})







