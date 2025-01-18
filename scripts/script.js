// I'm aware this doesn't add to my mark, but javascript is so fun
// These JSON files are all on the client-side.
// Not using NodeJS for the backend might kill me.

const accountsData = {
    "accounts": [
        {
            "id": "1",
            "email": "example@example.com",
            "phone": "1234567890",
            "username": "user",
            "password": "password"
        },
        {
            "id": "2",
            "email": "example@example.com",
            "phone": "1234567890",
            "username": "Ben",
            "password": "Jury"
        }
    ]
};

const eventsData = {
    "events": [
        {
            "id": "1",
            "title": "MF DOOM | ONE MAD VILLIAN",
            "artist": "MF DOOM, Mr. Fantaskic",
            "description": "Just remember all CAPS when you spell the man's name.",
            "tickets_left": 101,
            "status": "Open",
            "location": "Brisbane Showgrounds",
            "date": "24/06/2004",
            "genres": "Rap",
            "comments": 2,
            "likes": 101,
            "image": "images/Madvillainy_cover.png"
        },
        {
            "id": "2",
            "title": "Coachella Music Festival | 2024",
            "artist": "Various Artists",
            "description": "One of the biggest music festivals in the world!",
            "tickets_left": 0,
            "status": "Sold Out",
            "location": "Indio, California, USA",
            "date": "15/04/2024",
            "genres": "Festival",
            "comments": 1,
            "likes": 500,
            "image": "images/coachella.jpg"
        },
        {
            "id": "3",
            "title": "Glastonbury Festival | 2024",
            "artist": "Various Artists",
            "description": "Iconic music festival held in England.",
            "tickets_left": 300,
            "status": "Open",
            "location": "Glastonbury, England",
            "date": "26/06/2024",
            "genres": "Festival",
            "comments": 0,
            "likes": 400,
            "image": "images/Glastonbury.png"
        },
        {
            "id": "4",
            "title": "Radio Birdman | Live",
            "artist": "Radio Birdman",
            "description": "The best known early australian punk band of the late 70s is performing live",
            "tickets_left": 700,
            "status": "Open",
            "location": "Melbourne",
            "date": "17/03/2026",
            "genres": "Punk Rock",
            "comments": 0,
            "likes": 400,
            "image": "images/radio_birdman.jpg"
        }
    ]
};

const bookingsData = {
    "bookings": [
        {   
            "bookingId": 1,
            "username": "user",
            "eventId": "1",
            "ticketsBooked": 2,
            "dateBooked": "17/03/2004"
        },
        {
            "bookingId": 2,
            "dateBooked": "17/03/2004",
            "username": "user",
            "eventId": "2",
            "ticketsBooked": 1
        },
        {
            "bookingId": 3,
            "dateBooked": "17/03/2004",
            "username": "Ben",
            "eventId": "4",
            "ticketsBooked": 4
        }
    ]
};

const uploadedData = {
    "uploaded": [
        {
            "username": "user",
            "eventId": "1"
        },
        {
            "username": "user",
            "eventId": "2"
        },
        {
            "username": "user",
            "eventId": "3"
        },
        {
            "username": "Ben",
            "eventId": "4"
        }
    ]
};

const commentsData = {
    "comments": [
        {
            "username": "Ben",
            "eventId": "1",
            "comment": "I love this event"
        },
        {
            "username": "user",
            "eventId": "1",
            "comment": "Soooo excited"
        },
        {
            "username": "ben",
            "eventId": "2",
            "comment": "Coachella bby!!!"
        }
    ]
};



function rmOutline(id) {
    rm = document.querySelector('#' + id)
    rm.classList.remove('is-invalid')
}

// function getUsernameFromCookie() {

//     const cookies = document.cookie.split(';');

//     const createEvent = document.querySelector("#createEvent");
//     const tickets = document.querySelector("#ticketsNav");
//     const welcome = document.querySelector("#welcome");
    
//     for (let cookie of cookies) {
//         const [name, value] = cookie.trim().split('=');
//         if (name === 'username') {
//             createEvent.style.display = "flex"; 
//             tickets.style.display = "flex"; 
//             welcome.innerHTML = `<label class="gone">Welcome: ${value}</label> <button class="btn btn-outline-danger me-2" onclick="signOut();">Sign out</button>`;
//             return value;
//         }
//     }
//     createEvent.style.display = "none";
//     tickets.style.display = "none";
//     return;
// }

function getUsernameFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const username = urlParams.get('username');
    if (username) {
        const createEvent = document.querySelector("#createEvent");
        const tickets = document.querySelector("#ticketsNav");
        const welcome = document.querySelector("#welcome");
        createEvent.style.display = "flex"; 
        tickets.style.display = "flex"; 
        welcome.innerHTML = `<label class="gone">Welcome: ${username}</label> <button class="btn btn-outline-danger me-2" onclick="signOut();">Sign out</button>`;
        return username;
    } else {
        const createEvent = document.querySelector("#createEvent");
        const tickets = document.querySelector("#ticketsNav");
        createEvent.style.display = "none";
        tickets.style.display = "none";
        return null;
    }
}


function signOut() {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('username')) {
        urlParams.delete('username');
        const newURL = window.location.pathname + '?' + urlParams.toString();
        window.location.href = newURL;
    } else {
        window.location.href = 'account.html';
    }
}



async function signUp() {
    event.preventDefault();

    let vaild = true;

    let email = document.querySelector("#email");
    let phone = document.querySelector("#phone");
    let username = document.querySelector("#username");
    let password = document.querySelector("#password");
    let re_enter_password = document.querySelector("#re-enter-password");

    
    let inputs = [email, phone, username, password, re_enter_password];

    
    inputs.forEach(input => {
        if (input.value === "") {
            input.classList.add('is-invalid');
            vaild = false;
        }
    });

    if (password.value != re_enter_password.value) {
        re_enter_password.classList.add('is-invalid');
        vaild = false;
    }

    if (!(isValidEmail(email.value))) {
        email.classList.add('is-invalid');
        window.alert("Invaild Email");
    }

    if (vaild == true) {
        const newAccount = {
            "id": Math.floor(Math.random() * 1000000), 
            "email": email,
            "phone": phone,
            "username": username,
            "password": password
        };

        window.alert("Login with Username: 'user' and Password: 'password'")
    }
}


async function login() {
    event.preventDefault();
    let username = document.querySelector("#username");
    let password = document.querySelector("#password");

    if (password === "" || username.value === "") {
        // window.alert("invalid Username (can't be null)");
        password.classList.add('is-invalid');
        username.classList.add('is-invalid');
        return;
    } else if (password === "") {
        password.classList.add('is-invalid');
        return;
    } else if (username.value === "") {
        username.classList.add('is-invalid');
        return;
    }

    const user = accountsData.accounts.find(account => account.username === username.value && account.password === password.value);
    
    if (user) {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('username', username.value);
        const newURL = 'index.html' + '?' + urlParams.toString();
        window.location.href = newURL;
    } else {
        password.classList.add('is-invalid');
        username.classList.add('is-invalid');
        window.alert("Incorrect username or password");
    }
}



async function loadBookedEvents() {
    const username = getUsernameFromURL();
    if (!username) {
        console.log("No username found in the URL");
        return;
    }

    try {
        const events = eventsData.events;
        const bookings = bookingsData.bookings;

        const userBookings = bookings.filter(booking => booking.username === username && booking.ticketsBooked >= 1);

        userBookings.forEach(booking => {
            const event = events.find(event => event.id === booking.eventId);
            if (event) {
                let eventRow = `<div class="event-row" onclick="window.location.href = 'view_event.html?id=${event.id}&username=user'">
                    <div class="image-con">
                        <image src="${event.image}" width="300" />
                    </div>
                    <div class="info-con">
                        <h1 onclick="window.location.href = 'view_event.html?id=${event.id}&username=user'">${event.title}</h1>
                        <div class="description-con">
                            <p>Artist: ${event.artist}</p>
                            <p>Genres: ${event.genres}</p>
                            <p>Description: ${event.description}</p>
                        </div>
                        <div class="options-con">
                            <p><i class="fa-solid fa-ticket"></i>: ${event.tickets_left}, </p>
                            <p><i class="fa-solid fa-location-dot"></i>: ${event.location},</p>
                            <p><i class="fa-solid fa-calendar-days"></i>: ${event.date},</p>
                            <p><i class="fa-solid fa-comment"></i>: ${event.comments},</p>
                            <p><i class="fa-solid fa-heart"></i>: ${event.likes},</p>
                            <p><i class="fa-solid fa-sign-hanging"></i>: ${event.status},</p>
                        </div>
                        <h1>Booking Id: ${booking.bookingId}</h1>
                        <h1>Purchased Tickets: ${booking.ticketsBooked}</h1>
                        <h1>Date Booked: ${booking.dateBooked}</h1>
                    </div>
                </div>`;

                document.querySelector('#event-listings').innerHTML += eventRow;
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
}



async function uploadedEvents() {
    const username = getUsernameFromURL();
    if (!username) {
        console.log("No username found in the URL.");
        return;
    }
   
    try {
        const events = eventsData.events;
        const uploaded = uploadedData.uploaded;

        const userUploadedEvents = uploaded.filter(upload => upload.username === username);

        userUploadedEvents.forEach(upload => {
            const event = events.find(event => event.id === upload.eventId);
            if (event) {
                let eventRow = `<div class="event-row" onclick="window.location.href = 'view_event.html?id=${event.id}&username=user'">
                    <div class="image-con">
                        <image src="${event.image}" width="300"/>
                    </div>
                    <div class="info-con">
                        <h1 onclick="window.location.href = 'view_event.html?id=${event.id}&username=user'">${event.title}</h1>
                        <div class="description-con">
                            <p>Artist: ${event.artist}</p>
                            <p>Genres: ${event.genres}</p>
                            <p>Description: ${event.description}</p>
                        </div>
                        <div class="options-con">
                            <p><i class="fa-solid fa-ticket"></i>: ${event.tickets_left}, </p>
                            <p><i class="fa-solid fa-location-dot"></i>: ${event.location},</p>
                            <p><i class="fa-solid fa-calendar-days"></i>: ${event.date},</p>
                            <p><i class="fa-solid fa-comment"></i>: ${event.comments},</p>
                            <p><i class="fa-solid fa-heart"></i>: ${event.likes},</p>
                            <p><i class="fa-solid fa-sign-hanging"></i>: ${event.status},</p>
                        </div>
                        <h1>Uploaded by You</h1>
                        <button type="button" onclick="remove()" class="btn btn-outline-danger">Remove</button>
                    </div>
                </div>`;

                document.querySelector('#event-listings').innerHTML += eventRow + "";
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
}




function remove() {
    window.alert("Fail as PUT/POST/DELETE can't be used :(");
}

function createMusicEvent() {
    window.alert("Fail as PUT/POST/DELETE can't be used :(");
}


async function loadEvents(sortBy) {
    try {
        let events = eventsData.events;

        if (sortBy === 'Alphabetical') {
            events.sort((a, b) => a.title.localeCompare(b.title));
        } else if (sortBy === 'Tickets') {
            events.sort((a, b) => b.tickets_left - a.tickets_left);
        } else if (sortBy === 'Likes') {
            events.sort((a, b) => b.likes - a.likes);
        } else if (sortBy === 'Date') {
            events.sort((a, b) => new Date(a.date) - new Date(b.date));
        } else if (sortBy === 'Comments') {
            events.sort((a, b) => b.comments - a.comments);
        }

        events.forEach(event => {
            let eventRow = `<div class="event-row" onclick="window.location.href = 'view_event.html?id=${event.id}&username=user'">
                <div class="image-con">
                   <image src="${event.image}" width="300" />
                </div>
                <div class="info-con">
                    <h1 onclick="window.location.href = 'view_event.html?id=${event.id}'&username=user">${event.title}</h1>
                    <div class="description-con">
                        <p>Artist: ${event.artist}</p>
                        <p>Genres: ${event.genres}</p>
                        <p>Description: ${event.description}</p>
                    </div>
                    <div class="options-con">
                        <p><i class="fa-solid fa-ticket"></i>: ${event.tickets_left}, </p>
                        <p><i class="fa-solid fa-location-dot"></i>: ${event.location},</p>
                        <p><i class="fa-solid fa-calendar-days"></i>: ${event.date},</p>
                        <p><i class="fa-solid fa-comment"></i>: ${event.comments},</p>
                        <p><i class="fa-solid fa-heart"></i>: ${event.likes},</p>
                        <p><i class="fa-solid fa-sign-hanging"></i>: ${event.status},</p>
                    </div>
                </div>
            </div>`;

            document.querySelector('#event-listings').innerHTML += eventRow;
        });
    } catch (error) {
        console.error('Error:', error);
    }
}



async function view_event() {
    let content = document.querySelector("#content");

    const urlParams = new URLSearchParams(window.location.search);
    const eventId = urlParams.get('id');

    if (!eventId) {
        content.innerHTML = "<h1>Error: Event ID not found in the URL.</h1>";
        return;
    }

    const event = eventsData.events.find(event => event.id === eventId);

    if (!event) {
        content.innerHTML = "<h1>Error: Event not found.</h1>";
        return;
    }

    const comments = commentsData.comments.filter(comment => comment.eventId === eventId);

    let commentsHTML = '';
    comments.forEach(comment => {
        commentsHTML += `<div class="comment">
                            <h1>${comment.username}</h1>
                            <div class="message">
                                ${comment.comment}
                            </div>
                        </div>`;
    });

    let event_info = `       
        <div class="title">
            <h1>${event.title}</h1>
            <h1 id="welcome">Welcome: <button class="btn btn-outline-success me-2" onclick="window.location.href = 'account.html'">Sign In</button></h1>
        </div>
        <div class="event-listings">
            <div class="event-row view-event">
                <div class="image-con">
                    <image src="${event.image}" width="300" />
                </div>
                <div class="info-con">
                    <h1>${event.title}</h1>
                    <div class="description-con">
                        <p>Artist: ${event.artist}</p>
                        <p>Description: ${event.description}</p>
                    </div>
                    <div class="options-con">
                        <p><i class="fa-solid fa-ticket"></i>: ${event.tickets_left}, </p>
                        <p><i class="fa-solid fa-location-dot"></i>: ${event.location},</p>
                        <p><i class="fa-solid fa-calendar-days"></i>: ${event.date},</p>
                        <p><i class="fa-solid fa-comment"></i>: ${event.comments},</p>
                        <p><i class="fa-solid fa-heart"></i>: ${event.likes},</p>
                    </div>
                    <h1>Purchase Tickets</h1>
                    <input type="number" id="quantity" class="input" name="quantity" min="1" placeholder="Amount">
                </div>
                <div class="comments">
                    <nav class="comment-nav">
                        <h1>Comments</h1>
                    </nav>
                    ${commentsHTML}
                    <div class="comment">
                        <h1>YOU</h1>
                        <div class="message">
                            <input placeholder="Comment" />
                        </div>
                    </div>
                    <button class="btn btn-outline-success me-2" onclick="postComment()" type="button">Post Comment</button>
                </div>
            </div>
            <br>
            <button class="btn btn-outline-success me-2" onclick="bookEvent()" type="button">Book Event</button>
            <br>
        </div>
    </div> `;

    content.innerHTML = event_info;
    getUsernameFromURL();
}


function bookEvent() {
    window.alert("Fail as PUT/POST/DELETE can't be used :(");
    window.location.href = 'booked_events.html?username=user';
}

function postComment() {
    window.alert("Fail as PUT/POST/DELETE can't be used :(");
    
}


function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}


function signSwap(swap) {
    let form = document.querySelector('#form');
    let title = document.querySelector('#title');

    if (swap == "signUp") {
        title.innerHTML = "Sign Up"
        form.innerHTML = `

        <div class="form-group">
        <label for="email">Email</label>
        <input type="email" class="form-control" id="email"  placeholder="Enter Email" onclick="rmOutline('email')">
        </div>

        <div class="form-group">
        <label for="Phone Number">Phone: </label>
        <input type="tel" class="form-control" id="phone" name="phone" pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}" placeholder="Enter Phone Number" onclick="rmOutline('phone')">
        </div>

        <div class="form-group">
        <label for="username">Username</label>
        <input type="text" class="form-control" id="username"  placeholder="Create Username" onclick="rmOutline('username')">
        </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" class="form-control" id="password" placeholder="Create Password"  onclick="rmOutline('password')">
      </div>

      <div class="form-group">
      <label for="re-enter-password">Re-enter Password</label>
      <input type="password" class="form-control" id="re-enter-password" placeholder="Re-enter Password" onclick="rmOutline('re-enter-password')">
        </div>

      <button type="submit" class="btn btn-primary submit" onclick="signUp();">Sign Up</button>
      <a class="link" onclick="signSwap('signIn')" >Already have an account?</a>
        
        `
    } else {
        window.location.reload();
    }
}

function selectSort(id) {
    document.querySelector('#dropdownMenuLink').innerHTML = id;
    document.querySelector("#event-listings").innerHTML = "";
    loadEvents(id);
}