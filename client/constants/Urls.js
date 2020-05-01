const MainURL = 'https://curona.herokuapp.com/';

export default {
    routes: {
        login: MainURL + 'Login',
        register: MainURL + 'Registration',
        makeAnAppointment: MainURL + 'GetQueue',
        avilableQueues: MainURL + 'AvailableQueues',
        businessSettings: MainURL + 'businessSettings',
        registerBusiness: MainURL + 'RegisterBusiness',
        getBusiness : MainURL + 'getBusinesses',
        getMyQueue : MainURL + 'GetMyQueue',
        registerWorker: MainURL + 'RegistrationWorker'
    }

}