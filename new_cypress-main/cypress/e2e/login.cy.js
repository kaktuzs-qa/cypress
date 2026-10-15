import * as data from "../helpers/default_data.json"
import * as main_page from "../locators/main_page.json"
import * as result_page from "../locators/result_page.json"


describe('Проверка авторизации', function () {

    beforeEach('Начало теста', function () {
        cy.visit('/'); // Зашли на сайт
        cy.get(main_page.fogot_pass_btn).should('have.css', 'color', 'rgb(0, 85, 152)'); // Проверяю цвет кнопки восстановить пароль
    });

    afterEach('Конец теста', function () {
        cy.get(result_page.close).should('be.visible'); // Есть крестик и он виден пользователю
    });

   it('Верный логин и верный пароль', function () {
        cy.get(main_page.email).type(data.login); // Ввели верный логин
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get(main_page.login_button).click(); // Нажал войти
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю 
    })

     it('Неверный логин и верный пароль', function () {
        cy.get(main_page.email).type('germ@dolnikov.ru'); // Ввели неверный логин
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get(main_page.login_button).click(); // Нажал войти
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю 
    })

    it('Верный логин и неверный пароль', function () {
        cy.get(main_page.email).type(data.login); // Ввели верный логин
        cy.get(main_page.password).type('qaon111'); // Ввели неверный пароль
        cy.get(main_page.login_button).click(); // Нажал войти
        cy.get(result_page.title).contains('Такого логина или пароля нет'); // Проверяю что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю 
    })

    it('Валидация, логин без @', function () {
        cy.get(main_page.email).type('germandolnikov.ru'); // Ввели верный логин без @
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get(main_page.login_button).click(); // Нажал войти
        cy.get(result_page.title).contains('Нужно исправить проблему валидации'); // Проверяю что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю 
    })

    it('Верный логин, с нарущением регистра и верный пароль', function () {
        cy.get(main_page.email).type('GerMan@Dolnikov.ru'); // Ввели верный логин с Заглавными буквами
        cy.get(main_page.password).type(data.password); // Ввели верный пароль
        cy.get(main_page.login_button).click(); // Нажал войти
        cy.get(result_page.title).contains('Авторизация прошла успешно'); // Проверяю что после авторизации вижу текст
        cy.get(result_page.title).should('be.visible'); // Текст виден пользователю 
    })

    
})


// запуск через теринал: npx cypress run --spec cypress/e2e/poke.cy.js --browser chrome
