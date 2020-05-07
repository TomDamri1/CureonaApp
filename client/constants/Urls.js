const MainURL = 'https://curona.herokuapp.com/';

export default {
    routes: {
        login: MainURL + 'Login',
        register: MainURL + 'Registration',
        makeAnAppointment: MainURL + 'GetQueue',
        availableQueues: MainURL + 'AvailableQueues',
        businessSettings: MainURL + 'businessSettings',
        registerBusiness: MainURL + 'RegisterBusiness',
        getBusiness : MainURL + 'getBusinesses',
        getMyQueue : MainURL + 'GetMyQueue',
        registerWorker: MainURL + 'RegistrationWorker',
        letsUserIntoBusiness : MainURL + 'LetsUserIntoBusiness',
        deleteAppointment : MainURL + 'deleteAppointment',
    }

}