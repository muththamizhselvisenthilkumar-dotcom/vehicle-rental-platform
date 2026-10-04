```javascript
// ========================================
// VEHICLE RENTAL PLATFORM
// ========================================


// VEHICLE DATABASE

const vehicles = [

    {
        id: 1,
        name: "Toyota Fortuner",
        type: "SUV",
        price: 2800,
        seats: 7,
        fuel: "Diesel",
        icon: "🚙"
    },

    {
        id: 2,
        name: "Hyundai Creta",
        type: "SUV",
        price: 2200,
        seats: 5,
        fuel: "Petrol",
        icon: "🚘"
    },

    {
        id: 3,
        name: "Honda City",
        type: "Car",
        price: 1800,
        seats: 5,
        fuel: "Petrol",
        icon: "🚗"
    },

    {
        id: 4,
        name: "Maruti Swift",
        type: "Car",
        price: 1400,
        seats: 5,
        fuel: "Petrol",
        icon: "🚗"
    },

    {
        id: 5,
        name: "Royal Enfield Classic",
        type: "Bike",
        price: 900,
        seats: 2,
        fuel: "Petrol",
        icon: "🏍️"
    },

    {
        id: 6,
        name: "Yamaha R15",
        type: "Bike",
        price: 850,
        seats: 2,
        fuel: "Petrol",
        icon: "🏍️"
    },

    {
        id: 7,
        name: "Mahindra XUV700",
        type: "SUV",
        price: 2500,
        seats: 7,
        fuel: "Diesel",
        icon: "🚙"
    },

    {
        id: 8,
        name: "Kia Seltos",
        type: "SUV",
        price: 2100,
        seats: 5,
        fuel: "Petrol",
        icon: "🚘"
    },

    {
        id: 9,
        name: "Tata Nexon",
        type: "Car",
        price: 1600,
        seats: 5,
        fuel: "Petrol",
        icon: "🚗"
    }

];


// BOOKINGS

let bookings =
    JSON.parse(
        localStorage.getItem(
            "vehicleBookings"
        )
    ) || [];


// SELECTED VEHICLE

let selectedVehicle = null;


// ========================================
// LOGIN
// ========================================

document
    .getElementById("loginForm")
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const userId =
                document
                    .getElementById("userId")
                    .value
                    .trim();


            const password =
                document
                    .getElementById("password")
                    .value;


            if (
                userId === "USER001" &&
                password === "1234"
            ) {

                document
                    .getElementById("loginPage")
                    .classList.add("hidden");


                document
                    .getElementById("app")
                    .classList.remove("hidden");


                initialize();

            } else {

                alert(
                    "Invalid Login!\n\n" +
                    "User ID: USER001\n" +
                    "Password: 1234"
                );

            }

        }
    );


// ========================================
// INITIALIZE
// ========================================

function initialize() {

    updateDate();

    renderVehicles();

    renderPopularVehicles();

    renderBookings();

    updateStatistics();

}


// ========================================
// DATE
// ========================================

function updateDate() {

    const date =
        new Date();


    document
        .getElementById("currentDate")
        .innerText =
        date.toLocaleDateString(
            "en-IN",
            {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric"
            }
        );

}


// ========================================
// NAVIGATION
// ========================================

function showPage(
    pageId,
    button = null
) {

    document
        .querySelectorAll(".page")
        .forEach(page => {

            page.classList.remove(
                "active-page"
            );

        });


    document
        .getElementById(pageId)
        .classList.add(
            "active-page"
        );


    document
        .querySelectorAll(".nav-btn")
        .forEach(btn => {

            btn.classList.remove(
                "active"
            );

        });


    if (button) {

        button.classList.add(
            "active"
        );

    }


    const titles = {

        home: "Dashboard",
        vehicles: "Vehicles",
        bookings: "My Bookings",
        profile: "My Profile"

    };


    document
        .getElementById("pageTitle")
        .innerText =
        titles[pageId];


    if (pageId === "bookings") {

        renderBookings();

    }

}


// ========================================
// OPEN VEHICLES
// ========================================

function openVehicles() {

    showPage("vehicles");

}


// ========================================
// RENDER VEHICLES
// ========================================

function renderVehicles(
    list = vehicles
) {

    const container =
        document
            .getElementById(
                "vehicleList"
            );


    container.innerHTML = "";


    if (list.length === 0) {

        container.innerHTML = `

            <div style="
                grid-column:1/-1;
                text-align:center;
                padding:50px;
                color:#888;
            ">

                No vehicles found.

            </div>

        `;

        return;

    }


    list.forEach(vehicle => {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "vehicle-card";


        card.innerHTML = `

            <div class="vehicle-image">
                ${vehicle.icon}
            </div>

            <div class="vehicle-content">

                <h3>
                    ${vehicle.name}
                </h3>

                <div class="vehicle-type">
                    ${vehicle.type}
                </div>

                <div class="vehicle-info">

                    <span>
                        👥 ${vehicle.seats} Seats
                    </span>

                    <span>
                        ⛽ ${vehicle.fuel}
                    </span>

                </div>

                <div>

                    <span class="price">
                        ₹${vehicle.price}
                    </span>

                    <small>
                        / day
                    </small>

                </div>

                <br>

                <button
                    class="book-btn"
                    onclick="openBooking(${vehicle.id})">

                    Book Now

                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


// ========================================
// POPULAR VEHICLES
// ========================================

function renderPopularVehicles() {

    const container =
        document
            .getElementById(
                "popularVehicles"
            );


    container.innerHTML = "";


    vehicles
        .slice(0, 3)
        .forEach(vehicle => {

            const card =
                document.createElement(
                    "div"
                );


            card.className =
                "vehicle-card";


            card.innerHTML = `

                <div class="vehicle-image">
                    ${vehicle.icon}
                </div>

                <div class="vehicle-content">

                    <h3>
                        ${vehicle.name}
                    </h3>

                    <div class="vehicle-type">
                        ${vehicle.type}
                    </div>

                    <div class="vehicle-info">

                        <span>
                            👥 ${vehicle.seats} Seats
                        </span>

                        <span>
                            ⛽ ${vehicle.fuel}
                        </span>

                    </div>

                    <div>

                        <span class="price">
                            ₹${vehicle.price}
                        </span>

                        <small>
                            / day
                        </small>

                    </div>

                    <br>

                    <button
                        class="book-btn"
                        onclick="openBooking(${vehicle.id})">

                        Book Now

                    </button>

                </div>

            `;


            container.appendChild(card);

        });

}


// ========================================
// FILTER
// ========================================

function filterVehicles() {

    const search =
        document
            .getElementById(
                "searchVehicle"
            )
            .value
            .toLowerCase();


    const type =
        document
            .getElementById(
                "vehicleType"
            )
            .value;


    const price =
        document
            .getElementById(
                "priceFilter"
            )
            .value;


    const filtered =
        vehicles.filter(vehicle => {

            const matchName =
                vehicle.name
                    .toLowerCase()
                    .includes(search);


            const matchType =
                type === "All" ||
                vehicle.type === type;


            const matchPrice =
                price === "All" ||
                vehicle.price <
                Number(price);


            return (
                matchName &&
                matchType &&
                matchPrice
            );

        });


    renderVehicles(filtered);

}


// ========================================
// OPEN BOOKING MODAL
// ========================================

function openBooking(vehicleId) {

    selectedVehicle =
        vehicles.find(
            vehicle =>
                vehicle.id === vehicleId
        );


    if (!selectedVehicle) {
        return;
    }


    document
        .getElementById(
            "bookingModal"
        )
        .classList.remove(
            "hidden"
        );


    document
        .getElementById(
            "modalVehicle"
        )
        .innerText =
        selectedVehicle.icon;


    document
        .getElementById(
            "modalTitle"
        )
        .innerText =
        selectedVehicle.name;


    document
        .getElementById(
            "modalPrice"
        )
        .innerText =
        "₹" +
        selectedVehicle.price +
        " per day";


    document
        .getElementById(
            "selectedVehicle"
        )
        .value =
        selectedVehicle.id;


    const today =
        new Date()
            .toISOString()
            .split("T")[0];


    document
        .getElementById(
            "pickupDate"
        )
        .min = today;


    document
        .getElementById(
            "returnDate"
        )
        .min = today;


    document
        .getElementById(
            "pickupDate"
        )
        .value = "";


    document
        .getElementById(
            "returnDate"
        )
        .value = "";


    document
        .getElementById(
            "rentalDays"
        )
        .innerText = "1";


    document
        .getElementById(
            "totalPrice"
        )
        .innerText =
        "₹" +
        selectedVehicle.price;

}


// ========================================
// CLOSE MODAL
// ========================================

function closeModal() {

    document
        .getElementById(
            "bookingModal"
        )
        .classList.add(
            "hidden"
        );

}


// ========================================
// DATE CALCULATION
// ========================================

document
    .getElementById(
        "pickupDate"
    )
    .addEventListener(
        "change",
        calculateRental
    );


document
    .getElementById(
        "returnDate"
    )
    .addEventListener(
        "change",
        calculateRental
    );


function calculateRental() {

    const pickup =
        document
            .getElementById(
                "pickupDate"
            )
            .value;


    const returnDate =
        document
            .getElementById(
                "returnDate"
            )
            .value;


    if (!pickup || !returnDate) {
        return;
    }


    const start =
        new Date(pickup);


    const end =
        new Date(returnDate);


    if (end < start) {

        alert(
            "Return date cannot be before pickup date."
        );

        document
            .getElementById(
                "returnDate"
            )
            .value = "";

        return;

    }


    const difference =
        end - start;


    const days =
        Math.floor(
            difference /
            (1000 * 60 * 60 * 24)
        ) + 1;


    const total =
        days *
        selectedVehicle.price;


    document
        .getElementById(
            "rentalDays"
        )
        .innerText =
        days;


    document
        .getElementById(
            "totalPrice"
        )
        .innerText =
        "₹" +
        total.toLocaleString("en-IN");

}


// ========================================
// CONFIRM BOOKING
// ========================================

document
    .getElementById(
        "bookingForm"
    )
    .addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const pickup =
                document
                    .getElementById(
                        "pickupDate"
                    )
                    .value;


            const returnDate =
                document
                    .getElementById(
                        "returnDate"
                    )
                    .value;


            if (!pickup || !returnDate) {

                showToast(
                    "Please select rental dates."
                );

                return;

            }


            const start =
                new Date(pickup);


            const end =
                new Date(returnDate);


            const days =
                Math.floor(
                    (end - start) /
                    (1000 * 60 * 60 * 24)
                ) + 1;


            const total =
                days *
                selectedVehicle.price;


            const booking = {

                id: Date.now(),

                vehicleId:
                    selectedVehicle.id,

                vehicleName:
                    selectedVehicle.name,

                icon:
                    selectedVehicle.icon,

                pickup: pickup,

                returnDate:
                    returnDate,

                days: days,

                total: total,

                status: "Confirmed"

            };


            bookings.unshift(
                booking
            );


            localStorage.setItem(
                "vehicleBookings",
                JSON.stringify(bookings)
            );


            closeModal();


            renderBookings();

            updateStatistics();


            showToast(
                "Booking confirmed successfully! 🚗"
            );

        }
    );


// ========================================
// RENDER BOOKINGS
// ========================================

function renderBookings() {

    const container =
        document
            .getElementById(
                "bookingList"
            );


    container.innerHTML = "";


    if (bookings.length === 0) {

        container.innerHTML = `

            <div style="
                background:white;
                padding:50px;
                text-align:center;
                border-radius:15px;
                color:#888;
            ">

                <div style="
                    font-size:50px;
                    margin-bottom:15px;
                ">
                    🚗
                </div>

                <h3>
                    No bookings yet
                </h3>

                <p>
                    Book your first vehicle today!
                </p>

            </div>

        `;

        return;

    }


    bookings.forEach(booking => {

        const card =
            document.createElement(
                "div"
            );


        card.className =
            "booking-card";


        card.innerHTML = `

            <div class="booking-left">

                <div class="booking-icon">
                    ${booking.icon}
                </div>

                <div class="booking-details">

                    <h3>
                        ${booking.vehicleName}
                    </h3>

                    <p>
                        📅
                        ${formatDate(booking.pickup)}
                        →
                        ${formatDate(booking.returnDate)}
                    </p>

                    <p>
                        ⏱️
                        ${booking.days} day(s)
                    </p>

                    <span class="status">
                        ${booking.status}
                    </span>

                </div>

            </div>


            <div class="booking-price">

                <small>
                    Total Amount
                </small>

                <h2>
                    ₹${booking.total.toLocaleString("en-IN")}
                </h2>

                <button
                    class="cancel-booking"
                    onclick="cancelBooking(${booking.id})">

                    Cancel

                </button>

            </div>

        `;


        container.appendChild(card);

    });

}


// ========================================
// CANCEL BOOKING
// ========================================

function cancelBooking(id) {

    const confirmCancel =
        confirm(
            "Are you sure you want to cancel this booking?"
        );


    if (!confirmCancel) {
        return;
    }


    bookings =
        bookings.filter(
            booking =>
                booking.id !== id
        );


    localStorage.setItem(
        "vehicleBookings",
        JSON.stringify(bookings)
    );


    renderBookings();

    updateStatistics();


    showToast(
        "Booking cancelled successfully."
    );

}


// ========================================
// STATISTICS
// ========================================

function updateStatistics() {

    const count =
        bookings.length;


    document
        .getElementById(
            "homeBookings"
        )
        .innerText =
        count;


    document
        .getElementById(
            "bookingCount"
        )
        .innerText =
        count;


    document
        .getElementById(
            "profileBookings"
        )
        .innerText =
        count;

}


// ========================================
// FORMAT DATE
// ========================================

function formatDate(dateString) {

    return new Date(
        dateString
    ).toLocaleDateString(
        "en-IN",
        {
            day: "2-digit",
            month: "short",
            year: "numeric"
        }
    );

}


// ========================================
// TOAST
// ========================================

function showToast(message) {

    const toast =
        document
            .getElementById(
                "toast"
            );


    toast.innerText =
        message;


    toast.style.display =
        "block";


    setTimeout(
        function() {

            toast.style.display =
                "none";

        },
        3000
    );

}


// ========================================
// LOGOUT
// ========================================

function logout() {

    document
        .getElementById(
            "app"
        )
        .classList.add(
            "hidden"
        );


    document
        .getElementById(
            "loginPage"
        )
        .classList.remove(
            "hidden"
        );


    document
        .getElementById(
            "loginForm"
        )
        .reset();

}
```
