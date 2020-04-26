from flask import jsonify
from flask_restful import reqparse, Resource
from server.help_funcs import *
from server.user import VERSION_OF_BUSINESSES_TEXT_FILE

RegisterBuisness_parser = reqparse.RequestParser()
RegisterBuisness_parser.add_argument('version', type=int, required=False)


class getBusinesses(Resource):

    def post(self):
        data = RegisterBuisness_parser.parse_args()
        if data['version'] is not None and data['version'] == VERSION_OF_BUSINESSES_TEXT_FILE:
                return {"success" : "data is up to date"}

        f = open("../txt_files/businesses.txt", "r")  # a = append to the end of the file
        return jsonify(get_businesses_with_json_file(f.readlines()))

