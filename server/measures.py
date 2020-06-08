import requests
import smtplib
from flask_restful import reqparse, Resource

class MeasureUrlsResponse(Resource):

    def post(self):
        MainURL = 'https://curona.herokuapp.com/'
        routes = {
            "login": MainURL + 'Login34',
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
        res = ''
        print("checks urls activity...")
        for key, value in routes.items():
            res += "checking " + key + "... "
            myobj = dict()
            response = requests.post(value, data=myobj)
            response = str(response)
            if response != "<Response [404]>":
                count += 1
                res += "OK\n"
            else:
                res += "not OK!\n"
            # print("{0}: {1}".format(key, response))
        percentage_of_passed_tests = round(count / len(routes) * 100, 2)

        res += "\npercentage of url that working properly: " + str(percentage_of_passed_tests) + "%\n"

        gmail_user = 'cureonaapp@gmail.com'
        gmail_password = 'hadas2020'

        sent_from = gmail_user
        to = ['cureonaapp@gmail.com', ]
        subject = 'check result of all routes'
        body = res

        email_text = """\
        From: %s
        To: %s
        Subject: %s
        
        %s
        """ % (sent_from, ", ".join(to), subject, body)

        try:
            server = smtplib.SMTP('smtp.gmail.com', 587)
            # server.connect("smtp.gmail.com", 468)
            server.ehlo()
            server.starttls()
            server.login(gmail_user, gmail_password)
            server.sendmail(sent_from, to, email_text)
            server.close()
        except Exception as e:
            print('Something went wrong...')
            print(e)
