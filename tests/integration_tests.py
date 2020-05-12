import unittest

import requests


class TestUser(unittest.TestCase):
    # register with user name that already exist and login with this user.
    def test_Registration(self):
        url = 'https://curona.herokuapp.com/Registration'
        myobj = {'username': 'tal', 'password': '123', 'type': 'customer'}
        requests.post(url, data=myobj)

        url = 'https://curona.herokuapp.com/Login'
        myobj = {'username': 'tal', 'password': '123'}
        response = requests.post(url, data=myobj)

        self.assertEqual(response.json(), {'state': 'success', 'type': 'customer'})

        # login and order a queue.
    def test_login_and_order_queue(self):
        url = 'https://curona.herokuapp.com/Login'
        myobj = {'username': 'tal', 'password': '123'}
        response = requests.post(url, data=myobj)

        url = 'https://curona.herokuapp.com/GetQueue'
        myobj = {"username": "tal", 'company_id': '123', "BusinessName": "IKEA", "Day": "wednesday",
                 "Hour": "15:00"}
        response = requests.post(url, data=myobj)
        except_result = {"state": "failed, sorry you can not get two queue to the same hour"}
        self.assertEqual(response.json(), except_result)

    def test_get_two_queue_to_same_place_at_same_time(self):
        url = 'https://curona.herokuapp.com/businessSettings'
        myobj = {'company_id': '123', 'open': 'True'}
        requests.post(url, data=myobj)
        url = 'https://curona.herokuapp.com/GetQueue'
        myobj = {"username": "c_test", 'company_id': '123', "BusinessName": "IKEA", "Day": "wednesday", "Hour": "15:00"}
        requests.post(url, data=myobj)
        response = requests.post(url, data=myobj)
        except_result = {"state": "failed, sorry you can not get two queue to the same hour"}
        self.assertEqual(response.json(), except_result)

    def test_get_queue_to_closed_business(self):
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
        url = 'https://cureona.herokuapp.com/RegisterBusiness'
        myobj = {'username': 'b123', 'password': '121212', 'type': 'business_owner', 'BusinessName': 'Zara', 'CompanyId': '345678'}
        requests.post(url, data=myobj)
        url = 'https://curona.herokuapp.com/AvailableQueues'
        myobj = {'CompanyId': '345678'}
        response = requests.post(url, data=myobj)
        except_result = {'state': 'success', 'queue': {'sunday': [], 'monday': [], 'tuesday': [], 'wednesday': [],
                                                          'thursday': [], 'friday': [], 'saturday': []}}
        self.assertEqual(response.json(), except_result)

    def test_change_max_capacity_and_schedule_an_appointment(self):
        url = 'https://cureona.herokuapp.com/businessSettings'
        myobj = {'company_id':'1', 'max_capacity': 1}
        requests.post(url, data=myobj)
        url = 'https://curona.herokuapp.com/GetQueue'
        myobj = {"username": "c_test", 'company_id': '123', "BusinessName": "IKEA", "Day": "wednesday", "Hour": "15:00"}
        response = requests.post(url, data=myobj)
        myobj = {"username": "tal", 'company_id': '123', "BusinessName": "IKEA", "Day": "wednesday", "Hour": "15:00"}
        response = requests.post(url, data=myobj)
        except_result = {'state': 'failed, sorry the queue is full'}
        self.assertEqual(response.json(), except_result)

if __name__ == '__main__':
    unittest.main()
