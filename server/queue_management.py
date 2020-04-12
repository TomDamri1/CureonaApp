from flask import jsonify
from flask_restful import reqparse, Resource
from server.mongo_connection import *
import random
import string

Queue = new_db["user_queue"]

GetQueue_parser = reqparse.RequestParser()
GetQueue_parser.add_argument('username', required=True, help="username name cannot be blank!")
GetQueue_parser.add_argument('BusinessName', required=True, help="business name cannot be blank!")
GetQueue_parser.add_argument('Date', required=True, help="Date cannot be blank!")


class GetQueue(Resource):

    def random_string(self, stringLength=4):
        """Generate a random string of fixed length """
        letters = string.ascii_lowercase
        return ''.join(random.choice(letters) for i in range(stringLength))

    def post(self):
        data = GetQueue_parser.parse_args()
        print(data)
        queue_key = self.random_string(4)
        print(queue_key)
        json_doc = Queue.find_one({"username": data['username']})
        if json_doc:
            # add queue to customer
            order = [data['BusinessName'], data['Date'], queue_key]
            print(order)
            Queue.update({'username': data['username']}, {"$push": {'orders': order}})
            return jsonify({'state': 'success'})
        # make the first queue
        orders = []
        orders.append([data['BusinessName'], data['Date'], queue_key])
        # print(orders)
        userQueue = {"username": data['username'], "orders": orders}
        # print(userQueue)
        Queue.insert_one(userQueue)
        return jsonify({'state': 'success'})

