var Table = require('../models/table').model;

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping',{useNewUrlParser: true, useUnifiedTopology: true});


var tables =  [
    new Table({
        "imagePath": "/images/table.jpg",
        "name": "Table 1",
        "capacity": 5,
        "isAvailable": true,
        "location": "Bar"
    }),
    new Table({
        "imagePath": "/images/table.jpg",

        "name": "Table 2",
        "capacity": 5,
        "isAvailable": true,
        "location": "Patio"
    }),
    new Table({
        "imagePath": "/images/table.jpg",

        "name": "Table 3",
        "capacity": 5,
        "isAvailable": true,
        "location": "Bar"
    }),
    new Table({
        "imagePath": "/images/table.jpg",

        "name": "Table 4",
        "capacity": 6,
        "isAvailable": true,
        "location": "Inside"
    }),
    new Table({
        "imagePath": "/images/table.jpg",

        "name": "Table 5",
        "capacity": 7,
        "isAvailable": true,
        "location": "Patio"
    }),
    new Table({
        "imagePath": "/images/table.jpg",

        "name": "Table 6",
        "capacity": 2,
        "isAvailable": true,
        "location": "Patio"
    }),
    new Table({
        "imagePath": "/images/table.jpg",

        "name": "Table 7",
        "capacity": 2,
        "isAvailable": true,
        "location": "Bar"
    }),
    new Table({
        "imagePath": "/images/table.jpg",

        "name": "Table 8",
        "capacity": 3,
        "isAvailable": true,
        "location": "Bar"
    }),
    new Table({
        "imagePath": "/images/table2.jpg",

        "name": "Table 9",
        "capacity": 5,
        "isAvailable": true,
        "location": "Patio"
    }),
    new Table({
        "imagePath": "/images/table2.jpg",

        "name": "Table 10",
        "capacity": 4,
        "isAvailable": true,
        "location": "Patio"
    }),
    new Table({
        "imagePath": "/images/table2.jpg",

        "name": "Table 11",
        "capacity": 3,
        "isAvailable": true,
        "location": "Bar"
    }),
    new Table({
        "imagePath": "/images/table2.jpg",

        "name": "Table 12",
        "capacity": 5,
        "isAvailable": true,
        "location": "Inside"
    }),
    new Table({
        "imagePath": "/images/table2.jpg",

        "name": "Table 13",
        "capacity": 2,
        "isAvailable": true,
        "location": "Bar"
    }),
    new Table({
        "imagePath": "/images/table2.jpg",

        "name": "Table 14",
        "capacity": 3,
        "isAvailable": true,
        "location": "Patio"
    }),
    new Table({
        "imagePath": "/images/table2.jpg",

        "name": "Table 15",
        "capacity": 7,
        "isAvailable": true,
        "location": "Patio"
    }),
    new Table({
        "imagePath": "/images/table2.jpg",

        "name": "Table 16",
        "capacity": 2,
        "isAvailable": true,
        "location": "Inside"
    })
];

var done=0;

for(var i=0;i<tables.length;i++)
{
    tables[i].save(function (err, result) {
        done++;
        if(done === tables.length)
            exit();

    });
}

function exit(){
    mongoose.disconnect();
}
