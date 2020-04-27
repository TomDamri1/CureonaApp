from flask import jsonify
from flask_restful import reqparse, Resource
from server.help_funcs import *
from server.user import VERSION_OF_BUSINESSES_TEXT_FILE

getBusinesses_parser = reqparse.RequestParser()
getBusinesses_parser.add_argument('version', type=int, required=False)


class getBusinesses(Resource):

    def post(self):
        data = getBusinesses_parser.parse_args()
        version = get_version()
        if data['version'] is not None and data['version'] == version:
            return {"success": "data is up to date"}

        f = open("txt_files/businesses.txt", "r")  # a = append to the end of the file
        return jsonify(get_businesses_with_json_file(f.readlines()))
