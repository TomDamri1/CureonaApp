from flask import jsonify
from flask_restful import reqparse, Resource
from server.mongo_connection import *
import random
import string

Queue = new_db["user_queue"]

GetQueue_parser = reqparse.RequestParser()
GetQueue_parser.add_argument('username', required=True, help="username name cannot be blank!")
GetQueue_parser.add_argument('BusinessName', required=True, help="business name cannot be blank!")
GetQueue_parser.add_argument('Date', required=True, help="business name cannot be blank!")


class GetQueue(Resource):

    def random_string(stringLength=4):
        """Generate a random string of fixed length """
        letters = string.ascii_lowercase
        return ''.join(random.choice(letters) for i in range(stringLength))

    def post(self):
        data = GetQueue_parser.parse_args()
        queue_key = self.random_string(4)
        json_doc = Queue.find_one({"username": data['username']})
        if not json_doc:
            order = [json_doc['BusinessName'], json_doc['Date'], queue_key]

            print(order)
            # print(data['business_owner_username'])
            #Queue.update({'username': data['username']}, {"push": {'orders': order}})
            return jsonify({'state': 'success'})
