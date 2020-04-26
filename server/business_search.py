from flask import jsonify
from flask_restful import reqparse, Resource
from server.help_funcs import *


class getBusinesses(Resource):

    def post(self):
        f = open("../txt_files/businesses.txt", "r")  # a = append to the end of the file
        return jsonify(get_businesses_with_json_file(f.readlines())
)
