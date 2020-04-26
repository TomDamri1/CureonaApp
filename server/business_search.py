from flask import jsonify
from flask_restful import reqparse, Resource
from server.help_funcs import *
import ast
class getBusinesses(Resource):

    def post(self):
        f = open("../txt_files/businesses.txt", "r")  # a = append to the end of the file
        lines = f.readlines()
        lines.pop(0)
        jsons = []
        for line in lines:
            dic = ast.literal_eval(line)
            jsons.append(dic)


        return jsonify(jsons)
