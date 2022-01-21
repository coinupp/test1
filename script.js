// 참고글
// https://kanhi.tistory.com/6?category=807466
// 댓글 비밀번호: gosudal123!

class Calculator {
    constructor(displayElement) {
        this.displayElement = displayElement
        this.operatorCheck = true
        this.equalsCheck = false
        this.timeCheck = true // h m s가 눌렸는 지 판별합니다.
        this.isOnTime = false // h m s가 한 번이라도 눌렸는 지 판별합니다.
        this.clear()
    }

    appendNumber(number) {
        if (this.equalsCheck) {
            this.displayContent = number
            this.equalsCheck = false
        } else {
            this.displayContent += number
        }
        this.operatorCheck = false
        this.timeCheck = false
    }

    appendOperator(operator) {
        if (this.operatorCheck) return false
        if (this.equalsCheck) this.equalsCheck = false
        this.displayContent += operator
        return this.operatorCheck = true
    }

    appendTimer(timer) { // 미완성
        if (this.timeCheck) return false
        if (this.equalsCheck) this.equalsCheck = false
        this.displayContent += timer
        this.isOnTime = true
        return this.operatorCheck = true
    }

    updateDisplay() {
        this.displayElement.value = this.displayContent
    }

    clear() {
        this.displayContent = ''
        this.displayElement.value = 0
        this.operatorCheck = true
        this.equalsCheck = false
        this.timeCheck = true
        this.isOnTime = false
    }

    compute() {
        if (this.operatorCheck) return
        this.displayContent = eval(this.displayContent.replace(/\u00D7/gi, '*').replace(/\u00F7/gi, '/')
            .replaceAll('h', '*3600+').replaceAll('m', '*60+').replaceAll('s', '*1'))
        this.equalsCheck = true
    }
}

const buttons = document.querySelectorAll('button')
const displayElement = document.querySelector('input')

const calculator = new Calculator(displayElement)

buttons.forEach(button => {
    button.addEventListener('click', () => {
        switch (button.dataset.type) {
            case 'operator':
                if (calculator.appendOperator(button.innerText)) {
                    calculator.updateDisplay()
                    calculator.timeCheck = true
                }
                break
            case 'ac':
                calculator.clear()
                break
            case 'equals':
                calculator.compute()
                calculator.updateDisplay()
                break
            case 'timer':
                if (calculator.appendTimer(button.innerText)) {
                    calculator.updateDisplay()
                    calculator.operatorCheck = false
                    calculator.timeCheck = true
                }
                break
            default: // case 'number':
                calculator.appendNumber(button.innerText)
                calculator.updateDisplay()
                break
        }
        console.log(calculator.operatorCheck, calculator.timeCheck, calculator.displayContent)
    })
})

String.prototype.replaceAll = function (searchStr, replaceStr) {
    return this.split(searchStr).join(replaceStr);
}



//hammerjs
var main = document.querySelector('main')

// create a simple instance
// by default, it only adds horizontal recognizers
var mc = new Hammer(main)

// let the pan gesture support all directions.
// this will block the vertical scrolling on a touch-device while on the element
mc.get('pan').set({ direction: Hammer.DIRECTION_ALL }).set({ threshold: 150 })
// listen to events...
mc.on("panup", function(ev) {
    // myElement.textContent = ev.type +" gesture detected."
    // console.log(`${ev.type} gesture detected.`)
    calculator.clear()
})
