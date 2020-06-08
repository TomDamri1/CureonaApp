import calendar
# import json
# import ast
# import shutil
import datetime
import random

from server.mongo_connection import *

db = testDB["business_info"]
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


def convert_time_to_str(current_time, minutes_interval, open_hours):
    minutes = int((current_time[1])[3:])
    for time in range(minute_to_start_with(current_time[1], minutes_interval, open_hours), 60, minutes_interval):
        if time < minutes < time + minutes_interval:
            if time < 10:
                time = '0' + str(time)
            current_time[1] = (current_time[1])[0:3] + str(time)
            break
    return current_time


def get_minimum(time, interval):
    while time - interval >= 0:
        time = time - interval
    return time


def find_time_interval(times, curr_time, hour):
    if times[3] < times[1]:
        times[3] + 24
        if curr_time == 0:  # special case where the time is midnight  00:MM
            curr_time = curr_time + 24
    if times[0] <= curr_time <= times[2]:  # get the hour that matches the time (times example : [16, 32, 2, 0] )
        hour = times


def minute_to_start_with(current_time, intervals, open_hours):
    curr_time = int((current_time[0:2]))
    time_intervals = [get_hours_and_minutes_as_int(x) for x in open_hours]
    print(time_intervals)
    hour = time_intervals[len(time_intervals) - 1]  # first we will define the hour to be the last interval
    for times in time_intervals:
        find_time_interval(times, curr_time, hour)
    print(hour)
    print(hour[1])

    return get_minimum(hour[1], intervals)


def check_if_hour_exists(business, current_time):
    try:
        amount = business['queue'][current_time[0]][current_time[1]]
    except Exception as err:
        print("error is" + str(err))
        return 'error : no such meeting intervals for ' + current_time[0] + " at " + current_time[1]
    else:
        print("amount is  ")
        print(amount)
        return str(len(amount))


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


# ---------------------------------------------------------------------------- update amount if business funcs


def increase_amount_in_business(cid):
    business_info.update(
        {"company_id": cid},
        {"$inc": {"current_amount": 1}}
    )


def decrease_amount_in_business(cid):
    business_info.update(
        {"company_id": cid},
        {"$inc": {"current_amount": -1}}
    )


# ---------------------------------------------------------------------------- statistics


def calculate_x_for_graph(business):
    optimal_x = 60
    if optimal_x % business['minutes_intervals']  == 0:
        return optimal_x
    else:
        x = 0
        while x <= optimal_x:
            x = x + business['minutes_intervals']
        return x


def convert_to_hour_string(time_in_minutes):
    hour = time_in_minutes // 60
    minutes = time_in_minutes % 60
    if minutes < 10:
        minutes = "0" + str(minutes)
    return str(hour) + ":" + str(minutes)


def add_hours(hour1, hour2):
    hours1, minutes1 = hour1.split(":")
    hours2, minutes2 = hour2.split(":")
    new_minutes = int(minutes1) + int(minutes2)
    new_hour = int(hours1) + int(hours2)
    hour_to_add = 0
    if new_minutes >= 60:
        hour_to_add = 1
    new_hour = new_hour + hour_to_add
    new_minutes = str(new_minutes % 60) if new_minutes % 60 > 9 else "0" + str(new_minutes % 60)
    new_hour = str(new_hour % 24) if new_hour % 24 != 0 else "00"
    if len(new_hour) < 2:
        new_hour = "0" + new_hour
    return new_hour + ":" + new_minutes


def compare_hour1_smaller_then_hour2(hour1, hour2):
    hours1, minutes1 = hour1.split(":")
    hours2, minutes2 = hour2.split(":")
    if int(hours1) == int(hours2):
        if int(minutes1) < int(minutes2):
            return True
        if int(minutes1) >= int(minutes2):
            return False
    if int(hours1) < int(hours2):
        return True
    if int(hours1) > int(hours2):
        return False


def calc_avg(day, time1, time2, business, end_of_interval):

    cnt = sum_product = 0
    minutes_intervals = convert_to_hour_string(business['minutes_intervals'])
    while compare_hour1_smaller_then_hour2(time1, time2) :
        print(time1, time2)
        if not compare_hour1_smaller_then_hour2(time2,end_of_interval):
            return str(sum_product / cnt) if cnt!=0 else "0.0"
        sum_product = sum_product + len(business['queue'][day][time1])
        time1 = add_hours(time1, minutes_intervals)
        cnt = cnt + 1
    return str(sum_product / cnt)


def split_time_range(range):
    return range.split("-")

