# base-project

## Встановлення

*Для роботи необхідний [NodeJS](http://nodejs.org/)*

*Ввести в терміналі:*
 
```````
npm install -g gulp

npm install -g bower

npm init

npm install --save-dev gulp 

```````


**Структура проекту**

``````````
├── app
│   ├── img
│   ├── js
│   │   └── vendor
│   │   │   └── modernizr.js
│   │   └── application.js
│   │   └── common.js
│   ├── css
│   │   └── main.css
│   │   └── develop-style.css
│   ├── partials
│   │   └── footer.html
│   │   └── form.html
│   │   └── head.html
│   │   └── header.html
│   │   └── header-menu.html
│   │   └── map-google.html
│   │   └── template.html
│   ├── scss
│   │   └── partials
│   │   │   └── header.scss
│   │   │   └── footer.scss
│   │   └── base.scss
│   │   └── buttons.scss
│   │   └── fonts.scss
│   │   └── forms.scss
│   │   └── icons.scss
│   │   └── layout.scss
│   │   └── mixins.scss
│   │   └── navbar.scss
│   │   └── partials.scss
│   │   └── reset.scss
│   │   └── responsive.scss
│   │   └── settings.scss
│   │   └── typo.scss
│   │   └── main.scss
│   └── index.html
├── build
│   ├── img
│   ├── js
│   │   └── application.js
│   │   └── bower.js
│   │   └── common.js
│   ├── css
│   │   └── bower.css
│   │   └── develop-style.css
│   │   └── main.css
│   └── index.html
├── zip
│   └── compressed-files
├── bower_components
├── node_modules
├── package.json
├── gulpfile.js
├── bower.json
├── .bowerrc
├── .gitattributes
└── .gitignore
``````````

**Швидкі команди**

* **gulp** _Запуск проекту_

 ```````
  gulp
  ```````

* **prod** _Переключення в режим "production" (публічний та оптимізований)_

 ```````
  gulp prod
  ```````

* **Clean** _Видалення всіх файлів з папки build_

 ```````
  gulp clean
  ```````

* **Zip** _Стиснення і збереження в `zip` папку з міткою часу для швидкого обміну_

```````
gulp zip
```````