from flask import jsonify
from flask_restful import reqparse, Resource

from server.mongo_connection import *

new_col = new_db["login"]

Login_parser = reqparse.RequestParser()
Login_parser.add_argument('username')
Login_parser.add_argument('password')


class Login(Resource):
    def post(self):
        data = Login_parser.parse_args()
        print(data)
        json_doc = new_col.find_one({"user_name": data['username']})
        if json_doc:
            if data.password == json_doc['password']:
                return jsonify({'state': 'success', 'type': json_doc['type']})
            else:
                return jsonify({'state': 'failed'})
        else:
            return jsonify({'state': 'failed'})