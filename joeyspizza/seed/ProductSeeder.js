var Product = require('../models/product');

var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/shopping',{useNewUrlParser: true, useUnifiedTopology: true});


var products = [
    new Product({
    imagePath: '/images/product-1.jpg',
    title: 'Simply Veg',
    price: 119,
        type: 1
}),
    new Product({
        imagePath: '/images/product-2.jpg',
        title: 'Joeys Special Veg',
        price: 220,
        type: 1
    }),
    new Product({
        imagePath: '/images/product-3.jpg',
        title: 'China Gate Veg',
        price: 255,
        type: 1

    }),
    new Product({
        imagePath: '/images/product-4.jpg',
        title: 'Butter Chicken Pizza',
        price: 265,
        type: 1

    }),
    new Product({
        imagePath: '/images/product-5.jpg',
        title: 'Chicken Mania',
        price: 217,
        type: 1

    }),
    new Product({
        imagePath: '/images/product-6.jpg',
        title: 'Pizza Crust Sandwich Veg',
        price: 120,
        type: 2

    }),
    new Product({
        imagePath: '/images/product-7.jpg',
        title: 'Garlic Bread',
        price: 80,
        type: 2

    }),
    new Product({
        imagePath: '/images/product-8.jpg',
        title: 'Orange Juice',
        price: 60,
        type: 3

    }),
    new Product({
        imagePath: '/images/product-9.jpg',
        title: 'Chicken Tornado Pizza',
        price: 325,
        type: 1

    }),
    new Product({
        imagePath: '/images/product-10.jpg',
        title: 'Non-Veg Mexicana',
        price: 250,
        type: 1

    }),
    new Product({
        imagePath: '/images/product-11.jpg',
        title: 'Meat Eater',
        price: 350,
        type: 1

    }),

    new Product({
        imagePath: '/images/product-12.jpg',
        title: 'Cheese Balls',
        price: 120,
        type: 2

    }),
    new Product({
        imagePath: '/images/product-13.jpg',
        title: 'Cheesy Cauliflower Breadsticks',
        price: 120,
        type: 2

    }),
    new Product({
        imagePath: '/images/product-14.jpg',
        title: 'Eggplant Bites',
        price: 130,
        type: 2

    }),
    new Product({
        imagePath: '/images/product-15.jpg',
        title: 'Italian Bruschetta Bar',
        price: 190,
        type: 2
    }),
    new Product({
        imagePath: '/images/product-16.jpg',
        title: 'Pesto Zoodles',
        price: 150,
        type: 2
    }),
    new Product({
        imagePath: '/images/product-17.jpg',
        title: 'Zucchini Fries',
        price: 120,
        type: 2
    }),
    new Product({
        imagePath: '/images/product-18.jpg',
        title: 'Mango Juice',
        price: 60,
        type: 3
    }),
    new Product({
        imagePath: '/images/product-19.jpg',
        title: 'Green Lime',
        price: 60,
        type: 3
    }),
    new Product({
        imagePath: '/images/product-20.jpg',
        title: 'Lemon Zest',
        price: 60,
        type: 3
    }),
    new Product({
        imagePath: '/images/product-21.jpg',
        title: 'Fruit Punch',
        price: 120,
        type: 3
    }),
    new Product({
        imagePath: '/images/product-22.jpg',
        title: 'Pomegranate Juice',
        price: 60,
        type: 3
    }),
    new Product({
        imagePath: '/images/product-23.jpg',
        title: 'Oreo Chocolate Frappe',
        price: 120,
        type: 3
    })



];

var done=0;

for(var i=0;i<products.length;i++)
{
    products[i].save(function (err, result) {
        done++;
        if(done === products.length)
            exit();

    });
}

function exit(){
    mongoose.disconnect();
}
