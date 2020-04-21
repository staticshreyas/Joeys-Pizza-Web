var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");

var Cart =require('../models/cart');
var Product = require('../models/product');
var Order = require('../models/orders');
var Contact =require('../models/contact');
var Reservation =require('../models/reservation').model;
var Day =require('../models/day').model;







var stripe= require('stripe')('pk_test_hSd6sfCAFsvHFkLvLx3EKkNO00crIKDOP7');



/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('shop/index');
});


/*Add to cart router*/
router.get('/add-to-cart/:id', function (req,res,next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    Product.findById(productId, function (err, product) {
        if(err){
            return res.redirect('/shop/menu');
        }

        cart.add(product, product.id);
        req.session.cart = cart;
        console.log(req.session.cart);
        res.redirect('/shop/menu');

    });

});

/*AddbyOne*/
router.get('/add/:id',function (req,res,next) {

    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.addByOne(productId);
    req.session.cart=cart;
    res.redirect('/shop/cart');
});

/*ReducebyOne*/
router.get('/reduce/:id',function (req,res,next) {

    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.reduceByOne(productId);
    req.session.cart=cart;
    res.redirect('/shop/cart');
});

/*RemoveAll*/
router.get('/remove/:id',function (req,res,next) {

    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {});

    cart.removeAll(productId);
    req.session.cart=cart;
    res.redirect('/shop/cart');
});



/* GET checkout page. */
router.get('/shop/checkout', isLoggedIn, function(req, res, next) {
    if(!req.session.cart){
        return res.redirect('/shop/cart');
    }
    var cart = new Cart(req.session.cart);
    res.render('shop/checkout', {total: cart.totalPrice, finalPrice: cart.totalPrice+50, chargeAmount: (cart.totalPrice+50)*100});


});


router.post('/charge', isLoggedIn, function (req,res) {
    var cart = new Cart(req.session.cart);
    var token = req.body.stripeToken;
    var chargeAmount = req.body.chargeAmount;
    var charge = stripe.charges.create({
        amount: chargeAmount,
        currency: 'rupees',
        source: token
    }, function (err, charge) {
        if (err & err.type === "StripeCardError") {
            console.log("Card Declined");
            res.redirect('/shop/payfail');
        }
        var order = new Order({
            user: req.user,
            cart: cart,
            address: req.user.address,
            name: req.user.name,

        });
        order.save(function (err, result) {
            console.log("Payment Successful");
            req.session.cart = null;
            res.redirect('/shop/paysuccess');
        });

    });

    let transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        auth: {
            user: 'shreyas.mm@somaiya.edu', // generated ethereal user
            pass:' zyxwmoreshreyas' // generated ethereal password
        },
        tls:{
            rejectUnauthorized: false
        }
    });

    // send mail with defined transport object
    let info = {
        from: 'shreyas.mm@somaiya.edu', // sender address
        to: req.user.email, // list of receivers
        subject: "Confirmation:",
        template:'/views/bills/bill',
        text: "ORDER HAS BEEN PLACED AND WILL ARRIVE SHORTLY" // plain text body
    };
    transporter.sendMail(info,function(err,inf){
        if(err){
            console.log(err);
        }
        console.log('Email sent: '+inf.response);

    });






});

/* GET contact page. */
router.get('/shop/contact', function(req, res, next) {
    res.render('shop/contact');
});

router.post('/shop/contact',function (req,res,next) {

    var contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        message: req.body.message
    });
    contact.save(function (err,result) {
        if(err){
            console.log('Failed!');
            console.log(err);
        }

    });

        let transporter = nodemailer.createTransport({
            service: "gmail",
            host: "smtp.gmail.com",
            auth: {
                user: 'shreyas.mm@somaiya.edu', // generated ethereal user
                pass:' zyxwmoreshreyas' // generated ethereal password
            },
            tls:{
                rejectUnauthorized: false
            }
        });

        // send mail with defined transport object
        let info = {
            from: req.body.email, // sender address
            to: "shreyas.mm@somaiya.edu", // list of receivers
            subject: "Contact Request:"+req.body.subject, // Subject line
            text: "Name: " +req.body.name+ "\n"+
            "Email: "+req.body.email+"\n"+"\n"+"Message: "+req.body.message, // plain text body
};
        transporter.sendMail(info,function(err,inf){
            if(err){
                console.log(err);
            }
            console.log('Email sent: '+inf.response);
            res.render('shop/contact' , {message:'Email has been sent'});

        });


});




router.get('/reservation/reservationRequest',isLoggedIn, function(req, res, next) {
    res.render('reservation/reservationRequest');
});

router.get('/reservation/reservationSuccess',isLoggedIn, function(req, res, next) {
    res.render('reservation/reservationSuccess');
});

var a;
var b;
router.post('/reservation/reservationRequest', function(req, res, next) {
    a=req.body.date;
    b=req.body.time;
    console.log(req.body.date);
    console.log("request attempted");

    console.log(req.body);
    const dateTime = new Date(req.body.date);
    const  time = req.body.time;

    Day.find({ date: dateTime, time: time }, (err, docs) => {
        if (!err) {
            if (docs.length > 16) {
                // Record already exists
                res.render('/reservation/reservationFail');

                console.log("Record exists. Sent docs.");
            } else {
                // Searched date does not exist and we need to create it
                const allTables = require("../data/allTables");
                const day = new Day({
                    date: dateTime,
                    time: req.body.time,
                    tables: allTables
                });
                day.save(err => {
                    if (err) {
                        console.log(err);
                    } else {
                        // Saved date and need to return all tables (because all are now available)
                        console.log("Created new datetime.");
                        res.redirect('/reservation/reservationCheck')

                    }
                });
            }
        } else {
            console.log("Could not search for date");
        }
    });


});
var c;
router.get('/book/:name', function (req,res,next) {

    Day.find({ date: a, time: b }, (err, days) => {
        if (!err) {
            if (days.length > 0) {
                let day = days[0];
                day.tables.forEach(table => {

                    if (table.name === req.params.name) {
                        // The correct table is table
                         c = new Reservation({
                             name: req.user.name,
                             phone: req.user.phone,
                             email: req.user.email,
                             tablename: table.name,
                             date: a,
                             time: b
                        });
                        table.reservation = c;
                        table.isAvailable = false;
                        day.save(err => {
                            if (err) {
                                console.log(err);
                            } else {

                                console.log("Table Reserved");

                            }
                        });
                        c.save(err => {
                            if (err) {
                                console.log(err);
                            } else {
                                res.redirect('/reservation/reservationSuccess');
                                console.log("Reserved");

                            }
                        });

                    }
                });

            } else {
                console.log("Day not found");
            }

        }


    });

});


router.get('/reservation/reservationCheck',isLoggedIn, function (req,res,next) {
    const query = {isAvailable: true};


    Day.find({date: a, time: b}, (err, days) => {
        if (!err) {
            let day = days[0];
            var docs = [];
            day.tables.forEach(table => {
                if(table.isAvailable===true){
                    docs.push(table);

                }
            });
            var productChunks = [];
            var chunksize = 4;
            for (var i = 0; i < docs.length; i += chunksize) {

                    productChunks.push(docs.slice(i, i + chunksize));

            }

            res.render('reservation/reservationCheck', {title: 'Tables', products: productChunks});
        }
    });


});





module.exports = router;


function isLoggedIn(req,res,next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.session.oldurl = req.url;
    res.redirect('/user/signin');
}

