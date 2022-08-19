const apiLink = "https://jsonplaceholder.typicode.com/";
const btnWrap = document.querySelector("#btnWrap");
const table = document.querySelector("#table");

const btns = [
    {key: "users", heads: ["id", 'name', 'username', 'email']},
    {key: "posts", heads: ["id", 'title', 'body']},
    {key: "photos", heads: ["id", 'title', 'url', 'thumbnailUrl']},
    {key: "todos", heads: ["id", 'title', 'completed']}
];

const createEle = (parent, child, classes, content) => {
    const childEle = document.createElement(child);
    parent.appendChild(childEle);
    childEle.classList = classes;
    childEle.innerHTML = content;
    return childEle;
};

const apiReq = async (url, heads, callBack) => {
    try {
        const data = await (await fetch(url)).json();
        callBack(data, heads, false);
    } catch (e) {
        console.log(false, false, e);
    }
};

const drawData = (data, heads) => {
    table.innerHTML = '';
    data.forEach(d => {
        const tr = createEle(table, 'tr', '', '');
        heads.forEach(h => {
            createEle(tr, 'td', '', d[h]);
        });
    });
};

btns.forEach(btn => {
    const button = createEle (btnWrap, 'button', '', btn.key);
    button.addEventListener('click', () => {
        apiReq(`${apiLink}${btn.key}?_limit=10`, btn.heads, (data, heads, e) => {
            if (e) console.log(Error(e));
            else drawData(data, heads);
        });
    });
});

let a = 1_00;
let b = 2_00.5;
let c = 1e2;
let d = 2.4;
let num = 10;

console.log(Math.min(a, b, c, d));
console.log(Math.pow(a, Math.trunc(d)));
console.log(Math.trunc(d));
console.log(Math.floor(d));
console.log(Math.round(d));
console.log(d.toFixed());
console.log((Math.floor(b)/Math.ceil(d)).toFixed(2));
console.log(Math.ceil(Math.floor(b)/Math.ceil(d)));
console.log(+Number.isInteger(num));