/*For selenium we are using testng framework
similarly for cypress we have 2 testing frameworks ie)jasmine and mocha 
In this course we will be using mocha and we need not download seperately
It comes from the cypress package */

//describe denotes test suites and it denoted testcases and all it are wrapped under describe

/// <reference types="Cypress" />



describe("This is the testsuite", function()
{
it("My first testcase", function()
{
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
    //visit function is to navigate to that particular url
    cy.get('.search-keyword').type('be')
    cy.wait(3000)

    
    cy.get('.product').should('have.length', 6)
    cy.get('.product:visible').should('have.length', 5)
    //below is Parent child chaining and first css is parent and inside that parent it uses find function to find the child
   
    cy.get('.products').as("Productlocator") //using alias(as) function to store the locator in one variable
    cy.get('@Productlocator').find('.product').should('have.length', 5)
    cy.get('@Productlocator').find('.product').eq(1).contains('ADD TO CART').click()

    //to click based on name
    cy.get('@Productlocator').find('.product').each(($e1, index, $list)=>
    {
       const veggiename = $e1.find('.product-name').text() //here $e1 comes as a result of resolved promise
    //    and hence .text() works
       if(veggiename.includes('Strawberry'))
       {
        cy.wrap($e1).find('button').click();
       }
    })



    // const logo = cy.get('.brand')
    // logo.text()

    /* the above 2 lines doesnt work because cy.get('.brand') function has promise internally
    but when it is stored in string logo it is not a cypress command hence promise concept doesnt work 
    and it becomes asynchronous and when applying logo.text it doesnot fetch text
    hence below approach is followed and text() is not a cypress command and  cy.get('.brand').text() wont work
    cypress commands supports jquery commands and text() is a jquery command
    Non cypress commands cannot resolve promise by themselves.we need to manually resolve it by then()*/


    cy.get('.brand').then(function (logoelement) 
    {
       // cy.log(cy.get('.brand').text()) it will throw the error
       cy.log(logoelement.text()) 
       
    })

    cy.get('.brand').should('have.text', "GREENKART")

    cy.get('.cart-icon > img').click()
    cy.contains("PROCEED TO CHECKOUT").click()
    cy.contains("Place Order").click()


})
})

//electron is also using chrome browser for rendering html code but it eliminates additional features like favorites, bookmarking like chrome
//and cypress default runs in electron browser

// https://docs.cypress.io/app/get-started/why-cypress refer this for all important points
/* fixtures folder - used to store all the testdata
integration folder - used to write all the testcases
plugin folder - kind of listeners, customisation option for browser
support folder - customised commands, all the reusable methods are defined here
node modules - heart of cypress framework
cypress.config.json - it is a configuration file for entire framework and it has all properties
asynchronous - each line of code is hitting the server at a sigle time
synchronous - code execution takes place in sequential manner

Asynchronous: Code can execute without waiting for other operations to complete. For example, 
when you make a request to a server, the program can continue running while waiting for the server's 
response. This is useful for improving performance and user experience, especially in web applications.

Synchronous: Code execution happens in a sequential manner, meaning each operation must complete 
before the next one starts. If a server request is made, the program will wait (or block) until 
that request is fulfilled before moving on to the next line of code.

java script and any other programming built on js is asynchronous but cypress follows synchronous because they 
have build a code like that in the backend
promise - it is a status of the code line like whether it is executed/rejected/pending
so until promise status is resolved it will go to next step
To find the promise - use then() - wait until promise is resolved status but cypress backend, they have used
then() method and hidden from the user
selenium java - Synchronous

console.log - prints output in the terminal or developer console it is asynchronous
cy.log - cypress commands and prints output in the cypress dashboard*/