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

        return jsonify(data)
