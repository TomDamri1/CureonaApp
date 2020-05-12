import unittest
import requests


class TestUserLogin(unittest.TestCase):

    def test_Login_success(self):
        url = 'https://curona.herokuapp.com/Login'
        myobj = {'username': 'c_test', 'password': '123'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'state': 'success', 'type': 'customer'})

    def testLoginFailedWrongPassword(self):
        url = 'https://curona.herokuapp.com/Login'
        myobj = {'username': 'c', 'password': '1234'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'state': 'failed'})

    def test_Login_Failed_user_not_exist(self):
        url = 'https://curona.herokuapp.com/Login'
        myobj = {'username': 'asdfasdf', 'password': '1234'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'state': 'failed'})

# ---------------------------------------------------------------------
# business owner

    def test_Login_Failed_business_owner_not_exist(self):
        url = 'https://curona.herokuapp.com/Login'
        myobj = {'username': 'asdfasdf', 'password': '1234'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'state': 'failed'})

    def test_Login_Failed_business_owner_wrong_password(self):
        url = 'https://curona.herokuapp.com/Login'
        myobj = {'username': 'bo', 'password': '12344'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'state': 'failed'})

    def test_Login_success_business_owner(self):
        url = 'https://curona.herokuapp.com/Login'
        myobj = {'username': 'test', 'password': '123'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'state': 'success', "company_id": "123", 'type': 'business_owner'})



    # ---------------------------------------------------------------------
    # admin login checks
    def test_Login_Failed_admin_not_exist(self):
        url = 'https://curona.herokuapp.com/Login'
        myobj = {'username': 'asdfasdf', 'password': '1234'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'state': 'failed'})

    def test_Login_Failed_admin_wrong_password(self):
        url = 'https://curona.herokuapp.com/Login'
        myobj = {'username': 'admin', 'password': '12344'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'state': 'failed'})

    def test_Login_success_admin(self):
        url = 'https://curona.herokuapp.com/Login'
        myobj = {'username': 'admin', 'password': '123456'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'state': 'success', 'type': 'admin'})

    def test_Login_worked(self):
        url = 'https://curona.herokuapp.com/Login'
        myobj = {'username': 'vcbfrd', 'password': '123'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {"company_id": "123","company_name": "IKEA",
                                           "state": "success","type": "worker"})
if __name__ == '__main__':
    unittest.main()
