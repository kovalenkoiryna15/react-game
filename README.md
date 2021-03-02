# Battleship Game

## Stack

- [x] [webpack](https://webpack.js.org/)
- [x] [React](https://reactjs.org/) + [Redux](https://redux.js.org/) +
      [Thunk](https://github.com/reduxjs/redux-thunk)
- [x] [Bootstrap](https://getbootstrap.com/) (+ [Bootswatch](https://bootswatch.com/))
- [x] [sass](https://sass-lang.com/)
- [x] [ESLint](https://eslint.org/), [Stylelint](https://stylelint.io/),
      [Prettier](https://prettier.io/), [EditorConfig](https://editorconfig.org/)
- [x] [TravisCI](https://www.travis-ci.com/)

## Rate Criteria:

**Максимальный балл за задание: 100 баллов**

### Basic scope +30

- [x] вёрстка, дизайн, UI. Выполняются требования к оформлению приложения +10
- [ ] эффекты анимации. Анимация ходов, перемещения фигур, допустимых и недопустимых ходов, начала и окончания игры, победы и поражения и т.д +10
- [x] механика игры. Ходы, перемещения фигур, набранные баллы, окончание игры и т.д. подчиняются определённым свойственным игре правилам +10

### Advanced scope +50

- [x] звуки и музыка. В игре есть звуки и музыка, и есть настройки звуков и музыки: возможность вкл/откл звуки, вкл/откл музыку, регулировать громкость звуков, регулировать громкость музыки +10
- [x] настройки игры. Есть не меньше трёх настроек разных опций игры, например, внешний вид игрового поля и фигур, сложность игры, определение порядка ходов. Речь не про настройки звуков и музыки, которые проверялись и оценивались в предыдущем пункте. Это должны быть настройки разных опций, а не три параметра одной опции, например, размера игрового поля +10
- [x] статистика. Пользователь информируется о состоянии игры, ведётся запись ходов, побед и поражений, времени игры, либо отображается другая статистика игры. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр +10
- [x] сохранение состояния игры при перезагрузке страницы. Сохраняются все опции игры: ходы, набранные очки, положение фигур и т д. Состояние игры сохраняется без необходимости кликать по кнопке save. Есть кнопка new game для запуска новой игры +10
- [x] возможность управления игрой с клавиатуры или не меньше пяти hot keys. Есть список горячих клавиш для управления игрой с клавиатуры +10

### Hacker scope +20

- [x] автопроигрывание игры. Есть кнопка Autoplay запускающая игру в автоматическом режиме. Это может быть отдельная партия игры (крестики-нолики, шашки, шахматы, морской бой, судоку и т.д.). Для бесконечных игр (тетрис, Flappy Bird и т.д), игра зацикливается не раньше чем через 30 ходов. Речь не про автозавершение начатой игры, автопроигрывание игры начинает игру с пустого поля или стандартной раскладки и показывает как эта игра сама играет без пользователя +10
- [x] дополнительная функциональность. Реализована достаточно сложная в реализации дополнительная функциональность, которая улучшает качество игры. В качестве дополнительной функциональности рекомендуется создать и использовать бекенд, например, для хранения счёта игры. Также может быть и другая дополнительная функциональность, например, 3d игра, написана логика для компьютерного противника, есть сетевой режим игры, и т.д +10

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
