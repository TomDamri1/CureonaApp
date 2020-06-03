from flask import jsonify
from flask_restful import reqparse, Resource

from server.help_funcs import *

avg_statistics_hour = reqparse.RequestParser()
avg_statistics_hour.add_argument('company_id', required=True, help="company_id cannot be blank!")


class avgStatisticsPerHour(Resource):

    def post(self):
        data = avg_statistics_hour.parse_args()
        business = get_business_data(data['company_id'])
        print(business)
        x_graph = calculate_x_for_graph(business)
        x_graph = convert_to_hour_string(x_graph)

        milon = {}
        for day, status in business["open_hours"].items():
            if status != "closed":
                milon[day] = {}
                for time_range in status:
                    start_hour = split_time_range(time_range)
                    while compare_hour1_smaller_then_hour2(start_hour[0], start_hour[1]):#list(business["queue"][day])[-1]):
                        print("++++++++++++++" + start_hour[0], start_hour[1],day)# list(business["queue"][day])[-1])
                        milon[day][start_hour[0]] = calc_avg(day, start_hour[0], add_hours(start_hour[0], x_graph),
                                                             business,start_hour[1])
                        start_hour[0] = add_hours(start_hour[0], x_graph)

        return jsonify(milon)
