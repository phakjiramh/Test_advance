import {user} from "./faker";

describe('template spec', () => {

   beforeEach(() => {
    cy.visit('https://docs.howly.com/pdf-to-edit')
    
   });

 
  it('DropFile', () => {
    const dropFile = cy.get('div>input[type="file"]')
    console.log ("drop file ",dropFile)
    dropFile.selectFile('cypress/fixtures/dummy.pdf', {
      action: 'drag-drop'
    })
  })

  
  it("CheckAPI:DropFile", () => {
    cy.request("POST", "https://n.clarity.ms/collect").then((response) => {
      expect(response.status).to.eq(204)
    })

    console.log(user)


  })
})