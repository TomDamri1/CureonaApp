from flask import jsonify
from flask_restful import reqparse, Resource

from server.help_funcs import *

db_business = new_db["business_info"]
db_login = new_db["login"]
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


remove_worker_account_parser = reqparse.RequestParser()
remove_worker_account_parser.add_argument('username', required=True, help="username name cannot be blank!")
remove_worker_account_parser.add_argument('worker_name', required=True, help="worker_name name cannot be blank!")

class RemoveMyWorkers(Resource):

    def post(self):
        data = remove_worker_account_parser.parse_args()
        print(data)
        businessInfo = db_business.find_one({"username": data["username"]})
        # check if there are queues for the customer
        if not businessInfo:
            return {'state': "fail, the username is not exist(not a business owner)."}
        deleted_from_business_array = db_business.update({'username': data["username"]}, {'$pull': {"workers": data["worker_name"]}})
        deleted_from_login_array = db_login.delete_one({"username": data["worker_name"]})
        ret_val = dict()
        ret_val["state"] = 'success' if deleted_from_business_array['nModified'] or deleted_from_login_array['nModified'] else 'fail'
        return jsonify(ret_val)
