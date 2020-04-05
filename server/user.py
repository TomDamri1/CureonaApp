from flask import jsonify
from flask_restful import reqparse, Resource

from server.mongo_connection import *
new_col = new_db["login"]
