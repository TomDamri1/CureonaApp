from flask import jsonify
from flask_restful import reqparse, Resource

from server.help_funcs import *

db_business = new_db["business_info"]

get_my_workers_parser = reqparse.RequestParser()
get_my_workers_parser.add_argument('username', required=True, help="username name cannot be blank!")


class GetMyWorkers(Resource):

    def post(self):
        data = get_my_workers_parser.parse_args()
        print(data)
        businessInfo = db_business.find_one({"username": data["username"]})
        # check if there are queues for the customer
        if not businessInfo:
            return {'state': "fail, the username is not exist(not a business owner)."}
        my_workers = businessInfo["workers"]
        return jsonify(my_workers)
