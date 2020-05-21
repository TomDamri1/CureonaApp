import requests

MainURL = 'https://curona.herokuapp.com/'
routes = {
    "login": MainURL + 'Login',
    "register": MainURL + 'Registration',
    "makeAnAppointment": MainURL + 'GetQueue',
    "availableQueues": MainURL + 'AvailableQueues',
    "businessSettings": MainURL + 'businessSettings',
    "registerBusiness": MainURL + 'RegisterBusiness',
    "getBusiness": MainURL + 'getBusinesses',
    "getMyQueue": MainURL + 'GetMyQueue',
    "registerWorker": MainURL + 'RegistrationWorker',
    "letsUserIntoBusiness": MainURL + 'LetsUserIntoBusiness',
    "deleteAppointment": MainURL + 'deleteAppointment',
}

count = 0
print("checks urls activity...")
for key, value in routes.items():
    print("checking " + key + "... ", end='')
    myobj = dict()
    response = requests.post(value, data=myobj)
    response = str(response)
    if response != "<Response [404]>":
        count += 1
        print("OK")
    else:
        print("not OK!")
    # print("{0}: {1}".format(key, response))
percentage_of_passed_tests = round(count / len(routes) * 100, 2)
print("percentage of url that working properly: " + str(percentage_of_passed_tests) + "%")


