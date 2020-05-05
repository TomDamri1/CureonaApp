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
GetQueue_parser.add_argument('company_id', required=True, help="business name cannot be blank!")
GetQueue_parser.add_argument('Day', required=True, help="Date cannot be blank!")
GetQueue_parser.add_argument('Hour', required=True, help="Date cannot be blank!")

letters = string.ascii_lowercase


def random_string(stringLength=4):
    """Generate a random string of fixed length """
    return ''.join(random.choice(letters) for i in range(stringLength))


def calc_date(Day):
    """calc date from day """
    if Day == "sunday":
        queue_day = 6
    elif Day == "monday":
        queue_day = 0
    elif Day == "tuesday":
        queue_day = 1
    elif Day == "wednesday":
        queue_day = 2
    elif Day == "thursday":
        queue_day = 3
    elif Day == "friday":
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
        business = business_info.find_one({"company_id": data['company_id']})
        # check for legal day name
        if data['Day'] == "sunday" or data['Day'] == "monday" or data['Day'] == "tuesday" or data[
            'Day'] == "wednesday" or data['Day'] == "thursday" or data['Day'] == "friday" or data['Day'] == "saturday":
            schedule_date = calc_date(data['Day'])
        else:
            return jsonify({'state': 'failed, illegal day name'})
        # check for legal business name
        if business is None:
            return jsonify({'state': 'failed, BusinessName is not register'})
        # check if the business is open or closed
        if not business["open"]:
            return jsonify({'state': 'failed, Business is closed'})
        # check if in the given day and hor there are available queue
        print("num of queue to this hour: " + str(int(len(business["queue"][data['Day']][data['Hour']]))))
        print("max capacity: " + str(business["max_capacity"]))
        if len(business["queue"][data['Day']][data['Hour']]) >= int(business["max_capacity"]):
            return jsonify({'state': 'failed, sorry the queue is full'})
        queue_key = random_string(4)
        print(queue_key)
        json_doc = user_queue.find_one({"username": data['username']})
        # add queue to customer
        if json_doc:
            # check if the customer already have a queue to this day and hour to this business
            prev_orders = json_doc["orders"]
            for i in prev_orders:
                if data['BusinessName'] == i[0] and schedule_date == i[1] and data['Hour'] == i[2]:
                    return jsonify({'state': 'failed, sorry you can not get two queue to the same hour'})
            order = [data['BusinessName'], schedule_date, data['Hour'], queue_key, business["address"]]
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
        orders = [[data['BusinessName'], schedule_date, data['Hour'], queue_key]]
        # print(orders)
        userQueue = {"username": data['username'], "orders": orders}
        # print(userQueue)
        user_queue.insert_one(userQueue)
        business_info.update({'business_name': data['BusinessName']},
                             {"$push": {"queue." + data['Day'] + "." + data['Hour']: queue_key}})
        return jsonify({'state': 'success', 'key': queue_key})


AvailableQueues_parser = reqparse.RequestParser()
AvailableQueues_parser.add_argument('company_id', required=True, help="company_id cannot be blank!")


class AvailableQueues(Resource):

    def post(self):
        def available_hours(day):
            available_queues = list()
            for hour in list_queue[day]:
                if max_capacity - len(list_queue[day][hour]) > 0:
                    available_queues.append(hour)
            return available_queues

        def available_hours_at_day(day):
            available_queues = list()
            if isinstance(list_queue[day], str):
                available_queues = list()
            else:
                available_queues = available_hours(day)
            return available_queues

        data = AvailableQueues_parser.parse_args()
        json_doc = business_info.find_one({"company_id": data['company_id']})
        if not json_doc:
            return jsonify({'state': 'failed, company_id is not exist'})
        if not json_doc["open"]:
            return jsonify({'state': 'success', 'queue': {'sunday': [], 'monday': [], 'tuesday': [], 'wednesday': [],
                                                          'thursday': [], 'friday': [], 'saturday': []}})

        max_capacity = int(json_doc["max_capacity"])
        queue = json_doc["queue"]
        list_queue = []
        for _, value in queue.items():
            list_queue.append(value)
        available_queues_sunday = available_hours_at_day(0)
        available_queues_monday = available_hours_at_day(1)
        available_queues_tuesday = available_hours_at_day(2)
        available_queues_wednesday = available_hours_at_day(3)
        available_queues_thursday = available_hours_at_day(4)
        available_queues_friday = available_hours_at_day(5)
        available_queues_saturday = available_hours_at_day(6)

        open_and_available_queues = {'sunday': available_queues_sunday,
                                     'monday': available_queues_monday,
                                     'tuesday': available_queues_tuesday,
                                     'wednesday': available_queues_wednesday,
                                     'thursday': available_queues_thursday,
                                     'friday': available_queues_friday,
                                     'saturday': available_queues_saturday}
        return jsonify({'state': 'success', 'queue': open_and_available_queues})


AvailableQueues_parser = reqparse.RequestParser()
AvailableQueues_parser.add_argument('company_id', required=True, help="company_id  cannot be blank!")

insert_parser = reqparse.RequestParser()
insert_parser.add_argument('company_id', required=True, help="company_id  cannot be blank!")
insert_parser.add_argument('key', required=True, help="key cannot be blank!")


class LetsUserIntoBusiness(Resource):
    data = insert_parser.parse_args()
