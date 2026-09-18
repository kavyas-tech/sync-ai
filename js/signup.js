/* =========================================
   SYNC AI - CREATE ACCOUNT JAVASCRIPT
========================================= */


/* =========================================
   ELEMENTS
========================================= */

const signupForm =
    document.getElementById("signupForm");

const regionSelect =
    document.getElementById("region");

const stateSelect =
    document.getElementById("state");

const districtSelect =
    document.getElementById("district");



/* =========================================
   STATE DATA
========================================= */

const states = [

    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal"

];



/* =========================================
   DISTRICT DATA
========================================= */

const districts = {

    "Tamil Nadu": [

        "Ariyalur",
        "Chengalpattu",
        "Chennai",
        "Coimbatore",
        "Cuddalore",
        "Dharmapuri",
        "Dindigul",
        "Erode",
        "Kallakurichi",
        "Kanchipuram",
        "Kanyakumari",
        "Karur",
        "Krishnagiri",
        "Madurai",
        "Mayiladuthurai",
        "Nagapattinam",
        "Namakkal",
        "Nilgiris",
        "Perambalur",
        "Pudukkottai",
        "Ramanathapuram",
        "Ranipet",
        "Salem",
        "Sivaganga",
        "Tenkasi",
        "Thanjavur",
        "Theni",
        "Thoothukudi",
        "Tiruchirappalli",
        "Tirunelveli",
        "Tirupathur",
        "Tiruppur",
        "Tiruvallur",
        "Tiruvannamalai",
        "Tiruvarur",
        "Vellore",
        "Viluppuram",
        "Virudhunagar"

    ],

    "Kerala": [

        "Alappuzha",
        "Ernakulam",
        "Idukki",
        "Kannur",
        "Kasaragod",
        "Kollam",
        "Kottayam",
        "Kozhikode",
        "Malappuram",
        "Palakkad",
        "Pathanamthitta",
        "Thiruvananthapuram",
        "Thrissur",
        "Wayanad"

    ],

    "Karnataka": [

        "Bengaluru Urban",
        "Mysuru",
        "Mangaluru",
        "Belagavi",
        "Dharwad",
        "Hubballi",
        "Shivamogga",
        "Tumakuru",
        "Udupi",
        "Ballari"

    ],

    "Andhra Pradesh": [

        "Anakapalli",
        "Anantapur",
        "Chittoor",
        "East Godavari",
        "Guntur",
        "Kakinada",
        "Krishna",
        "Kurnool",
        "Nellore",
        "Prakasam",
        "Tirupati",
        "Visakhapatnam",
        "Vizianagaram",
        "West Godavari"

    ],

    "Telangana": [

        "Adilabad",
        "Hyderabad",
        "Karimnagar",
        "Khammam",
        "Medak",
        "Nalgonda",
        "Nizamabad",
        "Rangareddy",
        "Warangal"

    ],

    "Maharashtra": [

        "Ahmednagar",
        "Aurangabad",
        "Mumbai City",
        "Mumbai Suburban",
        "Nagpur",
        "Nashik",
        "Pune",
        "Satara",
        "Solapur",
        "Thane"

    ],

    "Gujarat": [

        "Ahmedabad",
        "Anand",
        "Bhavnagar",
        "Gandhinagar",
        "Jamnagar",
        "Rajkot",
        "Surat",
        "Vadodara",
        "Valsad"

    ],

    "West Bengal": [

        "Bankura",
        "Bardhaman",
        "Darjeeling",
        "Hooghly",
        "Howrah",
        "Jalpaiguri",
        "Kolkata",
        "Malda",
        "Murshidabad",
        "Nadia",
        "North 24 Parganas",
        "South 24 Parganas"

    ]

};



/* =========================================
   LOAD STATES
========================================= */

function loadStates() {

    stateSelect.innerHTML = `
        <option value="">
            Select state
        </option>
    `;


    states.forEach(function (state) {

        const option =
            document.createElement("option");

        option.value = state;

        option.textContent = state;

        stateSelect.appendChild(option);

    });

}

loadStates();



/* =========================================
   STATE CHANGE
========================================= */

stateSelect.addEventListener(
    "change",
    function () {

        const selectedState =
            stateSelect.value;


        districtSelect.innerHTML = `
            <option value="">
                Select district
            </option>
        `;


        districtSelect.disabled =
            selectedState === "";


        if (
            selectedState !== "" &&
            districts[selectedState]
        ) {

            districts[selectedState].forEach(
                function (district) {

                    const option =
                        document.createElement("option");

                    option.value = district;

                    option.textContent = district;

                    districtSelect.appendChild(option);

                }
            );

        }

        else if (selectedState !== "") {

            const option =
                document.createElement("option");

            option.value = "Other";

            option.textContent =
                "Other / Not listed";

            districtSelect.appendChild(option);

        }

    }
);



/* =========================================
   FORM SUBMIT
========================================= */

signupForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        /* Basic values */

        const fullName =
            document.getElementById(
                "fullName"
            ).value.trim();


        const username =
            document.getElementById(
                "username"
            ).value.trim();


        const college =
            document.getElementById(
                "college"
            ).value.trim();


        const collegeEmail =
            document.getElementById(
                "collegeEmail"
            ).value.trim();


        const password =
            document.getElementById(
                "password"
            ).value;


        const confirmPassword =
            document.getElementById(
                "confirmPassword"
            ).value;


        const region =
            regionSelect.value;


        const state =
            stateSelect.value;


        const district =
            districtSelect.value;



        /* =================================
           VALIDATION
        ================================= */


        if (
            fullName === "" ||
            username === "" ||
            college === "" ||
            collegeEmail === ""
        ) {

            alert(
                "Please complete all required account details."
            );

            return;

        }


        if (password.length < 6) {

            alert(
                "Password must contain at least 6 characters."
            );

            return;

        }


        if (password !== confirmPassword) {

            alert(
                "Passwords do not match."
            );

            return;

        }


        if (
            region === "" ||
            state === "" ||
            district === ""
        ) {

            alert(
                "Please select your region, state and district."
            );

            return;

        }



        /* =================================
           DOMAIN SELECTION
        ================================= */

        const selectedDomains =
            Array.from(
                document.querySelectorAll(
                    'input[name="domain"]:checked'
                )
            ).map(function (checkbox) {

                return checkbox.value;

            });


        if (selectedDomains.length === 0) {

            alert(
                "Please select at least one preferred domain."
            );

            return;

        }



        /* =================================
           SAVE DATA
           FOR PROTOTYPE
        ================================= */

        const studentData = {

            fullName: fullName,

            username: username,

            college: college,

            collegeEmail: collegeEmail,

            password: password,

            region: region,

            state: state,

            district: district,

            preferredDomains:
                selectedDomains,

            accountCreated: true,

            emailVerified: false,

            assessmentCompleted: false,

            createdAt:
                new Date().toISOString()

        };


        localStorage.setItem(
            "syncAI_student",
            JSON.stringify(studentData)
        );


        /* =================================
           TEMPORARY OTP FLOW
        ================================= */

        window.location.href =
            "otp.html";

    }
);