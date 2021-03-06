'use strict';

const ans = prompt('Введите имя');

const reg = /n/;
// После объявления патерна (n) прописываются флаги.
// Основных флагов 3
// i - ищет вне зависимости от регистра.
// g - работает глобально, то есть, не только первое совпадение. Для search не работаетю
// m - включает многострочный режим.


console.log(ans.search(reg)); //Метод search
console.log(ans.match(reg)); //При установке g получаем массив со всеми найденными рез-тами

const pass = prompt('Введите пароль');
console.log(pass.replace(/./g, '*'));
//Метод replace заменяет что-то чем-то. В данном случае все (.) звездочками.
//Чтобы получить про сто точку мы ее экранируем - /\. Таким образм указываем, что это не спецсимвол.

console.log('12-34-56'.replace(/-/g, ':'));

const bb = 'Ffaagh';
const reg1 = /h/ig;
console.log(reg1.test(bb));
// Метод test возвращает true или false в зависимости есть ли у испытуемого патерн.

// В регулярках часто используются классы.
// \d - все цифры.
// \w - все буквы.
// \s - все пробелы.

console.log('200px'.match(/\d/g)); //Получаем массив [ '2', '0', '0' ]

const str = 'My name is R2D2';
console.log(str.match(/\w\d\w\d/)); //Можно создавать смешанные шаблоны.

// Часто используются обратные классы. Когда нужно найти не буквы или не цифры.
// Записываются так же, как классы, но с большой буквы - //\W, //\D.


const width = '200px';

console.log(+width.replace(/\D/g, '')); // Легко получаем число из значения CSS.