import unittest
import requests


class TestUser(unittest.TestCase):
    # register with tal username and password and login with this user.
    def test_Registration_and_login(self):
        url = 'https://curona.herokuapp.com/Registration'
        myobj = {'username': 'tal', 'password': '123', 'type': 'customer'}
        requests.post(url, data=myobj)

        url = 'https://curona.herokuapp.com/Login'
        myobj = {'username': 'tal', 'password': '123'}
        response = requests.post(url, data=myobj)

        self.assertEqual(response.json(), {'state': 'success', 'type': 'customer'})

    # login with tal username and password, and order a queue.
    def test_login_and_order_queue(self):
        url = 'https://curona.herokuapp.com/Login'
        myobj = {'username': 'tal', 'password': '123'}
        response = requests.post(url, data=myobj)

        url = 'https://curona.herokuapp.com/GetQueue'
        myobj = {"username": "tal", 'company_id': '1213', "BusinessName": "STAMESEK", "Day": "sunday",
                 "Hour": "16:00"}
        response = requests.post(url, data=myobj)
        except_result = {"state": "failed, sorry the queue is full"}
        self.assertEqual(except_result, response.json())

    # change business setting to open and order a queue with c_test user name
    def test_open_business_and_get_two_queue_to_same_place_at_same_time(self):
        url = 'https://curona.herokuapp.com/businessSettings'
        myobj = {'company_id': '345678', 'open': 'True'}
        requests.post(url, data=myobj)
        url = 'https://curona.herokuapp.com/GetQueue'
        myobj = {"username": "c_test", 'company_id': '345678', "BusinessName": "Zara", "Day": "sunday", "Hour": "19:00"}
        requests.post(url, data=myobj)
        response = requests.post(url, data=myobj)
        except_result = {"state": "failed, sorry you can not get two queue to the same hour"}
        self.assertEqual(response.json(), except_result)

    # change business setting to close and order a queue with c_test user name, at the end return the business
    # setting to open
    def test_closing_business_and_get_queue(self):
        url = 'https://curona.herokuapp.com/businessSettings'
        myobj = {'company_id': '123', 'open': 'False'}
        requests.post(url, data=myobj)
        url = 'https://curona.herokuapp.com/GetQueue'
        myobj = {"username": "c_test", 'company_id': '123', "BusinessName": "IKEA", "Day": "wednesday",
                 "Hour": "15:00"}
        response = requests.post(url, data=myobj)
        except_result = {"state": "failed, Business is closed"}
        myobj = {'company_id': '123', 'open': 'True'}
        requests.post(url, data=myobj)
        self.assertEqual(response.json(), except_result)

    def test_register_business_and_closed_for_customer(self):
        url = 'https://curona.herokuapp.com/RegisterBusiness'
        myobj = {'username': 'aabbcc', 'address': 'aaccbb', 'password': '121212', 'type': 'business_owner',
                 'business_name': 'SCE', 'company_id': '111', 'search_key': {'keys': []}}
        requests.post(url, data=myobj)
        url = 'https://curona.herokuapp.com/AvailableQueues'
        myobj = {'company_id': '111'}
        response = requests.post(url, data=myobj)
        except_result = {'state': 'success', 'queue': {'sunday': [], 'monday': [], 'tuesday': [], 'wednesday': [],
                                                       'thursday': [], 'friday': [], 'saturday': []}}
        self.assertEqual(response.json(), except_result)

    def test_change_max_capacity_and_schedule_an_appointment(self):
        url = 'https://curona.herokuapp.com/businessSettings'
        myobj = {'company_id': '1213', 'max_capacity': 1}
        requests.post(url, data=myobj)
        url = 'https://curona.herokuapp.com/GetQueue'
        myobj = {"username": "hadas", 'company_id': '1213', "BusinessName": "STAMESEK", "Day": "sunday",
                 "Hour": "16:00"}
        requests.post(url, data=myobj)
        myobj = {"username": "tal", 'company_id': '1213', "BusinessName": "STAMESEK", "Day": "sunday", "Hour": "16:00"}
        response = requests.post(url, data=myobj)
        except_result = {'state': 'failed, sorry the queue is full'}
        self.assertEqual(response.json(), except_result)

    # add and remove a worker to IKEA c_id 123, business owner test.
    def test_add_and_remove_worker(self):
        url = 'https://curona.herokuapp.com/RegistrationWorker'
        myobj = {"company_id": "123", "password": "12345"}
        response = requests.post(url, data=myobj)
        url = 'https://curona.herokuapp.com/RemoveWorkers'
        print(response.json()["username"])
        myobj = {"username": "test", "worker_name": response.json()["username"]}
        response = requests.post(url, data=myobj)
        except_result = {'state': "success"}
        self.assertEqual(response.json(), except_result)

    # set a new message to IKEA(cid=123) and get IKEA message.
    def test_set_and_get_business_msg(self):
        url = 'https://curona.herokuapp.com/UpdateMyMessage'
        myobj = {"company_id": "123", "msg": "test msg2"}
        requests.post(url, data=myobj)

        url = 'https://curona.herokuapp.com/GetBusinessMessage'
        myobj = {"company_id": "123"}
        response = requests.post(url, data=myobj)

        except_result = {'state': "success", "msg": "test msg2"}
        self.assertEqual(response.json(), except_result)


if __name__ == '__main__':
    unittest.main()

#  sh 'python --version tests/measure_url_response.py'
