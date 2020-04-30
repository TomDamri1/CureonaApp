import unittest

import requests


class TestUser(unittest.TestCase):
    # register with user name that already exist
    def test_Registration(self):
        url = 'https://curona.herokuapp.com/Registration'
        myobj = {'username': 'tal', 'password': '123', 'type': 'customer'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'state': 'user name already exist'})

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
        self.assertEqual(response.json(), {'state': 'success', 'type': 'business_owner'})

    def test_Registration_business_owner_already_exist(self):
        url = 'https://curona.herokuapp.com/RegisterBusiness'
        search_key = dict()
        search_key['keys'] = ["Furniture"]
        myobj = {'username': "test111123123", 'password': "123123111123", 'business_name': "IKEA",
                 'address': "balfor 24/1", "search_key": search_key, 'company_id': "123"}
        response = requests.post(url, data=myobj)
        except_result = {"state": "user name or cid already exist"}
        self.assertEqual(response.json(), except_result)

    # ---------------------------------------------------------------------
    # worker
    def test_Registration_worker_already_exist(self):
        url = 'https://curona.herokuapp.com/RegistrationWorker'
        myobj = {'company_id': "123", 'password': "test"}
        response = requests.post(url, data=myobj)
        except_result = "success"
        self.assertEqual(response.json()["state"], except_result)

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

    # ---------------------------------------------------------------------
    # admin abilities checks
    def test_Change_amount_of_people_in_a_business(self):
        url = 'https://curona.herokuapp.com/businessSettings'
        myobj = {'company_id': '1', 'max_capacity': 100}
        response = requests.post(url, data=myobj)
        expect_result = {
            "max_capacity": "no changes",
            "open_hours": "no changes"
        }
        self.assertEqual(response.json(), expect_result)

    def test_close_open_business_admin(self):
        url = 'https://curona.herokuapp.com/businessSettings'
        myobj = {'company_id': '1', 'open': 'True'}
        response = requests.post(url, data=myobj)
        expect_result = {
                        "max_capacity": "no changes",
                        "open": "no changes",
                        "open_hours": "no changes"
                    }
        self.assertEqual(response.json(), expect_result)

    # ---------------------------------------------------------------------
    # gets a queue checks

    def test_get_two_queue_to_same_place_at_same_time(self):
        url = 'https://curona.herokuapp.com/businessSettings'
        myobj = {'company_id': '123', 'open': 'True'}
        requests.post(url, data=myobj)
        url = 'https://curona.herokuapp.com/GetQueue'
        myobj = {"username": "c_test", "BusinessName": "IKEA", "Day": "wednesday", "Hour": "15:00-16:00"}
        requests.post(url, data=myobj)
        response = requests.post(url, data=myobj)
        except_result = {"state": "success, sorry you can not get two queue to the same hour"}
        self.assertEqual(response.json(), except_result)

    def test_get_queue_to_closed_business(self):
        url = 'https://curona.herokuapp.com/businessSettings'
        myobj = {'company_id': '123', 'open': 'False'}
        requests.post(url, data=myobj)
        url = 'https://curona.herokuapp.com/GetQueue'
        myobj = {"username": "c_test", "BusinessName": "IKEA", "Day": "wednesday", "Hour": "15:00-16:00"}
        response = requests.post(url, data=myobj)
        except_result = {"state": "success, Business is closed"}
        myobj = {'company_id': '123', 'open': 'True'}
        requests.post(url, data=myobj)
        self.assertEqual(response.json(), except_result)

    # ---------------------------------------------------------------------

    def test_get_list_of_businesses(self):
        url = 'https://curona.herokuapp.com/getBusinesses'
        requests.post(url)
        response = requests.post(url)
        self.assertNotEqual(response.json(), {})

    # ---------------------------------------------------------------------

    def test_update_settings_for_business(self):
        url = 'https://curona.herokuapp.com/businessSettings'
        myobj = {"company_id": "123", "open_hours": {"tuesday": ["08:30-16:30", "19:30-22:30"]}}
        response = requests.post(url, myobj)
        except_result={
                            "affected_costumers": "no effect",
                            "max_capacity": "no changes",
                            "open_hours": "updated"
                        }
        self.assertEqual(response.json(), except_result)

    # ---------------------------------------------------------------------
    # my queue
    def test_get_my_queue(self):
        url = 'https://curona.herokuapp.com/GetMyQueue'
        myobj = {"username": "IsNotExist"}
        response = requests.post(url, data=myobj)
        except_result = list()
        self.assertNotEqual(response, except_result)

if __name__ == '__main__':
    unittest.main()
