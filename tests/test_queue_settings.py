import unittest
import requests


class TestUserUpdateSettings(unittest.TestCase):

    def test_get_two_queue_to_same_place_at_same_time(self):
        url = 'https://curona.herokuapp.com/businessSettings'
        myobj = {'company_id': '123', 'open': 'True'}
        requests.post(url, data=myobj)
        url = 'https://curona.herokuapp.com/GetQueue'
        myobj = {"username": "c_test", 'company_id': '123', "BusinessName": "IKEA", "Day": "wednesday", "Hour": "15:00"}
        requests.post(url, data=myobj)
        response = requests.post(url, data=myobj)
        except_result = {"state": "success, sorry you can not get two queue to the same hour"}
        self.assertEqual(response.json(), except_result)

    def test_get_queue_to_closed_business(self):
        url = 'https://curona.herokuapp.com/businessSettings'
        myobj = {'company_id': '123', 'open': 'False'}
        requests.post(url, data=myobj)
        url = 'https://curona.herokuapp.com/GetQueue'
        myobj = {"username": "c_test", 'company_id': '123', "BusinessName": "IKEA", "Day": "wednesday",
                 "Hour": "15:00"}
        response = requests.post(url, data=myobj)
        except_result = {"state": "success, Business is closed"}
        myobj = {'company_id': '123', 'open': 'True'}
        requests.post(url, data=myobj)
        self.assertEqual(response.json(), except_result)

    def test_get_my_queue(self):
        url = 'https://curona.herokuapp.com/GetMyQueue'
        myobj = {"username": "IsNotExist"}
        response = requests.post(url, data=myobj)
        except_result = list()
        self.assertNotEqual(response, except_result)

    def test_lets_user_into_business_with_not_exist_code(self):
        url = 'https://curona.herokuapp.com/LetsUserIntoBusiness'
        myobj = {"company_id": "123", "key": "1234"}
        response = requests.post(url, data=myobj)
        except_result = {'state': 'failed'}
        self.assertNotEqual(except_result, response)

    def test_lets_user_into_business_with_not_exist_code(self):
        url = 'https://curona.herokuapp.com/LetsUserIntoBusiness'





if __name__ == '__main__':
    unittest.main()
