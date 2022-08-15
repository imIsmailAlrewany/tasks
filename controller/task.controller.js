const deal = require('./dealWithJson');
const heads = ['title', 'content', 'dueDate', 'status'];

const add = (argv) => {
    const task = {};
    heads.forEach(head => task[head] = argv[head]);
    const allTasks = deal.readFromJson();
    allTasks.push(task);
    deal.writeToJson(allTasks);
};
const show = (argv) => {
    const allTasks = deal.readFromJson();
    if (allTasks.length > 0) console.log('ok');
    else console.log('nothing to show!');
    allTasks.forEach((task, i) => {
        console.log(`${i+1}-${task['title']}-"${task['content']}"-${task['dueDate']}-${task['status']}`);
    });
};
const changeStatus = (argv) => {
    const allTasks = deal.readFromJson();
    const task = allTasks.find(task => task.title == argv.title);
    if (!task) {
        console.log('task not found');
    }
    else {
        console.log('status changed');
        task.status? task.status = false: task.status = true;
        deal.writeToJson(allTasks);
        console.log(`${task['title']}-"${task['content']}"-${task['dueDate']}-${task['status']}`);
    }
};
const del = (argv) => {
    const allTasks = deal.readFromJson();
    const task = allTasks.findIndex(task => task.title == argv.title);
    allTasks.splice(task, 1);
    deal.writeToJson(allTasks);
    console.log('Deleted!');
};
const delAll = (argv) => {
    const allTasks = deal.readFromJson();
    if (allTasks.length > 0) console.log('All is Deleted!');
    else console.log('you have already deleted all!');
    allTasks.length = 0;
    deal.writeToJson(allTasks);
};
const edit = (argv) => {
    const allTasks = deal.readFromJson();
    const task = allTasks.find(task => task.title == argv.title);
    if(!task) console.log('task not found');
    else {
        console.log('task is Edited');
        task.content = argv.content;
        task.status = argv.status;
        deal.writeToJson(allTasks);
    }
};

module.exports = {add, show, changeStatus, del, delAll, edit};