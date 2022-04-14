const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Where we will keep customers
let customers = [{
    "email": "a@aa.org",
    "name": "marc",
    "surname": "ital",
    "birthdate": "1-1-1900",
},
{
    "email": "b@aa.org",
    "name": "pepet",
    "surname": "ital",
    "birthdate": "1-1-1900",
},
{
    "email": "c@aa.org",
    "name": "maria",
    "surname": "ital",
    "birthdate": "1-1-1900",
}];

app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('això és una senzilla API REST');
});

//CRUD API

//Create a new customer.

app.post('/customer', (req, res) => {
    const customer = req.body;

    // Output the customer to the console for debugging
    console.log(customer);
    customers.push(customer);

    res.send('Customer is added to the database');
});

//Get all customers

app.get('/customers', (req, res) => {
    res.json(customers);
});

//Get a single customer

app.get('/customer/:email', (req, res) => {
    // Reading email from the URL
    const email = req.params.email;

     // Searching customers for the email
    for (let customer of customers) {
        if (customer.email === email) {
            res.json(customer);
            return;
        }
    }

    // Sending 404 when not found something is a good practice
    res.status(404).send('Customer not found');
});

//Delete an existing customer

app.delete('/customer/:email', (req, res) => {
    // Reading email from the URL
    const email = req.params.email;

    // Remove item from the customers array
    customers = customers.filter(i => {
        if (i.email !== email) {
            return true;
        }
        return false;
    });

    res.send('Customer is deleted');
});

//Update all the attributes (at once) of an existing customer 

app.put('/customer/:email', (req, res) => {
    // Reading email from the URL
    const email = req.params.email;
    const newCustomer = req.body;

    // Remove item from the customers array
    for (let i = 0; i < customers.length; i++) {
        let customer = customers[i]
        if (customer.email === email) {
            customers[i] = newCustomer;
        }
    }

    res.send('Customer is updated');
});

app.listen(port, () => console.log(`la app escolta al port ${port}!`));