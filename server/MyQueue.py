import datetime

from flask import jsonify
from flask_restful import reqparse, Resource

from server.help_funcs import *

my_queue = new_db["user_queue"]

GetMyQueue_parser = reqparse.RequestParser()
GetMyQueue_parser.add_argument('username', required=True, help="username name cannot be blank!")


class GetMyQueue(Resource):

    def post(self):
        data = GetMyQueue_parser.parse_args()
        print(data)
        user_queues = my_queue.find_one({"username": data["username"]})
        if not user_queues:
            empty = list()
            return jsonify(empty)
        orders = user_queues["orders"]
        print(orders)
        future_queue = list()
        current_date = datetime.datetime.today()
        for order in orders:
            #print(order[1])
            order_date = datetime.datetime.strptime(order[1], '%d-%m-%Y')
            print(current_date)
            print(order_date)
            print(order_date >= current_date)
            if order_date >= current_date:
                print(order[1])
                future_queue.append(order)
        future_queue.sort()
        return jsonify(future_queue)
