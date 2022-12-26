# Website: [Best Friends](http://opencart.qatestlab.net/index.php?route=common/home)

### Codeceptjs command for run

**Command to run all tests:**

```
npx codeceptjs run
```

```
npx codeceptjs run --grep "Name tag"
```

```
npx codeceptjs run --steps
```

**Command to create Page Object:**

```
npx codeceptjs gpo
```

**Command to create main config file => codecept.conf.js:**

```
npx codeceptjs init
```

**Command to update all files:**

```
npx codeceptjs def
```

**Command to create custom helper:**

```
npx codeceptjs gh
```

### Task 01 => Done

1. Пройти регистрацию нового пользователя и проверить текст успешной регистрации. Начальные шаги доступны в моём репозитории.
2. Пушнуть изменения в новую ветку своего репозитория на github.
3. Скинуть мне ссылку на Pull Request.

### Task 02 => Done

1. Создать новый тест в котором купить любой продукт.
2. Залогиниться на сайт.
3. Перейти на страницу любого продукта.
4. Со страницы продукта вытянуть цену продукта и цену за цвет.
5. Перейти в корзину, Checkout.
6. На 3-м шаге выбирать новый адрес и заполнить форму.
7. На 6-м шаге Checkout вытянуть цену доставки и общую сумму.
8. Установить модуль codeceptjs-chai и добавить его в конфиг https://www.npmjs.com/package/codeceptjs-chai
9. Сравнить (цена продукта + цвет + доставка) с общей суммой через I.assertEqual().
10. Завершить покупку и подтвердить наличие текста успешной покупки “Your order has been placed!”.
11. Доп. задание: из списка заказов вывести в консоль номер последнего заказа.

### Task 03 => Done

1. Дополнить сценарий покупки продукта использованием Data Driven Advanced Usage | CodeceptJS.
2. Использовать 3+ ссылки на продукт.
3. Ссылки хранить в txt файле.
4. Читать ссылки из файла используя метод Node.js fs.readFileSync() Method - GeeksforGeeks.
5. Методы по чтению/конвертации файла хранить в отдельном объекте в папке helpers.
6. Переместить логин в конструкцию Before Getting Started | CodeceptJS.
7. Изменения вносить в git не используя UI, а через терминальные команды(git add <file>, git checkout -b ‘<branch>’, git commit -a -m “<msg>”, git status, git push и т.п.).

### Task 04 => Done

1. Методы объекта страницы, которые не используются в сценарии, а только в самом объекте, переименовать, чтобы начинались с “\_”. Напр. completeStepsFrom2to4() - > \_completeStepsFrom2to4().
2. Очистить корзину перед покупкой товара используя конструкцию tryTo() Plugins | CodeceptJS. Инструкции поместить в Before().
3. Получение цены из строки переместить в custom helper Custom Helpers | CodeceptJS
4. Добавить в список ссылок Parrot toys (qatestlab.net), у которого нет опций. Успешно завершить тест с таким продуктом, используя конструкцию tryTo().
5. Добавить в список ссылок Aquarium (qatestlab.net), который не доступен к покупке.

### Task 05 =>

1. Вывести в консоль цену покупки в гривнах. Курс гривны получить используя REST API. Get запрос: https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&json
   Установка: API Testing | CodeceptJS
   Более подробно:
   REST | CodeceptJS
   JSONResponse | CodeceptJS
2. Подключить HTML отчет к тесту. Reporters | CodeceptJS
3. Заполнить README.md используя шаблон в моём репозитории либо любой другой понравившийся. Файл должен содержать информацию о проекте и инструкции как его установить и запустить. Установка компонентов осуществляется командой npm i.
