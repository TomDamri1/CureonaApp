import requests
import smtplib
import unittest


class TestURLs(unittest.TestCase):

    def test_Change_amount_of_people_in_a_business(self):
        url = 'https://curona.herokuapp.com/MeasureUrlsResponse'
        requests.post(url)
