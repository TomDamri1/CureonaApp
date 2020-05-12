import unittest
import requests


class TestUserRegistration(unittest.TestCase):
    # register with user name that already exist

    def test_Registration(self):
        url = 'https://curona.herokuapp.com/Registration'
        myobj = {'username': 'tal', 'password': '123', 'type': 'customer'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'state': 'user name already exist'})

    def test_Registration_business_owner_already_exist(self):
        url = 'https://curona.herokuapp.com/RegisterBusiness'
        myobj = {'username': "test111123123", 'password': "123123111123", 'business_name': "IKEA",
                 'address': "balfor 24/1", 'company_id': "123"}
        response = requests.post(url, data=myobj)
        except_result = {'message': {'search_key': 'search key cannot be blank!'}}
        self.assertEqual(response.json(), except_result)

    def test_Registration_worker_already_exist(self):
        url = 'https://curona.herokuapp.com/RegistrationWorker'
        myobj = {'company_id': "123", 'password': "test"}
        response = requests.post(url, data=myobj)
        except_result = "success"
        self.assertEqual(response.json()["state"], except_result)


if __name__ == '__main__':
    unittest.main()
