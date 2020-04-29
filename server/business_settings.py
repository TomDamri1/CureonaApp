from flask import jsonify
from flask_restful import reqparse, Resource
from server.mongo_connection import *
from server.help_funcs import *

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

    # this class wil receive a JSON and will check what are the things that the business owner woukd like to change
    # a business owner can change one/few/all)of the following :
    # business max_capacity - the maximum amount of costumer that are allowed to be inside the business at once
    # business open - if the business is opened or not
    # business open hours -  this is the most complicated business change - because we need to see if there are any
    # costumers tha are affected by this change - if if they are affected we will need to let them know
    def post(self):
        data = updateSettings_parser.parse_args()
        json_doc = business_settings.find_one({"company_id": data['company_id']})
        # if the business owner accidentally entered the 'change_settings' option from the menu - we could notice that
        # by getting an empty json from the front-end
        if json_doc:
            cid = data['company_id']
            costumers_affected, ret = {}, {}
   # if the user chose to change the opening hours for the business
            if data['open_hours'] is not None and data['open_hours'] != json_doc['open_hours']:
                update_hours_and_inform_costumers(cid, data['open_hours'], costumers_affected)
                ret["open_hours"] = "updated"
                ret['affected_costumers'] = 'no effect' if not costumers_affected else costumers_affected
            else:
                ret["open_hours"] = "no changes"


















