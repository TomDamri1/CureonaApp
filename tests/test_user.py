import unittest

import requests


class TestUser(unittest.TestCase):
    # register with user name that already exist
    def test_Registration(self):
        url = 'https://cureona.herokuapp.com/Registration'
        myobj = {'username': 'tal', 'password': '123', 'type': 'customer'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'state': 'user name already exist'})

    def test_Login_success(self):
        url = 'https://cureona.herokuapp.com/Login'
        myobj = {'username': 'c', 'password': '123456'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'state': 'success', 'type': 'admin'})

    def testLoginFailedWrongPassword(self):
        url = 'https://cureona.herokuapp.com/Login'
        myobj = {'username': 'c', 'password': '1234'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'state': 'failed'})

    def test_Login_Failed_user_not_exist(self):
        url = 'https://cureona.herokuapp.com/Login'
        myobj = {'username': 'asdfasdf', 'password': '1234'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'state': 'failed'})

    # ---------------------------------------------------------------------
    # business owner
    def test_Login_Failed_business_owner_not_exist(self):
        url = 'https://cureona.herokuapp.com/Login'
        myobj = {'username': 'asdfasdf', 'password': '1234'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'state': 'failed'})

    def test_Login_Failed_business_owner_wrong_password(self):
        url = 'https://cureona.herokuapp.com/Login'
        myobj = {'username': 'bo', 'password': '12344'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'state': 'failed'})

    def test_Login_success_business_owner(self):
        url = 'https://cureona.herokuapp.com/Login'
        myobj = {'username': 'bo', 'password': '123456'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'state': 'success', 'type': 'business_owner'})

    def test_Registration_business_owner(self):
        url = 'https://cureona.herokuapp.com/RegisterBusiness'
        myobj = {'username': 'bo', 'password': '987', 'type':
            'business_owner', 'BusinessName': 'shufersal', 'CompanyId': '15951'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'state': 'user name or cid already exist'})

    # ---------------------------------------------------------------------
    # admin login checks
    def test_Login_Failed_admin_not_exist(self):
        url = 'https://cureona.herokuapp.com/Login'
        myobj = {'username': 'asdfasdf', 'password': '1234'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'state': 'failed'})

    def test_Login_Failed_admin_wrong_password(self):
        url = 'https://cureona.herokuapp.com/Login'
        myobj = {'username': 'admin', 'password': '12344'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'state': 'failed'})

    def test_Login_success_admin(self):
        url = 'https://cureona.herokuapp.com/Login'
        myobj = {'username': 'admin', 'password': '123456'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'state': 'success', 'type': 'admin'})

    # ---------------------------------------------------------------------
    # admin abillities checks
    def test_Change_amount_of_people_in_a_business(self):
        url = 'https://cureona.herokuapp.com/businessSettings'
        myobj = {'company_id' : '1', 'max_capacity' : '100'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {"max_capacity": "updated"})
        myobj = {'company_id' : '1', 'max_capacity' : '101'}
        response = requests.post(url, data=myobj)
        
        
    def test_close_open_business_admin(self):
        url = 'https://cureona.herokuapp.com/businessSettings'
        myobj = {'company_id': '1', 'open': 'True'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'open': 'updated'})    

if __name__ == '__main__':
    unittest.main()
