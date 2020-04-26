# Using flask to make an api
# import necessary libraries and functions
from flask_restful import Api

from server.business_search import *
from server.business_settings import *
from server.user import *
from server.queue_management import *
from flask import Flask
from server import  help_funcs

# creating the flask app
app = Flask(__name__)
# creating an API object
api = Api(app)


# making a class for a particular resource
# the get, post methods correspond to get and post requests
# they are automatically mapped by flask_restful.
# other methods include put, delete, etc.
class EMPTY(Resource):

    def get(self):
        return "<h1>hello world</h1>"


# adding the defined resources along with their corresponding urls
api.add_resource(RegisterBusiness, '/RegisterBusiness')
api.add_resource(Registration, '/Registration')
api.add_resource(Login, '/Login')
api.add_resource(AvailableQueues, '/AvailableQueues')
api.add_resource(GetQueue, '/GetQueue')
api.add_resource(EMPTY, '/')
api.add_resource(updateSettings, '/businessSettings')
api.add_resource(getBusinesses, '/getBusinesses')
# driver function

if __name__ == '__main__':
    set_global_version_of_txt_file()
    app.run(debug=True)
