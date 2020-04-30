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


def updateOpen(cid, business_open):
    business_settings.update({'company_id': cid},
                             {"$set": {"open": business_open}})


def updateMaxCapacity(cid, maxCapacity):
    business_settings.update({'company_id': cid},
                             {"$set": {"max_capacity": maxCapacity}})


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

            # if the user chose to change the 'open/closed' business status for the business
            if data['open'] is not None:
                if json_doc['open'] == True and data['open'] != 'True' or \
                        json_doc['open'] == False and data['open'] != 'False':
                    updateOpen(cid, True if data['open'] == "True" else False)
                    ret["open"] = "updated"
                else:
                    ret["open"] = "no changes"

            # if the user chose to change the 'max capacity' amount for the business
            if data['max_capacity'] is not None and data['max_capacity'] != json_doc['max_capacity']:
                ret["max_capacity"] = "updated"
                updateMaxCapacity(cid, data['max_capacity'])
            else:
                ret["max_capacity"] = "no changes"

            # if no changes were made then we will return a message that indicates that no changes were made
            return jsonify(ret)

        return jsonify({'state': 'company id was not found'})


def update_hours_and_inform_costumers(cid, new_opening_hours, costumers_affected):
    # we no get the old opening hours
    current_opening_hours = get_the_current_opening_hours(cid)
    current_opening_hours_queue = get_the_current_queue(cid)  # we will need the queue for later- when we will need
    # to inform the costumers

    # first we will built the new hours list
    for day in current_opening_hours:
        if day not in new_opening_hours:
            new_opening_hours[day] = current_opening_hours[day]

    # At this point , the new opening hours are now updated and merged with the old hours

    new_opening_hours_queue = {}
    # now we will create the queue
    for day in new_opening_hours:
        if new_opening_hours[day] != 'closed':
            tmp_queue = {}
            for time_interval in new_opening_hours[day]:
                tmp_queue = add_new_days_hours(time_interval, tmp_queue)
            new_opening_hours_queue[day] = tmp_queue
        else:
            new_opening_hours_queue[day] = "closed"

    # at this point we have a working new queue, now we need to let the people who are affected by the new
    # opening hours that their appointments have been canceled

    for day in ["sunday", "monday", "tuesday", "wednsday", "thursday", "friday", "saturday"]:
        if current_opening_hours[day] != new_opening_hours[day]:

            # closing an open day might lead to many people appointments to be cancelled so we will check if the
            # current day wasn't close , and if we closed it we will need to inform the costumers
            if current_opening_hours[day] != "closed" and new_opening_hours[day] == "closed":
                tmp_queue = create_list_of_affected_costumers(current_opening_hours_queue[day])
                if len(tmp_queue) != 0:
                    costumers_affected[day] = tmp_queue
                continue  # continue because the two variables will enter the next if as well so we need to skip it

            if current_opening_hours[day] == "closed" and new_opening_hours[day] != "closed":
                continue

            if current_opening_hours[day] != new_opening_hours[day]:
                tmp_queue = create_list_of_affected_costumers(current_opening_hours_queue[day],
                                                              new_opening_hours_queue[day])
                if len(tmp_queue) != 0:
                    costumers_affected[day] = tmp_queue



    business_settings.update({'company_id': cid},
                             {"$set": {"queue": new_opening_hours_queue,
                                       "open_hours": new_opening_hours
                                       }
                              }
                             )
