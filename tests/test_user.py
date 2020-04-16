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
        myobj = {'company_id': '1', 'max_capacity': '100'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {"max_capacity": "updated"})
        myobj = {'company_id': '1', 'max_capacity': '101'}
        response = requests.post(url, data=myobj)

    def test_close_open_business_admin(self):
        url = 'https://cureona.herokuapp.com/businessSettings'
        myobj = {'company_id': '1', 'open': 'True'}
        response = requests.post(url, data=myobj)
        self.assertEqual(response.json(), {'open': 'updated'})
    # ---------------------------------------------------------------------
    # gets a queue checks
    def test_gets_available_queue_for_empty_queue(self):
        url = 'https://cureona.herokuapp.com/AvailableQueues'
        myobj = {"company_id": "1"}
        response = requests.post(url, data=myobj)
        except_result = {'queue': {'friday': ['08:00-09:00',
                                              '09:00-10:00',
                                              '10:00-11:00',
                                              '11:00-12:00',
                                              '12:00-13:00',
                                              '13:00-14:00',
                                              '14:00-15:00',
                                              '15:00-16:00',
                                              '16:00-17:00',
                                              '17:00-18:00',
                                              '18:00-19:00',
                                              '19:00-20:00',
                                              '20:00-21:00',
                                              '21:00-22:00',
                                              '22:00-23:00',
                                              '23:00-00:00',
                                              '00:00-01:00',
                                              '01:00-02:00',
                                              '02:00-03:00',
                                              '03:00-04:00',
                                              '04:00-05:00',
                                              '05:00-06:00',
                                              '06:00-07:00',
                                              '07:00-08:00'],
                                   'monday': ['08:00-09:00',
                                              '09:00-10:00',
                                              '10:00-11:00',
                                              '11:00-12:00',
                                              '12:00-13:00',
                                              '13:00-14:00',
                                              '14:00-15:00',
                                              '15:00-16:00',
                                              '16:00-17:00',
                                              '17:00-18:00',
                                              '18:00-19:00',
                                              '19:00-20:00',
                                              '20:00-21:00',
                                              '21:00-22:00',
                                              '22:00-23:00',
                                              '23:00-00:00',
                                              '00:00-01:00',
                                              '01:00-02:00',
                                              '02:00-03:00',
                                              '03:00-04:00',
                                              '04:00-05:00',
                                              '05:00-06:00',
                                              '06:00-07:00',
                                              '07:00-08:00'],
                                   'saturday': ['08:00-09:00',
                                                '09:00-10:00',
                                                '10:00-11:00',
                                                '11:00-12:00',
                                                '12:00-13:00',
                                                '13:00-14:00',
                                                '14:00-15:00',
                                                '15:00-16:00',
                                                '16:00-17:00',
                                                '17:00-18:00',
                                                '18:00-19:00',
                                                '19:00-20:00',
                                                '20:00-21:00',
                                                '21:00-22:00',
                                                '22:00-23:00',
                                                '23:00-00:00',
                                                '00:00-01:00',
                                                '01:00-02:00',
                                                '02:00-03:00',
                                                '03:00-04:00',
                                                '04:00-05:00',
                                                '05:00-06:00',
                                                '06:00-07:00',
                                                '07:00-08:00'],
                                   'sunday': ['08:00-09:00',
                                              '09:00-10:00',
                                              '10:00-11:00',
                                              '11:00-12:00',
                                              '12:00-13:00',
                                              '13:00-14:00',
                                              '14:00-15:00',
                                              '15:00-16:00',
                                              '16:00-17:00',
                                              '17:00-18:00',
                                              '18:00-19:00',
                                              '19:00-20:00',
                                              '20:00-21:00',
                                              '21:00-22:00',
                                              '22:00-23:00',
                                              '23:00-00:00',
                                              '00:00-01:00',
                                              '01:00-02:00',
                                              '02:00-03:00',
                                              '03:00-04:00',
                                              '04:00-05:00',
                                              '05:00-06:00',
                                              '06:00-07:00',
                                              '07:00-08:00'],
                                   'thursday': ['09:00-10:00',
                                                '11:00-12:00',
                                                '12:00-13:00',
                                                '13:00-14:00',
                                                '14:00-15:00',
                                                '15:00-16:00',
                                                '16:00-17:00',
                                                '17:00-18:00',
                                                '18:00-19:00',
                                                '19:00-20:00',
                                                '20:00-21:00',
                                                '21:00-22:00',
                                                '22:00-23:00',
                                                '23:00-00:00',
                                                '00:00-01:00',
                                                '01:00-02:00',
                                                '02:00-03:00',
                                                '03:00-04:00',
                                                '04:00-05:00',
                                                '05:00-06:00',
                                                '06:00-07:00',
                                                '07:00-08:00'],
                                   'tuesday': ['08:00-09:00',
                                               '09:00-10:00',
                                               '10:00-11:00',
                                               '11:00-12:00',
                                               '12:00-13:00',
                                               '13:00-14:00',
                                               '14:00-15:00',
                                               '15:00-16:00',
                                               '16:00-17:00',
                                               '17:00-18:00',
                                               '18:00-19:00',
                                               '19:00-20:00',
                                               '20:00-21:00',
                                               '21:00-22:00',
                                               '22:00-23:00',
                                               '23:00-00:00',
                                               '00:00-01:00',
                                               '01:00-02:00',
                                               '02:00-03:00',
                                               '03:00-04:00',
                                               '04:00-05:00',
                                               '05:00-06:00',
                                               '06:00-07:00',
                                               '07:00-08:00'],
                                   'wednesday': ['09:00-10:00',
                                                 '11:00-12:00',
                                                 '12:00-13:00',
                                                 '14:00-15:00',
                                                 '15:00-16:00',
                                                 '16:00-17:00',
                                                 '17:00-18:00',
                                                 '18:00-19:00',
                                                 '19:00-20:00',
                                                 '20:00-21:00',
                                                 '21:00-22:00',
                                                 '22:00-23:00',
                                                 '23:00-00:00',
                                                 '00:00-01:00',
                                                 '01:00-02:00',
                                                 '02:00-03:00',
                                                 '03:00-04:00',
                                                 '04:00-05:00',
                                                 '05:00-06:00',
                                                 '06:00-07:00',
                                                 '07:00-08:00']},
                         'state': 'success'}
        self.assertEqual(response.json(), except_result)
        # ---------------------------------------------------------------------
        # gets a queue checks

    def test_get_two_queue_to_same_place_at_same_time(self):
        url = 'https://cureona.herokuapp.com/GetQueue'
        myobj = {"username": "c_test", "BusinessName": "IKEA", "Day": "wednesday", "Hour": "15:00-16:00"}
        requests.post(url, data=myobj)
        response = requests.post(url, data=myobj)
        except_result ={"state": "success, sorry you can not get two queue to the same hour"}
        self.assertEqual(response.json(), except_result)

    def test_get_queue_to_closed_business(self):
        url = 'https://cureona.herokuapp.com/businessSettings'
        myobj = {'company_id': '123', 'open': 'False'}
        requests.post(url, data=myobj)
        url = 'https://cureona.herokuapp.com/GetQueue'
        myobj = {"username": "c_test", "BusinessName": "IKEA", "Day": "wednesday", "Hour": "15:00-16:00"}
        response = requests.post(url, data=myobj)
        except_result = {"state": "success, Business is closed"}
        myobj = {'company_id': '123', 'open': 'True'}
        requests.post(url, data=myobj)
        self.assertEqual(response.json(), except_result)

if __name__ == '__main__':
    unittest.main()
