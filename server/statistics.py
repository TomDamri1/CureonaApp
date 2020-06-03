from flask import jsonify
from flask_restful import reqparse, Resource

from server.help_funcs import *
from server.mongo_connection import *
from server.apps_calendar import *
import random
import string
import datetime
import calendar
import pytz

avg_statistics_hour = reqparse.RequestParser()
avg_statistics_hour.add_argument('company_id', required=True, help="company_id cannot be blank!")


class avgStatisticsPerHour(Resource):

    def post(self):
        data = avg_statistics_hour.parse_args()
        business = get_business_data(data['company_id'])
        x_graph = calculate_x_for_graph(business)
        x_graph = convert_to_hour_string(x_graph)
