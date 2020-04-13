from flask import jsonify
from flask_restful import reqparse, Resource
from server.mongo_connection import *
from server.apps_calendar import *
import random
import string
import datetime

user_queue = new_db["user_queue"]
business_info = new_db["business_info"]
login = new_db["login"]

GetQueue_parser = reqparse.RequestParser()
GetQueue_parser.add_argument('username', required=True, help="username name cannot be blank!")
GetQueue_parser.add_argument('BusinessName', required=True, help="business name cannot be blank!")
GetQueue_parser.add_argument('Day', required=True, help="Date cannot be blank!")
GetQueue_parser.add_argument('Hour', required=True, help="Date cannot be blank!")

letters = string.ascii_lowercase


def random_string(stringLength=4):
    """Generate a random string of fixed length """
    return ''.join(random.choice(letters) for i in range(stringLength))


def calc_date(Date):
    """calc date from day """
    if Date == "sunday":
        queue_day = 6
    elif Date == "monday":
        queue_day = 0
    elif Date == "tuesday":
        queue_day = 1
    elif Date == "wednesday":
        queue_day = 2
    elif Date == "thursday":
        queue_day = 3
    elif Date == "friday":
        queue_day = 4
    else:
        queue_day = 5
    current_day = datetime.datetime.today().weekday()
    if current_day < queue_day:
        difference = queue_day - current_day
    else:
        difference = 7 - (current_day - queue_day)

    current_date = datetime.date.today()
    schedule_date = current_date + datetime.timedelta(days=difference)

    return schedule_date.strftime('%d-%m-%Y %H:%M:%S.%f')[:10]


class GetQueue(Resource):

    def post(self):
        data = GetQueue_parser.parse_args()
        print(data)
        schedule_date = calc_date(data['Day'])
        queue_key = random_string(4)
        print(queue_key)
        json_doc = user_queue.find_one({"username": data['username']})
        if json_doc:
            # add queue to customer
            order = [data['BusinessName'], schedule_date, queue_key]
            print(order)
            user_queue.update({'username': data['username']}, {"$push": {'orders': order}})
            business_info.update({'business_name': data['BusinessName']},
                                 {"$push": {"queue." + data['Day'] + "." + data['Hour']: queue_key}})
            return jsonify({'state': 'success', 'key': queue_key})
        # make the first queue
        # check if user exist
        json_doc = login.find_one({"username": data['username']})
        if not json_doc:
            return jsonify({'state': 'User does not exist'})
        # create the first order
        orders = [[data['BusinessName'], schedule_date, queue_key]]
        # print(orders)
        userQueue = {"username": data['username'], "orders": orders}
        # print(userQueue)
        user_queue.insert_one(userQueue)
        business_info.update({'business_name': data['BusinessName']},
                             {"$push": {"queue." + data['Day'] + "." + data['Hour']: queue_key}})
        return jsonify({'state': 'success', 'key': queue_key})


AvailableQueues_parser = reqparse.RequestParser()
AvailableQueues_parser.add_argument('company_id', required=True, help="company_id name cannot be blank!")


class AvailableQueues(Resource):
    def post(self):
        count = 0
        move_day = 0

        def filter_available(hour):
            nonlocal count
            nonlocal move_day
            if max_capacity - len(list_queue[move_day][hour]) > 0:
                count = count + 1
                if count % 24 == 0:
                    move_day = move_day + 1
                return True
            return False

        data = AvailableQueues_parser.parse_args()
        # print(data)
        json_doc = business_info.find_one({"company_id": data['company_id']})
        queue = json_doc["queue"]

        max_capacity = int(json_doc["max_capacity"])

        list_queue = [queue['sunday'], queue["monday"], queue["tuesday"], queue["wednesday"], queue["thursday"],
                      queue["friday"], queue["saturday"]]

        available_queues_sunday = list(filter(filter_available, hours))
        available_queues_monday = list(filter(filter_available, hours))
        available_queues_tuesday = list(filter(filter_available, hours))
        available_queues_wednesday = list(filter(filter_available, hours))
        available_queues_thursday = list(filter(filter_available, hours))
        available_queues_friday = list(filter(filter_available, hours))
        available_queues_saturday = list(filter(filter_available, hours))

        list_queue1 = {'sunday': available_queues_sunday, 'monday': available_queues_monday,
                       'tuesday': available_queues_tuesday, 'wednesday': available_queues_wednesday,
                       'thursday': available_queues_thursday, 'friday': available_queues_friday,
                       'saturday': available_queues_saturday}

        # print(list_queue1)

        return jsonify({'state': 'success', 'queue': list_queue1})
