export default {
    applicationName: "CureOna",
    login: "Login",
    register: "Register",
    registration: "Registration",
    username: "Username",
    password: "Password",
    passwordAuthentication: "Password Authentication",
    businessName : "Business Name",
    cid : "CID",
    ownerName :"Owner Name",
    businessAdress :"Business Address",
    ownerId :"Owner ID",
    placeholder: {
        username: "The username consists of A-Z, a-z letters",
        password: "Password must be between 6-8 characters",
        passwordAuthentication: "Enter the password again",
        businessName:"Enter your business name",
        cid:"Enter your business's CID",
        ownerName:"Enter your first name",
        businessAddress:"Enter business adress",
        ownerId:"Enter your ID",
    },
    alert: {
        pleaseEnterValidUsernameAndPassword: "please enter valid username and password.",
        pleaseCheckYourUserNameAndPassword: "please check your username and password.",
        checkConditions : "please check and fill the fields properly",
        cancelAppointment : "Cancel Appointment",
        wouldYouLikeToCancelQueueToBusinessnameInDateAndHour : 
            (businessName, date , hour) => `${businessName} \nin ${date}, ${hour}\nwould you like to cancel?`,
    },
    type: {
        customer: "customer",
        businessOwner: "business_owner",
        admin: "admin"
    },
    screenHeaders : {
        search : "Search",
        myQueues : "My Queues",
    },
    decisions : {
        makeAnAppointment : "makeAnAppointment",
        adminChanges : "adminChanges",
    },


    or_if_you_dont_have_user: "Or if you dont have a user, "
}

