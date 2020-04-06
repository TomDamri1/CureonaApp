from flask import jsonify
from flask_restful import reqparse, Resource
from server.mongo_connection import *
import hashlib

new_col = new_db["login"]

Login_parser = reqparse.RequestParser()
Login_parser.add_argument('username')
Login_parser.add_argument('password')


class Login(Resource):
    def post(self):
        data = Login_parser.parse_args()
        json_doc = new_col.find_one({"username": data['username']})
        print(json_doc)
        sha_encrypt = hashlib.sha256(data.password.encode()).hexdigest()
        print(sha_encrypt)
        print(json_doc['password'])
        if sha_encrypt == json_doc['password']:
            return jsonify({'state': 'success', 'type': json_doc['type']})
        else:
            return jsonify({'state': 'failed'})



Registration_parser = reqparse.RequestParser()
Registration_parser.add_argument('username', required=True, help="user_name cannot be blank!")
Registration_parser.add_argument('password', required=True, help="password cannot be blank!")
Registration_parser.add_argument('type', required=True, help="type cannot be blank!")


class Registration(Resource):

    def post(self):
        data = Registration_parser.parse_args()
        # search user with the same user name.
        json_doc = new_col.find_one({"username": data['username']})
        # if user with the same user name is not exist, create new user.
        if not json_doc:
            # print(data)
            # print(data['type'])
            if data['type'] == 'business_owner':
                data['workers'] = []
            # print(data)
            data['password'] = hashlib.sha256(data.password.encode()).hexdigest()
            print(data['password'])
            new_col.insert_one(data)
            return jsonify({'state': 'success'})
        # if user with the same user name is exist, return to server that: 'user name already exist'.
        return jsonify({'state': 'user name already exist'})


RegisterBuisness_parser = reqparse.RequestParser()
RegisterBuisness_parser.add_argument('username', required=True, help="user_name cannot be blank!")
RegisterBuisness_parser.add_argument('password', required=True, help="password cannot be blank!")
RegisterBuisness_parser.add_argument('type', required=True, help="type cannot be blank!")
RegisterBuisness_parser.add_argument('BusinessName', required=True, help="buisness name cannot be blank!")
RegisterBuisness_parser.add_argument('CompanyId', required=True, help="Company id cannot be blank!")

class RegisterBusiness(Resource):

    def post(self):
        data = RegisterBuisness_parser.parse_args()
        # search user with the same user name.
        json_doc = new_col.find_one({"username": data['username']})
        CID = new_col.find_one({"CompanyId": data['CompanyId']})
        # if user with the same user name and CID is not exist, create new user.
        if not json_doc and not CID:
            data['password'] = hashlib.sha256(data.password.encode()).hexdigest()
            data['workers'] = []
            #TO-DO
            #add comprehnsion between CID of the owner and the data base of br7
            new_col.insert_one(data)
            return jsonify({'state': 'success'})
        # if user with the same user name is exist, return to server that: 'user name already exist'.
        return jsonify({'state': 'user name or cid already exist'})

