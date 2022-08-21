// const lis = document.querySelectorAll('.nav ul li a');

// lis.forEach(li => {
//     li.addEventListener('click', (e) => {
//         lis.forEach(item => {item.classList.remove('active')});
//         e.currentTarget.classList.add('active');
//     });
// });

const ul = document.querySelector('article.all .bowls ul');
const list = document.querySelector('article.all .bowls i');
list.addEventListener('click', (e) => {
    ul.classList.toggle('active');
});