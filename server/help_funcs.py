import json
import ast
import shutil

from server.mongo_connection import *

db = new_db["business_info"]

business_settings = db


def get_businesses_from_db():
    jsons = []
    list_of_businesses = db.find({}, {'business_name': 1, "address": 1, "search_key": 1, 'company_id': 1})
    for document in list_of_businesses:
        del document['_id']
        jsons.append(document)

    return jsons


################################################################################################
# from here till the next '#' line- those are all help functions for the update settings


def get_the_current_opening_hours(cid):
    current_opening_hours = business_settings.find({'company_id': cid}, {'open_hours': 1})
    my_tmp_dict = (list(current_opening_hours))[0]
    return my_tmp_dict['open_hours']
