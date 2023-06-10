
document.addEventListener('DOMContentLoaded', () => {
  const field = document.querySelector('.field');
  let row = 3, col = 2;
  let maxBlocks = row * col;
  const btns = [];
  let interval;

  const timer = document.createElement('div');
  timer.classList.add('timer');

  const rules = document.createElement('div');
  rules.classList.add('rules');
  rules.textContent = 'Число создаваемых полей должно быть четным. Также вводимые числа должны быть в диапазоне 2-10, иначе игра запустится со значениями 4 * 4';

  const setCol = document.createElement('input');
  setCol.classList.add('input', 'col');
  setCol.setAttribute('placeholder', 'Количество столбцов');

  const setRow = document.createElement('input');
  setRow.classList.add('input', 'row');
  setRow.setAttribute('placeholder', 'Количество строк');

  const setBtn = document.createElement('button');
  setBtn.classList.add('init');
  setBtn.textContent = 'GO!';


  const cardsApp = () => {
    field.innerHTML = '';
    field.append(rules);
    field.append(setCol);
    field.append(setRow);
    field.append(setBtn);
  };
  cardsApp();



  const fieldInit = () => {
    field.innerHTML = '';

    timer.textContent = 'У вас осталось 60 секунд';
    field.before(timer);

    for (let i = 0; i < row; i++) {
      btns[i] = []
      for (let j = 0; j < col; j++) {
        const block = document.createElement('div');
        block.classList.add('block');
        block.style.width = 100 / col + '%';
        block.style.height = 100 / row + '%';

        btns[i][j] = document.createElement('button');
        btns[i][j].classList.add('btn');


        const backsideBlock = document.createElement('div');
        backsideBlock.classList.add('backside');

        block.append(btns[i][j]);
        block.append(backsideBlock);
        field.append(block);
      }
    }

  };



  const numberMixArray = () => {

    const maxNumInBlocks = maxBlocks / 2;
    const array = [];
    const backsideBlock = document.querySelectorAll('.backside');



    for (let i = 1; i <= maxNumInBlocks; i++) {
      array.push(i);
      array.push(i);
    }

    function shuffle(array) {

      for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
    console.log(shuffle(array));

    const shuffledHiddenValues = shuffle(array);
    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        backsideBlock[j + i * col].textContent = shuffledHiddenValues[j + i * col];
      }
    }
  };


  const showInStart = () => {
    const blocks = document.querySelectorAll('.block');

    blocks.forEach((item) => {
      item.classList.add('show');
    })
    setTimeout(() => {
      blocks.forEach((item) => {
        item.classList.remove('show');
      })
    }, 1000);
  };



  const play = () => {
    fieldInit();
    numberMixArray();
    showInStart();

    const declOfNum = (number, titles) => {
      cases = [2, 0, 1, 1, 1, 2];
      return titles[(number % 100 > 4 && number % 100 < 20) ? 2 : cases[(number % 10 < 5) ? number % 10 : 5]];
    }

    let timerVal = 60;
    interval = setInterval(() => {
      timer.textContent = 'У вас осталось ' + timerVal + ' ' + declOfNum(timerVal, ['секунда', 'секунды', 'секунд']);;
      if (timerVal == 0) {
        timer.remove();
        cardsApp();
        clearInterval(interval);
      }
      timerVal--;
    }, 1000);
  };



  (() => {
    const btns = document.querySelector('.btn');

    document.querySelector('.field').addEventListener('click', (e) => {
      if (e.target.classList.contains('btn')) {
        if (document.querySelectorAll('.show').length < 2) {
          e.target.parentElement.classList.add('show');
          if (document.querySelectorAll('.show').length == 2) {
            if (document.querySelectorAll('.show')[0].querySelector('.backside').textContent === document.querySelectorAll('.show')[1].querySelector('.backside').textContent) {
              document.querySelectorAll('.show').forEach((item) => {
                item.classList.add('activated');
                item.classList.remove('show');
              })
            }
          }
        }
        else {
          document.querySelectorAll('.show').forEach((item) => {
            item.classList.remove('show');
          })
          e.target.parentElement.classList.add('show');
        }
      }

      if (document.querySelectorAll('.activated').length === maxBlocks) {
        clearInterval(interval);
        setTimeout(() => {
          if (!document.querySelectorAll('.repeat').length) {
            const repeat = document.createElement('button');
            repeat.classList.add('repeat');
            repeat.textContent = 'Сыграть ещё раз';
            field.after(repeat);
          }
        }, 700);
      }
    })

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('repeat')) {
        timer.remove();
        e.target.remove();
        cardsApp();
      }
    })

    document.addEventListener('click', (e) => {
      if (e.target.classList.contains('init')) {
        row = document.querySelector('.row').value || 4;
        col = document.querySelector('.col').value || 4;
        maxBlocks = row * col;
        if ((maxBlocks % 2) || ((col <= 2) && (col >= 10)) || ((row <= 2) && (row >= 10))) {
          row = 4;
          col = 4;
          maxBlocks = row * col;
        }
        play();
      }
    })

  })();


})
