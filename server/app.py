# Using flask to make an api
# import necessary libraries and functions
from flask_restful import Api
from server.user import *
from flask import Flask

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
        return "<h1>hello</h1>"


# adding the defined resources along with their corresponding urls
api.add_resource(EMPTY, '/')
# driver function
if __name__ == '__main__':
    app.run(debug=True)
