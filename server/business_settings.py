from flask import jsonify
from flask_restful import reqparse, Resource
from server.mongo_connection import *
from server.help_funcs import *

user_queue = new_db["user_queue"]
business_info = new_db["business_info"]
login = new_db["login"]

business_settings = new_db["business_info"]

updateSettings_parser = reqparse.RequestParser()

updateSettings_parser.add_argument('company_id', required=True, help="company id cannot be blank!")
updateSettings_parser.add_argument('open', required=False)
updateSettings_parser.add_argument('open_hours', type=dict, required=False)
updateSettings_parser.add_argument('max_capacity', type=int, required=False)
