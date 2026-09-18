/* =========================================
   SYNC AI - OTP VERIFICATION
========================================= */


/* =========================================
   GET ELEMENTS
========================================= */

const otpForm =
    document.getElementById("otpForm");

const otpInputs =
    document.querySelectorAll(".otp-input");

const emailDisplay =
    document.getElementById("emailDisplay");

const timerElement =
    document.getElementById("timer");

const resendButton =
    document.getElementById("resendBtn");



/* =========================================
   LOAD STUDENT DATA
========================================= */

const storedStudent =
    localStorage.getItem("syncAI_student");


let studentData = null;


if (storedStudent) {

    try {

        studentData =
            JSON.parse(storedStudent);

    } catch (error) {

        studentData = null;

    }

}



/* =========================================
   DISPLAY EMAIL
========================================= */

if (
    studentData &&
    studentData.collegeEmail
) {

    emailDisplay.textContent =
        maskEmail(studentData.collegeEmail);

} else {

    emailDisplay.textContent =
        "College email not found";

}



/* =========================================
   MASK EMAIL
========================================= */

function maskEmail(email) {

    const parts =
        email.split("@");

    if (parts.length !== 2) {

        return email;

    }


    const name =
        parts[0];

    const domain =
        parts[1];


    if (name.length <= 2) {

        return (
            name.charAt(0) +
            "*".repeat(
                Math.max(name.length - 1, 1)
            ) +
            "@" +
            domain
        );

    }


    const visible =
        name.substring(0, 2);


    const stars =
        "*".repeat(
            Math.max(name.length - 2, 3)
        );


    return (
        visible +
        stars +
        "@" +
        domain
    );

}



/* =========================================
   OTP INPUT BEHAVIOUR
========================================= */

otpInputs.forEach(
    function (input, index) {


        /* Only numbers */

        input.addEventListener(
            "input",
            function () {

                input.value =
                    input.value.replace(
                        /[^0-9]/g,
                        ""
                    );


                if (
                    input.value &&
                    index <
                    otpInputs.length - 1
                ) {

                    otpInputs[index + 1].focus();

                }

            }
        );


        /* Backspace */

        input.addEventListener(
            "keydown",
            function (event) {

                if (
                    event.key === "Backspace" &&
                    input.value === "" &&
                    index > 0
                ) {

                    otpInputs[index - 1].focus();

                }

            }
        );


        /* Paste 6-digit OTP */

        input.addEventListener(
            "paste",
            function (event) {

                event.preventDefault();


                const pasted =
                    event.clipboardData
                        .getData("text")
                        .replace(
                            /[^0-9]/g,
                            ""
                        )
                        .slice(0, 6);


                pasted
                    .split("")
                    .forEach(
                        function (number, i) {

                            if (otpInputs[i]) {

                                otpInputs[i].value =
                                    number;

                            }

                        }
                    );


                if (pasted.length === 6) {

                    otpInputs[5].focus();

                }

            }
        );

    }
);



/* =========================================
   GET ENTERED OTP
========================================= */

function getEnteredOTP() {

    let otp = "";

    otpInputs.forEach(
        function (input) {

            otp += input.value;

        }
    );

    return otp;

}



/* =========================================
   OTP TIMER
========================================= */

let remainingSeconds = 60;

let timerInterval;


function startTimer() {

    clearInterval(timerInterval);

    remainingSeconds = 60;

    resendButton.disabled = true;

    updateTimer();


    timerInterval =
        setInterval(
            function () {

                remainingSeconds--;

                updateTimer();


                if (remainingSeconds <= 0) {

                    clearInterval(
                        timerInterval
                    );

                    resendButton.disabled =
                        false;

                    timerElement.textContent =
                        "Ready";

                }

            },
            1000
        );

}



function updateTimer() {

    const minutes =
        Math.floor(
            remainingSeconds / 60
        );

    const seconds =
        remainingSeconds % 60;


    timerElement.textContent =
        String(minutes).padStart(2, "0") +
        ":" +
        String(seconds).padStart(2, "0");

}


startTimer();



/* =========================================
   VERIFY OTP
========================================= */

otpForm.addEventListener(
    "submit",
    function (event) {

        event.preventDefault();


        const enteredOTP =
            getEnteredOTP();


        if (enteredOTP.length !== 6) {

            alert(
                "Please enter the complete 6-digit OTP."
            );

            return;

        }


        /*
            Prototype OTP

            Demo OTP:
            123456
        */

        const demoOTP = "123456";


        if (enteredOTP !== demoOTP) {

            alert(
                "Incorrect OTP. Please try again."
            );

            otpInputs.forEach(
                function (input) {

                    input.classList.add(
                        "otp-error"
                    );

                }
            );

            setTimeout(
                function () {

                    otpInputs.forEach(
                        function (input) {

                            input.classList.remove(
                                "otp-error"
                            );

                        }
                    );

                },
                700
            );

            return;

        }



        /* =================================
           OTP SUCCESS
        ================================== */

        if (studentData) {

            studentData.emailVerified =
                true;

            studentData.verificationCompleted =
                true;


            localStorage.setItem(
                "syncAI_student",
                JSON.stringify(studentData)
            );

        }


        localStorage.setItem(
            "syncAI_emailVerified",
            "true"
        );


        /*
            Next page will be created
            in Step 4.
        */

        alert(
            "College email verified successfully!"
        );


        window.location.href =
            "assessment-intro.html";

    }
);



/* =========================================
   RESEND OTP
========================================= */

resendButton.addEventListener(
    "click",
    function () {

        if (resendButton.disabled) {

            return;

        }


        /*
            Prototype:
            Generate/reset demo OTP.
            Real email sending will be implemented
            in backend later.
        */

        alert(
            "A new OTP has been sent to your college email.\n\nDemo OTP: 123456"
        );


        otpInputs.forEach(
            function (input) {

                input.value = "";

            }
        );


        otpInputs[0].focus();


        startTimer();

    }
);