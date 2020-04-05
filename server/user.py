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
        if data.password == json_doc['password']:
            return jsonify({'state': 'success', 'type': json_doc['type']})
        else:
            return jsonify({'state': 'failed'})



Registration_parser = reqparse.RequestParser()
Registration_parser.add_argument('user_name', required=True, help="user_name cannot be blank!")
Registration_parser.add_argument('password', required=True, help="password cannot be blank!")
Registration_parser.add_argument('type', required=True, help="type cannot be blank!")


class Registration(Resource):

    def post(self):
        data = Registration_parser.parse_args()
        # search user with the same user name.
        json_doc = new_col.find_one({"user_name": data['user_name']})
        # if user with the same user name is not exist, create new user.
        if not json_doc:
            # print(data)
            # print(data['type'])
            # print(data)
            new_col.insert_one(data)
            return jsonify({'state': 'success'})
        # if user with the same user name is exist, return to server that: 'user name already exist'.
        return jsonify({'state': 'user name already exist'})
