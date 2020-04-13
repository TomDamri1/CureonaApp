from flask import jsonify
from flask_restful import reqparse, Resource
from server.mongo_connection import *
import random
import string

user_queue = new_db["user_queue"]
business_info = new_db["business_info"]
login = new_db["login"]

GetQueue_parser = reqparse.RequestParser()
GetQueue_parser.add_argument('username', required=True, help="username name cannot be blank!")
GetQueue_parser.add_argument('BusinessName', required=True, help="business name cannot be blank!")
GetQueue_parser.add_argument('Day', required=True, help="Date cannot be blank!")
GetQueue_parser.add_argument('Hour', required=True, help="Date cannot be blank!")

letters = string.ascii_lowercase


def random_string(stringLength=4):
    """Generate a random string of fixed length """

    return ''.join(random.choice(letters) for i in range(stringLength))


def calc_date(Date):
    """Generate a random string of fixed length """
    pass


class GetQueue(Resource):

    def post(self):
        data = GetQueue_parser.parse_args()
        print(data)
        queue_key = random_string(4)
        print(queue_key)
        json_doc = user_queue.find_one({"username": data['username']})
        if json_doc:
            # add queue to customer
            order = [data['BusinessName'], "30/4/2020", queue_key]
            print(order)
            user_queue.update({'username': data['username']}, {"$push": {'orders': order}})
            business_info.update({'business_name': data['BusinessName']},
                                 {"$push": {"queue." + data['Day'] + "." + data['Hour']: queue_key}})
            return jsonify({'state': 'success', 'key': queue_key})
        # make the first queue
        # check if user exist
        json_doc = login.find_one({"username": data['username']})
        if not json_doc:
            return jsonify({'state': 'User does not exist'})
        # create the first order
        orders = [[data['BusinessName'], "30/4/2020", queue_key]]
        # print(orders)
        userQueue = {"username": data['username'], "orders": orders}
        # print(userQueue)
        user_queue.insert_one(userQueue)
        return jsonify({'state': 'success', 'key': queue_key})


AvailableQueues_parser = reqparse.RequestParser()
AvailableQueues_parser.add_argument('company_id', required=True, help="company_id name cannot be blank!")


class AvailableQueues(Resource):
    def post(self):
        data = AvailableQueues_parser.parse_args()
        print(data)
        json_doc = business_info.find_one({"company_id": data['company_id']})
        return jsonify({'state': 'success', 'queue': json_doc['queue']})
