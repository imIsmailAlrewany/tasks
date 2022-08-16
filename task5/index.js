const yargs = require('yargs');
const task = require('./controller/task.controller.js');
const d = new Date();

yargs.command({
    command: 'add',
    builder: {
        title: {default: Date.now()},
        content: {type: 'String', demandOption: true},
        dueDate: {default: d.toLocaleDateString()},
        status: {type:'boolean', default: false}
    },
    handler: (argv) => {
        task.add(argv);
        console.log('Done');
    }
});
yargs.command({
    command: 'show',
    handler: (argv) => {
        task.show(argv);
    }
});
yargs.command({
    command: 'changeStatus',
    builder: {
        title: {type: 'Number', demandOption: true}
    },
    handler: (argv) => {
        task.changeStatus(argv);
    }
});
yargs.command({
    command: 'delete',
    builder: {
        title: {type: 'Number', demandOption: true}
    },
    handler: (argv) => {
        task.del(argv);
    }
});
yargs.command({
    command: 'deleteAll',
    handler: (argv) => {
        task.delAll(argv);
    }
});
yargs.command({
    command: 'edit',
    builder: {
        title: {type: 'Number', demandOption: true},
        content: {type: 'String', demandOption: true},
        dueDate: {default: d.toLocaleDateString()},
        status: {type:'boolean', default: false}
    },
    handler: (argv) => {
        task.edit(argv);
    }
});

yargs.argv;
