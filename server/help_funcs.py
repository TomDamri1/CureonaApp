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

MINUTES_INTERVALS = 15

def get_the_current_opening_hours(cid):
    current_opening_hours = business_settings.find({'company_id': cid}, {'open_hours': 1})
    my_tmp_dict = (list(current_opening_hours))[0]
    return my_tmp_dict['open_hours']



def get_the_current_queue(cid):
    current_queue = business_settings.find({'company_id': cid}, {'queue': 1})
    my_tmp_dict = (list(current_queue))[0]
    return my_tmp_dict['queue']



def add_new_days_hours(times, modified_hours={}):
    try:
        hour_start_time, minute_start_time, hour_end_time, minute_end_time = get_hours_and_minutes_as_int(times)

    except TypeError:
        print("values entered incorrectly, the correct format has to be : HH:MM-HH:MM")

    time_intervals = calc_time_intervals(hour_start_time, hour_end_time, minute_start_time, minute_end_time)
    minutes = minute_start_time
