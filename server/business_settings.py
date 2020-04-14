from flask import jsonify
from flask_restful import reqparse, Resource
from server.mongo_connection import *

user_queue = new_db["user_queue"]
business_info = new_db["business_info"]
login = new_db["login"]

business_settings = new_db["business_info"]

updateSettings_parser = reqparse.RequestParser()

updateSettings_parser.add_argument('company_id', required=True, help="company id cannot be blank!")
updateSettings_parser.add_argument('open', required=False)
updateSettings_parser.add_argument('open_hours', type=dict, required=False)
updateSettings_parser.add_argument('max_capacity', type=int, required=False)


class updateSettings(Resource):

    def post(self):
        data = updateSettings_parser.parse_args()
        json_doc = business_settings.find_one({"company_id": data['company_id']})

        if json_doc:
            cid = data['company_id']
            ret = {}

            if data['open_hours'] is not None:
                ret["open_hours"] = "updated"
                self.updateHours(cid, data['open_hours'])
            if data['open'] is not None:
                ret["open"] = "updated"
                self.updateOpen(cid, True if data['open'] == "True" else False)
            if data['max_capacity'] is not None:
                ret["max_capacity"] = "updated"
                self.updateMaxCapacity(cid, data['max_capacity'])

            return jsonify({'state': 'success', "changes": 'No chacnges'} if not ret else ret)

        return jsonify({'state': 'company id was not found'})

    def updateMaxCapacity(self, cid, maxCapacity):
        business_settings.update({'company_id': cid},
                                 {"$set": {"max_capacity": maxCapacity}})

    def updateOpen(self, cid, business_open):
        business_settings.update({'company_id': cid},
                                 {"$set": {"open": business_open}})

    def updateHours(self, cid, open_hours):
        business_settings.update({'company_id': cid},
                                 {"$set": {
                                     "open_hours.sunday": open_hours['sunday'],
                                     "open_hours.monday": open_hours['monday'],
                                     "open_hours.tuesday": open_hours['tuesday'],
                                     "open_hours.wednesday": open_hours['wednesday'],
                                     "open_hours.thursday": open_hours['thursday'],
                                     "open_hours.friday": open_hours['friday'],
                                     "open_hours.saturday": open_hours['saturday'],
                                 }
                                 }
                                 )
