from pymongo import MongoClient

client = MongoClient('mongodb+srv://sce:aqw2@cluster-ldsid.mongodb.net/test')
new_db = client["appDB"]