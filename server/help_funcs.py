import json
import ast
import shutil

from server.mongo_connection import *

db = new_db["business_info"]


def get_businesses_from_db():
    jsons = []
    list_of_businesses = db.find({}, {'business_name': 1, "address": 1, "search_key": 1, 'company_id': 1})
    for document in list_of_businesses:
        del document['_id']
        jsons.append(document)

    return jsons
