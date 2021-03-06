export default {
    applicationName: "CureOna",
    login: "Login",
    register: "Register",
    registration: "Registration",
    username: "Username",
    password: "Password",
    passwordAuthentication: "Password Authentication",
    businessName: "Business Name",
    cid: "CID",
    ownerName: "Owner Name",
    businessAdress: "Business Address",
    ownerId: "Owner ID",
    theUserCanGetIn: "The user can get in",
    theUserCannotGetIn: "The user can't get in",
    searchBusiness : "Search Business",
    placeholder: {
        username: "The username consists of A-Z, a-z letters",
        password: "Password must be between 6-8 characters",
        passwordAuthentication: "Enter the password again",
        businessName: "Enter your business name",
        cid: "Enter your business's CID",
        ownerName: "Enter your first name",
        businessAddress: "Enter business adress",
        ownerId: "Enter your ID",
        code: "Insert user code",
    },
    alert: {
        pleaseEnterValidUsernameAndPassword: "please enter valid username and password.",
        pleaseCheckYourUserNameAndPassword: "please check your username and password.",
        checkConditions: "please check and fill the fields properly",
        cancelAppointment: "Cancel Appointment",
        wouldYouLikeToCancelQueueToBusinessnameInDateAndHour: (businessName, date, hour) =>
            `${businessName} \nin ${date}, ${hour}\nwould you like to cancel?`,
        youAreNowRegisteredToHour: (hour, key) =>
            `you are now registerd to ${hour}. please dont be late. \nyour code is :${key}`,

        somethingWentWrong : "something went wrong.",
        hoursUpdated : "Hours Updated!",
        success: "Success",
        failed: "Failed",

        theUserCanGetIn: "The user can get in!",
        theUserCannotGetIn: "The user can't get in!\ntry again or ask him to leave.",
        yes: "Yes",
        no: "No",
    },
    type: {
        customer: "customer",
        businessOwner: "business_owner",
        admin: "admin",
        worker: "worker",
    },
    screenHeaders: {
        search: "Search",
        myQueues: "My Queues",
    },
    decisions: {
        makeAnAppointment: "makeAnAppointment",
        adminChanges: "adminChanges",
    },


    or_if_you_dont_have_user: "Or if you dont have a user, ",
    addWorker: "Add Worker to your business",
    addWorkerbButton: "Add Worker",
    chooseDayBusinessOwner: "Choose the day you want to",
    updateTheOpeningHoursBusinessOwner: "Update opening hours",
    DoYouhaveABreak: "Do you have a break?",
    fillDowndTheHours: "fill down the opening hours after the break",
    close: "close",
    update: "Update"
     
}

