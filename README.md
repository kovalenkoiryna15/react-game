# Unblock It Game

## Stack

- [x] [webpack](https://webpack.js.org/)
- [x] [React](https://reactjs.org/) + [Redux](https://redux.js.org/) +
      [Thunk](https://github.com/reduxjs/redux-thunk)
- [x] [Jest](https://jestjs.io/)
      (+ [React Testing Library](https://testing-library.com/docs/reac-testing-library/intro/))
- [x] [Bootstrap](https://getbootstrap.com/) (+ [Bootswatch](https://bootswatch.com/))
- [x] [sass](https://sass-lang.com/)
- [x] [ESLint](https://eslint.org/), [Stylelint](https://stylelint.io/),
      [Prettier](https://prettier.io/), [EditorConfig](https://editorconfig.org/)
- [x] [TravisCI](https://travis-ci.org/)
- [x] [firebase realtime database](https://firebase.google.com/)

## Требования к оформлению приложения

- для стандартных разрешений экрана монитора до 1024×768 включительно, игра полностью помещается в экран без появления полос прокрутки. При меньшем разрешении экрана может появиться вертикальная полоса прокрутки. Минимальная ширина страницы, при которой проверяется корректность отображения приложения - 500рх. Игру можно [развернуть во весь экран](https://html5.by/blog/fullscreen-javascript-api/)
- интерактивность элементов, с которыми пользователи могут взаимодействовать, изменение внешнего вида самого элемента и состояния курсора при наведении, использование разных стилей для активного и неактивного состояния элемента, плавные анимации
- в футере приложения есть ссылка на гитхаб автора, год создания приложения, [логотип курса](https://rs.school/images/rs_school_js.svg) со [ссылкой на курс](https://rs.school/js/)

## Rate Criteria:

**Максимальный балл за задание: 100 баллов**.

В связи со свободным выбором темы создаваемой игры, проверяются и оцениваются только отдельные её элементы, указанные в критериях оценки.

Для удобства проверки необходимо записать и разместить на YouTube небольшое (2-3 мин) видео для проверяющих с объяснением как реализован каждый пункт из перечисленных в критериях оценки. Ссылку на видео можно добавить в описание pull request или в footer приложения добавить [иконку YouTube](https://upload.wikimedia.org/wikipedia/commons/0/09/YouTube_full-color_icon_%282017%29.svg) со ссылкой на видео.

### Basic scope +30

- [ ] вёрстка, дизайн, UI. Выполняются требования к оформлению приложения +10
- [ ] эффекты анимации. Анимация ходов, перемещения фигур, допустимых и недопустимых ходов, начала и окончания игры, победы и поражения и т.д +10
- [ ] механика игры. Ходы, перемещения фигур, набранные баллы, окончание игры и т.д. подчиняются определённым свойственным игре правилам +10

### Advanced scope +50

- [ ] звуки и музыка. В игре есть звуки и музыка, и есть настройки звуков и музыки: возможность вкл/откл звуки, вкл/откл музыку, регулировать громкость звуков, регулировать громкость музыки +10
- [ ] настройки игры. Есть не меньше трёх настроек разных опций игры, например, внешний вид игрового поля и фигур, сложность игры, определение порядка ходов. Речь не про настройки звуков и музыки, которые проверялись и оценивались в предыдущем пункте. Это должны быть настройки разных опций, а не три параметра одной опции, например, размера игрового поля +10
- [ ] статистика. Пользователь информируется о состоянии игры, ведётся запись ходов, побед и поражений, времени игры, либо отображается другая статистика игры. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр +10
- [ ] сохранение состояния игры при перезагрузке страницы. Сохраняются все опции игры: ходы, набранные очки, положение фигур и т д. Состояние игры сохраняется без необходимости кликать по кнопке save. Есть кнопка new game для запуска новой игры +10
- [ ] возможность управления игрой с клавиатуры или не меньше пяти hot keys. Есть список горячих клавиш для управления игрой с клавиатуры +10

### Hacker scope +20

- [ ] автопроигрывание игры. Есть кнопка Autoplay запускающая игру в автоматическом режиме. Это может быть отдельная партия игры (крестики-нолики, шашки, шахматы, морской бой, судоку и т.д.). Для бесконечных игр (тетрис, Flappy Bird и т.д), игра зацикливается не раньше чем через 30 ходов. Речь не про автозавершение начатой игры, автопроигрывание игры начинает игру с пустого поля или стандартной раскладки и показывает как эта игра сама играет без пользователя +10
- [ ] дополнительная функциональность. Реализована достаточно сложная в реализации дополнительная функциональность, которая улучшает качество игры. В качестве дополнительной функциональности рекомендуется создать и использовать бекенд, например, для хранения счёта игры. Также может быть и другая дополнительная функциональность, например, 3d игра, написана логика для компьютерного противника, есть сетевой режим игры, и т.д +10

## Quick Start

```bash
$ git clone https://github.com/kovalenkoiryna15/react-game/
$ cd react-game
$ git checkout react-game
$ npm i
```

### Run app in dev mode

```bash
$ npm run start
```

### Run app in prod mode

```bash
$ npm run build
```