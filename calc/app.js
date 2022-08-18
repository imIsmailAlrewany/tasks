const getCalculation = (enter) => {
    return prompt(enter);
};

const sum = (sum) => +sum[0] + +sum[2];
const sub = (sub) => +sub[0] - +sub[2];
const mul = (mul) => +mul[0] * +mul[2];
const div = (div) => +div[0] / +div[2];

const addToBody = (txt, classes) => {
    const par = document.createElement('p');
    document.body.appendChild(par);
    par.innerHTML = txt;
    par.classList = classes;
}

function runner () {
    alert('!make sure to put a single space between Numbers!');
    const Num = getCalculation ();
    if (Num != null) {
        let split = Num.trim().split(' ');
        if (split[1] == '+') addToBody(sum(split));
        else if (split[1] == '-') addToBody(sub(split));
        else if (split[1] == '*') addToBody(mul(split));
        else if (split[1] == '/') addToBody(div(split));
        else addToBody('Enter Numbers', 'alert');
    }
};

runner ();


// window.setInterval(() => {
//     console.log('%c' + Math.floor(Math.random() * (90000000000 - 10000000000) + 10000000), 'color: rgb(0, 163, 95); font-size:50px');
// });
