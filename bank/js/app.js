const activeLink = document.querySelectorAll('.nav-item .nav-link');
const trans = document.getElementById('transaction');
const table = document.querySelectorAll('#table tr');
const addTask = document.getElementById('addTask');
const single = document.getElementById('table');
const tbody = document.getElementById('tbody');
const tr = document.getElementById('tr');

//find active class reset it
function setActive () {
    activeLink.forEach(ele => {
        ele.addEventListener('click', e => {
            activeLink.forEach(item => item.classList.remove('active'));
            e.currentTarget.classList.add('active');
        });
    });
}
setActive ();
//--------

//write to storage and read from it
const readFromStorage = customers => {
    let data;
    try {
        data = JSON.parse(localStorage.getItem(customers)) || [];
        if (!Array.isArray(data)) throw new Error ('Invalid Data');
    }
    catch(e) {
        data = [];
    }
    return data;
};
const writeToStorage = (key, setData) => localStorage.setItem(key, JSON.stringify(setData));
//-------

//get data from Add page Form
if (addTask) addTask.addEventListener('submit', e => {
    e.preventDefault ();
    let customerData = {
        accNum: Date.now(),
        transaction: [],
        name: addTask.elements.name.value,
        balance: addTask.elements.balance.value
    };
    if (customerData.name && customerData.balance) {
        const data = readFromStorage('customers');
        data.push(customerData);
        writeToStorage('customers',data);
        addTask.reset();
        window.location.href = 'index.html';
    } else {
        alert('Enter your name and your balance!');
    }
});
//---------

//Delete function
const del = id => {
    let data = readFromStorage('customers');
    data.splice(id, 1);
    writeToStorage('customers', data);
    display (data);
}
//Show function
const show = id => {
    writeToStorage('id', id);
    window.location.href = 'single.html'
}
//transaction
const transaction = id => {
    writeToStorage('id', id);
    window.location.href = 'transaction.html'
}

//display Fun
const display = (data) => {
    tbody.innerHTML = '';
    if (data.length === 0) {
        tbody.innerHTML = `<tr><td class="bg-danger text-white text-center fs-5" colspan="4">No users yet</td></tr>`;
    } else {
        data.forEach((user, i) => {
            tbody.innerHTML += `
            <tr class="bg-light">
                <td class="fs-5">${user['accNum']}</td>
                <td class="fs-5">${user['name']}</td>
                <td class="fs-5">${user['balance']}</td>
                <td class="fs-5">
                    <button class="btn btn-danger me-3" onClick = "del(${i})">Delete</button>
                    <button class="btn btn-success me-3" onClick = "show(${i})">Show</button>
                    <button class="btn btn-primary" onClick = "transaction(${i})">Transaction Edit</button>
                </td>
            </tr>
            `;
        });
    }
};
//--------

//display data inside table
if (tbody) {
    const data = readFromStorage('customers')
    display(data);
}
//---------

//single page
if (single) {
    const data = readFromStorage('customers');
    let obj = data[localStorage.getItem('id')];
    table.forEach(tr => {
        const td = document.createElement('td');
        tr.appendChild(td);
    });
    const allTd = document.querySelectorAll('#table tr td');
    // console.log(allTd)
    allTd[0].innerHTML = `${obj.accNum}`;
    allTd[1].innerHTML = `${obj.name}`;
    allTd[2].innerHTML = `${obj.balance}`;
}
//---------

//transaction Edit Data
if (trans) {
    trans.addEventListener('submit', (e) => {
        e.preventDefault ();
        let transValue = {
            type: trans.elements.type.value,
            much: trans.elements.much.value
        };
        const data =readFromStorage('customers');
        const id = localStorage.getItem('id');
        data[id].transaction.push(transValue);

        if (transValue.type == 'withdraw') data[id].balance = +data[id].balance - +transValue.much;
        else data[id].balance = +data[id].balance + +transValue.much;
        writeToStorage('customers', data);
        window.location.href = 'index.html';
    });
}
//--------
