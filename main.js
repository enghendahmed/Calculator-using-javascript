/* to store the previous & current operands and also the operation we will use a class 
called "calculator" for example and iside this class it will be a constructor which is going to take 
all the inputs for it as well as all the functions for our calculator */
/* so our constructor is essentially just going to take our previousOperandTextElement and 
our currentOperandTextElement and this is because we need to know where to place our display text for our calculator */

// note that : the best practise is to write the First letter of the class name Capital letter "C"alculator
class Calculator {
    constructor(previousOperandTextElement , currentOperandTextElement){
        // this means the object will be created from this constructor function 
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    // after the constructor we will define all our functions : (delete , clear , add , sbtract , divide , multiple , equal)
    
    // define the clear function 
    clear() {
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }


    // define the delete function 
    // .slice(start,end) given us a new array with a certain start and end (we determine)
    // note that : the end point in programming is not included it's just a break point.
    // so we will put 0 to -1 which is actually the beginning and the ending of the array of current number 
    /* so .slice(0,-1) will given us a new array not including the end point which has index -1 , 
    which is the last number from the right side where we want to delete , simply it is the idea of the DEL Button */
    
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0,-1);
    }


    
    // define the appendNumber function , where each time the user press a number it appear on the screen 
    /////////// if user click number as dot and also the current number has a dot so do not write another dot (stop) so to tell him to stop use just return !!
    /* use concatenation (+) and convert the current operand and the number that user just click into
    strings to can write a long number consists of more than one number like that 178935534544 
    so without concatenation and converting into strings , we can write only one number like 2 or 4 or 9 or 3 and each time i click a new number it
    will only appear on the calculator screen , and the previous one disappear !! */
      
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) {
            return;
        } 
        
          /*to clear the Result on the screen so when user press a number it does not write beside the result but delete the result first 
        then write the new number to make new caculation */
        if(this.previousOperand == '' && this.currentOperand == this.computation && this.operation == undefined ){
            console.log('delete the result Once the user press number for a new calculation');
            this.clear();
            this.updateDisplay();
        }
        
        this.currentOperand = this.currentOperand.toString() + number.toString();                   
    }

    // define chooseOperation function 
    /* when user click on an operation button like + or - or / or * 
    so put operation(+ or - or / or *) in operation of this object called calculator 
    then put the current operand in the previous operand so it will appear at the top of the screen 
    of the calculator then put make the current operand empty which is in the bottom of the screen 
    ,,, so every time user click an operation button ,SO the current will pulled up to the calculator's screen 
     and became previous and waiting 
    the user to enter a seconed operand with it to calculate 
    */
   /* so if user click an operation button twice in the same time the screen will be completely empty 
   so we should put a condition if current empty STOP (return tell it to stop excuting the next code lines )
    */
    chooseOperation(operation) {
        
        if(this.currentOperand === '') {
            return;
        }
       if(this.previousOperand !== ''){
            this.compute();
       }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    //
    compute() {
        
        const previous = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if(isNaN(previous) || isNaN(current)) { return; } 
        
        switch(this.operation) {
            case '+':
                this.computation = previous + current;
                break;
            
            case '-':
                this.computation = previous - current;
                break;

            case '*':
                this.computation = previous * current;
                break;

            case '/':
                this.computation = previous / current;
                break;

            default:
                return;
        }

        this.currentOperand = this.computation;
        this.operation = undefined;
        this.previousOperand = '';

    }

    getDisplayNumber(number) {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if (isNaN(integerDigits)) {
          integerDisplay = '';
        } else {
          integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
          return `${integerDisplay}.${decimalDigits}`;
        } else {
          return integerDisplay;
        }
    }

    
      // define updateDisplay() function
      updateDisplay() {
        this.currentOperandTextElement.innerText =
          this.getDisplayNumber(this.currentOperand);
        if (this.operation != null) {
          this.previousOperandTextElement.innerText =
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } else {
          this.previousOperandTextElement.innerText = '';
        }
      }
    
}

// select (Get) all HTML elements that we will need (all Buttons and output elements)
const operationButtons = document.querySelectorAll('[data-operation]');
const numberButtons = document.querySelectorAll('[data-number]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');


// create  a new object from our constructor function 
let calculator = new Calculator(previousOperandTextElement,currentOperandTextElement);

// select all number buttons by .forEach() and each button is clicked

numberButtons.forEach(button => {
    button.addEventListener('click' , () => {
        calculator.appendNumber(button.innerText); // this fn take the number that user click on as an argument
        calculator.updateDisplay();
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click' , () => {
        calculator.chooseOperation(button.innerText);  // this fn take the operation that user click on as an argument
        calculator.updateDisplay();
    });
});


equalsButton.addEventListener('click' , () => {
    calculator.compute();  
    calculator.updateDisplay();
});


allClearButton.addEventListener('click' , () => {
    calculator.clear();  
    calculator.updateDisplay();
});

deleteButton.addEventListener('click' , () => {
    calculator.delete();  
    calculator.updateDisplay();
});
