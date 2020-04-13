from flask import jsonify
from flask_restful import reqparse, Resource
from server.mongo_connection import *

user_queue = new_db["user_queue"]
business_info = new_db["business_info"]
login = new_db["login"]

business_settings = new_db["business_info"]



updateSettings_parser = reqparse.RequestParser()

updateSettings_parser.add_argument('company_id', required=True, help="company id cannot be blank!")
updateSettings_parser.add_argument('open', required=True, help="open cannot be blank!")
updateSettings_parser.add_argument('open_hours', required=True, help="opening hours cannot be blank!")


class updateSettings(Resource):

    def post(self):

        data = updateSettings_parser.parse_args()

        json_doc = business_settings.find_one({"company_id": data['company_id']})

        if json_doc:
            business_open = data['open']
            open_hours = data['opening_hours']

            #if valid:
            business_settings.update({'company_id': data['company_id']},
                                     {"$set":{"open": business_open ,
                                              "open_hours" :open_hours}})

            print(business_open)
            print(open_hours)

