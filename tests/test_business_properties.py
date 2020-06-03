import unittest
import requests


class TestUserUpdateSettings(unittest.TestCase):

    def test_Change_amount_of_people_in_a_business(self):
        url = 'https://curona.herokuapp.com/businessSettings'
        myobj = {'company_id': '1', 'max_capacity': 100}
        response = requests.post(url, data=myobj)
        expect_result = {"max_capacity": "no changes", "open_hours": "no changes"}
        self.assertEqual(response.json(), expect_result)

    def test_close_open_business_admin(self):
        url = 'https://curona.herokuapp.com/businessSettings'
        myobj = {'company_id': '1', 'open': 'True'}
        response = requests.post(url, data=myobj)
        expect_result = {"max_capacity": "no changes", "open": "no changes", "open_hours": "no changes"}
        self.assertEqual(response.json(), expect_result)

    def test_update_settings_for_business(self):
        url = 'https://curona.herokuapp.com/businessSettings'
        myobj = {"company_id": "IsNotExist"}
        response = requests.post(url, data=myobj)
        except_result = {"state": "company id was not found"}
        self.assertEqual(response.json(), except_result)

    def test_get_list_of_businesses(self):
        url = 'https://curona.herokuapp.com/getBusinesses'
        requests.post(url)
        response = requests.post(url)
        self.assertNotEqual(response.json(), {})

    def test_get_my_workers_not_empty(self):
        url = 'https://curona.herokuapp.com/GetMyWorkers'
        myobj = {"username": "test"}
        response = requests.post(url, data=myobj)
        self.assertTrue(response.json())

    def test_get_my_workers_empty(self):
        url = 'https://curona.herokuapp.com/GetMyWorkers'
        myobj = {"username": "IsNotExist"}
        response = requests.post(url, data=myobj)
        except_result = {'state': "fail, the username is not exist(not a business owner)."}
        self.assertEqual(except_result, response.json())

    def test_remove_worker(self):
        url = 'https://curona.herokuapp.com/RemoveWorkers'
        myobj = {"username": "IsNotExist", "worker_name": "aaa"}
        response = requests.post(url, data=myobj)
        except_result = {'state': "fail, the username is not exist(not a business owner)."}
        self.assertEqual(response.json(), except_result)

    def test_set_business_msg(self):
        url = 'https://curona.herokuapp.com/UpdateMyMessage'
        myobj = {"company_id": "123", "msg": "test msg"}
        response = requests.post(url, data=myobj)
        except_result = {'state': "success"}
        self.assertEqual(response.json(), except_result)

    def test_set_unexist_business_msg(self):
        url = 'https://curona.herokuapp.com/UpdateMyMessage'
        myobj = {"company_id": "IsNotExist", "msg": "test msg"}
        response = requests.post(url, data=myobj)
        except_result = {'state': "fail, the company_id is not exist."}
        self.assertEqual(response.json(), except_result)

if __name__ == '__main__':
    unittest.main()
