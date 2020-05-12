from flask import jsonify
from flask_restful import reqparse, Resource
from server.help_funcs import *


class getBusinesses(Resource):

    def post(self):
        dict_to_be_jsonified = get_businesses_from_db()

        return jsonify(dict_to_be_jsonified)
