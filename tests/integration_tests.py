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

if __name__ == '__main__':
    unittest.main()
