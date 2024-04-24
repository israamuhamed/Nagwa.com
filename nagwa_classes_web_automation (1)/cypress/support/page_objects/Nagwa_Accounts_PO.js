/// <reference types="cypress" />
import Main_Base_PO from "./Main_Base_PO";

class Nagwa_Accounts_PO extends Main_Base_PO
 {
    
    elements = {
        
        continue_with_social_logins: () => cy.get('a:nth-child(1)'),
        continue_with_facebook_logins: () => cy.get('a:nth-child(2)'),
        continue_with_email: () => cy.get('a:nth-child(3)'),
        email:()=> cy.get('#email'),
        submit:()=> cy.get('#sbmtBtn'),
        otp:()=> cy.get('.field > :nth-child(1)'),
        verfiy_button:()=> cy.get('#verifyBtn'),
        firstName:()=> cy.get('#firstName'),
        lastName:()=> cy.get('#lastName'),
        country:()=> cy.get('#CountryIso'),
        grade:()=> cy.get('#GradeId'),
        signUp:() => cy.get('#SignUpDataEmail')
    }

click_on_continue_with_email_link() {
        this.elements.continue_with_email().click();
    }
enter_email(email){
    this.elements.email().type(email)
}
click_on_signUp_button(){
    this.elements.signUp().click()
}
click_on_next_button(){
    this.elements.submit().click()
}

enter_email_otp(email){
    cy.task('connectDB',`SELECT * FROM public."UserMailOtp" where "Email" = '${email}'and "IsVerified" is false `).then((res)=>{
        this.elements.otp().type(res[0].Otp)
    })
}
click_on_verfiy_button(){
    this.elements.verfiy_button().click()
}
enter_firstName(firstName){
    this.elements.firstName().type(firstName)
}
enter_lastName(lastName){
    this.elements.lastName().type(lastName)
}
select_country(country_key){
    this.elements.country().select(this.get_value_by_key(country_key, this.config.language()))
}
select_grade(grade_key){
    this.elements.grade().select(this.get_value_by_key(grade_key, this.config.language()))
}
new_user_signup(dataTable){
    let email = Cypress.env("new_user_email")
    this.enter_email(email)
    this.click_on_next_button()
    this.enter_email_otp(email)
    this.click_on_verfiy_button()
    dataTable.hashes().forEach($elem => {
        this.enter_firstName($elem.fristName)
        this.enter_lastName($elem.lastName)
        this.select_country($elem.country)
        this.select_grade($elem.grade)
    });
    this.click_on_signUp_button()
}

}




export default Nagwa_Accounts_PO;