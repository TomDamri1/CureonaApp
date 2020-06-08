from flask import jsonify
from flask_restful import reqparse, Resource

from server.help_funcs import *

my_queue = testDB["user_queue"]

GetMyQueue_parser = reqparse.RequestParser()
GetMyQueue_parser.add_argument('username', required=True, help="username name cannot be blank!")


class GetMyQueue(Resource):

    def post(self):
        data = GetMyQueue_parser.parse_args()
        print(data)
        user_queues = my_queue.find_one({"username": data["username"]})
        # check if there are queues for the customer
        if not user_queues:
            empty = list()
            return jsonify(empty)
        orders = user_queues["orders"]
        future_queue = list()
        current_date = datetime.date.today()
        # filter only the future queues
        for order in orders:
            order_date = datetime.datetime.strptime(order[1], '%d-%m-%Y').date()
            if order_date >= current_date:
                future_queue.append(order)
        # sort date list
        future_queue.sort(key=lambda x: datetime.datetime.strptime(x[1], '%d-%m-%Y'))
        # return sorted list
        return jsonify(future_queue)
