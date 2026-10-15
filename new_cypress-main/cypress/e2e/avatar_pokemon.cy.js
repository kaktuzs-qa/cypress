describe('Проверка покупки нового аватара', function () {

    it('Покупка аватаа на pokemonbattle.ru', function () {
         cy.visit('https://pokemonbattle.ru/');

        cy.get('#k_email').type('___'); // user_login
        cy.get('#k_password').type('____'); // user_password
        cy.get('.MuiButton-root').click();
        cy.get('.header_card_trainer').click();
        cy.get('[data-qa="shop"]').click()
        cy.get('.available') // Находим все карточки доступные к покупке
          .find('.shop__button') // Ищем кнопки внутри этих карточек
          .then(($buttons) => {
            const count = $buttons.length;
            const randomIndex = Math.floor(Math.random() * count);
        cy.wrap($buttons).eq(randomIndex).click();// Кликаем на кнопку в случайной доступной карточке
    });
        cy.get('.card_number').type('4620869113632996'); // вводим номер карты
        cy.get('.card_csv').type('125'); // вводим CVV карты
        cy.get('.card_date').type('1226'); // вводим срок действия карты
        cy.get('.card_name').type('NAME'); // вводим имя владельца действия карты
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click(); // нажимаем кнопку Оплатить
        cy.get('.threeds_number').type('56456'); // вводим код подтверждения СМС
        cy.get('.style_1_base_button_payment_body > .style_1_base_button_payment').click(); // нажимаем кнопку Оплатить
        cy.contains('Покупка прошла успешно').should('be.visible'); // проверяем наличие и видимость сообщения об успешной покупке

    })
 }) 
