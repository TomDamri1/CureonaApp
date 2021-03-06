from flask import jsonify
from flask_restful import reqparse, Resource
import string
import random
from server.apps_calendar import *
from server.mongo_connection import *
from server.help_funcs import *
import hashlib

new_col = testDB["login"]
business_info = testDB["business_info"]

Login_parser = reqparse.RequestParser()
Login_parser.add_argument('username', required=True, help="username cannot be blank!")
Login_parser.add_argument('password', required=True, help="password cannot be blank!")


class Login(Resource):

    def post(self):
        data = Login_parser.parse_args()
        json_doc = new_col.find_one({"username": data['username']})
        if json_doc:
            print(json_doc)
            sha_encrypt = hashlib.sha256(data.password.encode()).hexdigest()
            print(sha_encrypt)
            print(json_doc['password'])
            if sha_encrypt == json_doc['password']:
                if json_doc['type'] == "business_owner":
                    my_business_info = business_info.find_one({"username": data['username']})
                    return jsonify(
                        {'state': 'success', 'type': json_doc['type'], 'company_id': my_business_info['company_id'],
                         'business_name': my_business_info['business_name']})

                if json_doc['type'] == "worker":
                    cid = json_doc['company_id']
                    company_name = business_info.find_one({"company_id": cid})['business_name']
                    return jsonify(
                        {'state': 'success', 'type': json_doc['type'],
                         'company_name': company_name, 'company_id': json_doc['company_id']})
                return jsonify({'state': 'success', 'type': json_doc['type']})
            else:
                return jsonify({'state': 'failed'})
        return jsonify({'state': 'failed'})


Registration_parser = reqparse.RequestParser()
Registration_parser.add_argument('username', required=True, help="user_name cannot be blank!")
Registration_parser.add_argument('password', required=True, help="password cannot be blank!")
Registration_parser.add_argument('type', required=True, help="type cannot be blank!")


class Registration(Resource):

    def post(self):
        data = Registration_parser.parse_args()
        # search user with the same user name.
        json_doc = new_col.find_one({"username": data['username']})
        # if user with the same user name is not exist, create new user.
        if not json_doc:
            # print(data)
            # print(data['type'])
            if data['type'] == 'business_owner':
                data['workers'] = []
            # print(data)
            data['password'] = hashlib.sha256(data.password.encode()).hexdigest()
            print(data['password'])
            new_col.insert_one(data)
            return jsonify({'state': 'success'})
        # if user with the same user name is exist, return to server that: 'user name already exist'.
        return jsonify({'state': 'user name already exist'})


RegisterBuisness_parser = reqparse.RequestParser()
RegisterBuisness_parser.add_argument('username', required=True, help="user_name cannot be blank!")
RegisterBuisness_parser.add_argument('password', required=True, help="password cannot be blank!")
RegisterBuisness_parser.add_argument('business_name', required=True, help="buisness name cannot be blank!")
RegisterBuisness_parser.add_argument('address', required=True, help="address cannot be blank!")
RegisterBuisness_parser.add_argument('company_id', required=True, help="Company id cannot be blank!")
RegisterBuisness_parser.add_argument('open_hours', type=dict, required=False, help="open hours cannot be blank!")
RegisterBuisness_parser.add_argument('search_key', type=dict, required=True, help="search key cannot be blank!")
RegisterBuisness_parser.add_argument('max_capacity', required=False, help="max capacity in integer")
RegisterBuisness_parser.add_argument('open_hours', type=dict, required=False, help="search_key cannot be blank!")
RegisterBuisness_parser.add_argument('minutes_intervals', type=int, required=False, help="if empty,time intervals=15")


class RegisterBusiness(Resource):

    def post(self):
        data = RegisterBuisness_parser.parse_args()
        print(data)
        # search user with the same user name.
        json_doc = new_col.find_one({"username": data['username']})
        CID = business_info.find_one({"company_id": data['company_id']})
        # if user with the same user name and CID is not exist, create new user.
        if not json_doc and not CID:
            login_dict, business_info_dict = {}, {}

            login_dict['username'] = data['username']
            login_dict['password'] = hashlib.sha256(data.password.encode()).hexdigest()
            login_dict['type'] = 'business_owner'

            business_info_dict['username'] = data['username']
            business_info_dict['current_amount'] = 0
            business_info_dict['business_name'] = data['business_name']
            business_info_dict['address'] = data['address']
            business_info_dict['company_id'] = data['company_id']
            business_info_dict['workers'] = []
            business_info_dict['open'] = True
            business_info_dict['search_key'] = data['search_key']['keys']
            if not data['minutes_intervals']:
                business_info_dict['minutes_intervals'] = 15
            else:
                business_info_dict['minutes_intervals'] = data['minutes_intervals']

            if not data['open_hours']:
                business_info_dict['open_hours'] = all_closed
                business_info_dict['queue'] = all_closed

            else:
                print(business_info_dict)
                business_info_dict['open_hours'] = data['open_hours']
                business_info_dict['queue'] = {}
                modifyWorkingHoursForDays(business_info_dict['queue'], data['open_hours'],business_info_dict['minutes_intervals'])

            # business_info_dict['open_hours'] = {'sunday': 'closed', 'monday': 'closed', 'tuesday': 'closed',
            #                                     'wednesday': 'closed', 'thursday': 'closed', 'friday': 'closed',
            #                                     'saturday': 'closed'}
            # business_info_dict['queue'] = my_calendar

            business_info_dict['max_capacity'] = data['max_capacity'] if data['max_capacity'] is not None else 10

            new_col.insert_one(login_dict)
            business_info.insert_one(business_info_dict)
            return jsonify({'state': 'success'})

        # if user with the same user name is exist, return to server that: 'user name already exist'.
        return jsonify({'state': 'user name or cid already exist'})


RegisterWorker_parser = reqparse.RequestParser()
RegisterWorker_parser.add_argument('password', required=True, help="password cannot be blank!")
RegisterWorker_parser.add_argument('company_id', required=True, help="Company id cannot be blank!")

letters = string.ascii_lowercase


def random_string(stringLength=4):
    """Generate a random string of fixed length """
    return ''.join(random.choice(letters) for i in range(stringLength))


class RegisterWorker(Resource):

    def post(self):
        data = RegisterWorker_parser.parse_args()
        print(data)
        username = random_string(6)
        # search user with the same user name.
        json_doc = new_col.find_one({"username": username})
        # check if user with the same user name already exist.
        while json_doc:
            username = random_string(6)
            # search user with the same user name.
            json_doc = new_col.find_one({"username": username})
        # if user with the same user name is not exist create new user.

        login_dict = {'username': username, 'password': hashlib.sha256(data.password.encode()).hexdigest(),
                      'company_id': data['company_id'], 'type': 'worker'}
        business_info.update({'company_id': data['company_id']},
                             {"$push": {"workers": username}})
        new_col.insert_one(login_dict)

        return jsonify({'state': 'success', 'username': username, 'password': data.password})


def delete_user(username):
    json_doc = new_col.find_one({"username": username})
    if json_doc:
        if json_doc["type"] == "customer":
            new_col.delete_one({"username": username})
        elif json_doc["type"] == "business_owner":
            new_col.delete_one({"username": username})
            business_info.delete_one({"username": username})
        return "deleted"
    return "username is not exist"
