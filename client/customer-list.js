
const setEditModal = (email) => {
    // Get information about the customer using email
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", `http://localhost:3000/book/${email}`, false);
    xhttp.send();

    const customer = JSON.parse(xhttp.responseText);

    const {
        name,
        surname,
        birthdate
    } = customer;

    // Filling information about the customer in the form inside the modal
    document.getElementById('email').value = email;
    document.getElementById('name').value = name;
    document.getElementById('surname').value = surname;
    document.getElementById('birthdate').value = birthdate;
   

    // Setting up the action url for the customer
    document.getElementById('editForm').action = `http://localhost:3000/book/${email}`;
}

const deleteCustomer = (email) => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("DELETE", `http://localhost:3000/customer/${email}`, false);
    xhttp.send();

    location.reload();
}

const loadCustomers = () => {
    const xhttp = new XMLHttpRequest();

    xhttp.open("GET", "http://localhost:3000/customers", false);
    xhttp.send();

    const customers = JSON.parse(xhttp.responseText);

    for (let customer of customers) {
        const x = `
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${customer.surname}</h5>
                        <h6 class="card-subtitle mb-2 text-muted">${customer.name}</h6>

                        <div>email: ${customer.email}</div>
                        <div>birthdate: ${customer.birthdate}</div>

                        <hr>

                        <button type="button" class="btn btn-danger">Delete</button>
                        <button types="button" class="btn btn-primary" data-toggle="modal"
                            data-target="#editCustomerModal" onClick="setEditModal(${customer.email})">
                            Edit
                        </button>
                    </div>
                </div>
            </div>
        `

        document.getElementById('customers').innerHTML = document.getElementById('customers').innerHTML + x;
    }
}

loadCustomers();