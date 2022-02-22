class Game {
    constructor() {
        this.createGameModel();
        this.startGameBtn = document.querySelector('.game-block__btn');
        this.checkNumbersButtons = document.querySelectorAll('.game-block__number');
        this.numberOneBtn = document.querySelector('.number-one__btn');
        this.numberTwoBtn = document.querySelector('.number-two__btn');
        this.numberThreeBtn = document.querySelector('.number-three__btn');
        this.result = document.querySelector('.game-block__result');
        this.scoreAndCounter = document.querySelector('.game-block__score');
        this.gift = document.querySelector('.game-block__gift');
        this.checkWin = this.checkWin.bind(this);
        this.welcomeGame();
    }

    createGameModel () {

        let container = document.querySelector('.container');

        function createElement(tagName, options) {
            let elem = document.createElement(tagName);

            if(options.appendTo) {
                let parent = options.appendTo;
                if(typeof options.appendTo === 'string') {
                    parent = ge(options.appendTo);
                }
                parent.append(elem);
            }

            if(options.attrs) {
                for(let attr in options.attrs) {
                    elem[attr] = options.attrs[attr];
                }
            }

            if(options.content) {
                let text = [options.content];
                if(Array.isArray(options.content)) {
                    text = options.content;
                }

                text.forEach(item => {
                    if(typeof item === 'string') {
                        elem.innerHTML = item;
                    } else {
                        elem.append(item)
                    }
                })
            }

            if(options.events) {
                for(let event in options.events) {
                    elem.addEventListener(event, options.events[event]);
                }
            }

            return elem;
        }

        createElement('div', {
            attrs: { className: 'game-block'},
            appendTo: container,
            content: [
                createElement('h1', {
                    attrs: { className: 'block__quote' },
                    content: 'Welcome to squid game'
                }),
                createElement('h2', {
                    attrs: { className: 'block__quote2' },
                    content: 'Let score until 5'
                }),
                createElement('button', {
                    attrs: { className: 'game-block__btn'},
                    content: 'Start game'
                }),
                createElement('div', {
                    attrs: { className: 'game-block__question' },
                    content: 'Please select one number below'
                }),
                createElement('div', {
                    attrs: { className: 'game-block__choice'},
                    content: [
                        createElement('div', {
                            attrs: { className: 'game-block__number' },
                            content: [
                                createElement('div', {
                                    attrs: { className: 'game-block__item number-one__btn' }
                                })
                            ]
                        }),
                        createElement('div', {
                            attrs: { className: 'game-block__number' },
                            content: [
                                createElement('div', {
                                    attrs: { className: 'game-block__item number-two__btn' }
                                })
                            ]
                        }),
                        createElement('div', {
                            attrs: { className: 'game-block__number' },
                            content: [
                                createElement('div', {
                                    attrs: { className: 'game-block__item number-three__btn' }
                                })
                            ]
                        }),
                    ]
                }),
                createElement('div', {
                    attrs: { className: 'game-block__result flex'}
                }),
                createElement('div', {
                    attrs: { className: 'game-block__text'},
                    content: 'Your score:'
                }),
                createElement('div', {
                    attrs: { className: 'game-block__score flex'}
                }),
                createElement('div', {
                    attrs: { className: 'game-block__text2'},
                    content: 'Your gift:'
                }),
                createElement('div', {
                    attrs: { className: 'game-block__gift flex'}
                })
            ]
        })


    }

    welcomeGame() {
        this.timeStart = Date.now();
        this.rightNum = 0;
        this.counter = 0;
        this.score = 0;

        this.MAX_SESSIONS = 5;

        this.startGameBtn.addEventListener('click', this.startGameSession.bind(this));
    }

    startGameSession(){
        this.num1 = this.getRandomNumber();
        this.num2 = this.getRandomNumber();
        this.num3 = this.getRandomNumber();

        if(this.num1 !== this.num2 && this.num1 !== this.num3 && this.num2 !== this.num3) {
            this.numberOneBtn.innerHTML = this.num1;
            this.numberTwoBtn.innerHTML = this.num2;
            this.numberThreeBtn.innerHTML = this.num3;

            this.chooseNum = [this.num1, this.num2, this.num3];
            this.rightNum = this.chooseNum[Math.floor(Math.random() * this.chooseNum.length)];
            console.log('rightNum: ', this.rightNum);
            this.checkButtons()
        } else{
            this.startGameSession();
        }
    }

    getRandomNumber() {
        let randomNumber = Math.random() * 10;
        this.clearNum = Math.round(randomNumber);
        return this.clearNum;
    }

    checkButtons(){
        this.checkNumbersButtons.forEach(item => {
            item.addEventListener('click', this.checkWin);
        });
    }

    checkWin() {
        this.guessedNumber = parseInt(event.target.innerText)
        if (this.guessedNumber === this.rightNum) {
            this.result.innerHTML = 'win';
            this.score += 1;
            this.startGameSession()
        } else {
            this.result.innerHTML = 'loose';
            this.startGameSession()
        }

        this.counter++;
        this.scoreAndCounter.innerHTML = this.counter + " : " + this.score;
        if (this.counter === this.MAX_SESSIONS) {
            this.finishGame();
        } else {
            this.startGameSession.bind(this);
        }

    }

    finishGame() {
        document.addEventListener("click", function (e) {
            e.stopPropagation();
            e.preventDefault();
        }, true);
        setTimeout(() => {
            location.reload()
        },1600)
        let timeEnd = Date.now() - this.timeStart;
        return this.gift.innerHTML = `You just spent ${timeEnd} milliseconds of your life ))`;
    }
}

const game = new Game()