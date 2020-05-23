import calendar
# import json
# import ast
# import shutil
import datetime
import random

from server.mongo_connection import *

db = new_db["business_info"]
business_info, business_settings = db, db


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


def modifyWorkingHoursForDays(queue, opened_hours, minutes_intervals):
    for k, v in opened_hours.items():
        modified_hours = {}
        if v != 'closed':
            for times in v:
                queue[k] = add_new_days_hours(times, minutes_intervals, modified_hours)
        else:
            queue[k] = v  # v means "closed"


def get_the_current_opening_hours(cid):
    current_opening_hours = business_settings.find({'company_id': cid}, {'open_hours': 1})
    my_tmp_dict = (list(current_opening_hours))[0]
    return my_tmp_dict['open_hours']


def get_the_current_queue(cid):
    current_queue = business_settings.find({'company_id': cid}, {'queue': 1})
    my_tmp_dict = (list(current_queue))[0]
    return my_tmp_dict['queue']


def get_hours_and_minutes_as_int(times):
    return [int(times[0:2]), int(times[3:5]), int(times[6:8]), int(times[9:11])]


def create_hours_string(hour_start_time, minutes):
    if minutes < 10:
        minutesStr = '0' + str(minutes)
    else:
        minutesStr = str(minutes) if minutes != 0 else '00'

    hour_start = '0' + str(hour_start_time) if hour_start_time < 10 else str(hour_start_time)
    return hour_start + ':' + minutesStr


def add_new_days_hours(times, minutes_intervals, modified_hours={}):
    try:
        hour_start_time, minute_start_time, hour_end_time, minute_end_time = get_hours_and_minutes_as_int(times)

    except TypeError:
        print("values entered incorrectly, the correct format has to be : HH:MM-HH:MM")

    time_intervals = calc_time_intervals(hour_start_time, hour_end_time, minute_start_time, minute_end_time)
    minutes = minute_start_time

    while time_intervals > 0:

        strToAppend = create_hours_string(hour_start_time, minutes % 60)
        minutes = minutes + minutes_intervals
        if minutes >= 60:
            hour_start_time = (hour_start_time + 1) % 24
            minutes = minutes % 60

        modified_hours[strToAppend] = []
        time_intervals -= minutes_intervals
    return modified_hours


def calc_time_intervals(hour_start_time, hour_end_time, minute_start_time, minute_end_time):
    total_time = 0
    if hour_end_time < hour_start_time:
        if hour_end_time == 0:
            total_time = (24 - hour_start_time) * 60
        else:
            total_time = (24 - hour_start_time + hour_end_time) * 60
    else:
        total_time = (hour_end_time - hour_start_time) * 60

    if minute_start_time > minute_end_time:
        total_time = total_time - abs(minute_start_time - minute_end_time)
    elif minute_start_time < minute_end_time:
        total_time = total_time + abs(minute_start_time - minute_end_time)

    return total_time


def create_list_of_affected_costumers(current_queue, new_queue={}):
    tmp_dict = {}

    for appointment in current_queue:

        if appointment not in new_queue:

            if len(current_queue[appointment]) != 0:
                tmp_dict[appointment] = current_queue[appointment]

    return tmp_dict


# ---------------------------------------------------------------------------- DELETE APPOINTMENT FUNCS


def convert_date_string_to_day(date):
    day_name = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    date = date.replace("-", " ")
    return day_name[datetime.datetime.strptime(date, '%d %m %Y').weekday()].lower()


# ---------------------------------------------------------------------------- currentAmountAtBusiness FUNCS

def get_business_data(cid):
    business_data = business_info.find_one({"company_id": cid})
    if business_data is None:
        raise Exception("business was not found by the given cid")
    return business_data


def get_time_and_day_for_now(time_zone):
    time_and_day = [get_day(), reformat_time(time_zone)]
    return time_and_day


def reformat_time(time_zone):
    return datetime.datetime.now(time_zone).strftime("%d/%m/%Y %H:%M:%S")[11:16]


def get_day():
    return calendar.day_name[datetime.datetime.today().weekday()].lower()


def convert_time_to_str(current_time, minutes_interval):
    minutes = int((current_time[1])[3:])
    for time in range(0, 60, minutes_interval):
        if time < minutes < time + minutes_interval:
            if time < 10:
                time = '0' + str(time)
            current_time[1] = (current_time[1])[0:3] + str(time)
            break
    return current_time


# ---------------------------------------------------------------------------- SpontaneousAppointment funcs

def validate_a_number(number_to_be):
    try:
        int(number_to_be)
    except Exception as err:
        raise Exception("the number contains other elements")


def validate_number_length(number):
    if len(number) != 10:
        raise Exception("the number most contain 10 digits precisely")


def validate_data(number):
    validate_a_number(number)
    validate_number_length(number)
