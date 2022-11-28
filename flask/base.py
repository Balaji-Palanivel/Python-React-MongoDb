from flask import Flask,render_template
from flask_pymongo import PyMongo
from flask import jsonify,request
from bson.json_util import dumps, loads
import json


app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb://127.0.0.1:27017/database_1"
mongo = PyMongo(app)
all_users = mongo.db.collection_3
filter_status = 'false'

@app.route("/",methods=['GET'])
def get_details():    
    arg1 = (request.args.get('filter'))
    if len(request.args.keys()) == 0:
        return home_page()
    elif 'filter' in request.args.keys():
       return filter(str(arg1))
    elif request.args.get('sort') == "asc":
        return sort_Asc()
    elif request.args.get('sort') == "dsc":
        return sort_Dsc()
        
    
def home_page():
    global filter_status
    x = all_users.find()
    y = dumps(x) 
    authors = json.loads(y)
    filter_status = 'false'
    return authors    

def sort_Asc():
    if filter_status == 'true':
        return (sorted(filterd_1, key=lambda i: (i[request.args.get('sortby')]),reverse=False))
    elif filter_status == 'false' and str(request.args.get('sortby')) == 'name':
        x = all_users.find().sort("name",1)
        y = dumps(x) 
        authors = json.loads(y)
        return authors
    elif filter_status == 'false' and str(request.args.get('sortby')) == 'email':
        x = all_users.find().sort("email",1)
        y = dumps(x) 
        authors = json.loads(y)
        return authors

def sort_Dsc():
    if filter_status == 'true':
        return (sorted(filterd_1, key=lambda i: (i[request.args.get('sortby')]),reverse=True))
    elif filter_status == 'false' and request.args.get('sortby') == 'name':
        x = all_users.find().sort("name",-1)
        y = dumps(x) 
        authors = json.loads(y)
        return authors
    elif filter_status == 'false' and request.args.get('sortby') == 'email':
        x = all_users.find().sort("email",-1)
        y = dumps(x) 
        authors = json.loads(y)
        return authors
def filter(name):
    global filterd_1,filter_status
    x = all_users.find()
    y = dumps(list(x), indent = 2) 
    authors = json.loads(y)
    z = []
    for x in authors:
        if name in x['name']:
            z.append(x)
    a = dumps(z, indent = 2) 
    b = json.loads(a)
    filterd_1,filter_status = b, 'true'
    return b
    # if request.args.get('sort') == 'asc':
    #     return (sorted(b, key=lambda i: (i[request.args.get('sortby')]),reverse=False))
    # elif request.args.get('sort') == 'dsc':
    #     return (sorted(b, key=lambda i: (i[request.args.get('sortby')]),reverse=True))

    

@app.route("/add",methods=['GET','POST'])
def find_id():
    req = request.get_json()   
    NAME = req['name']
    EMAIL = req['email']
    # PWD = req['pwd']   
    all_users.create_index("name", unique=True)
    try :
        all_users.insert_one({"name" : NAME, "email" : EMAIL})
    except :
        return "Given NAME is already exist......" 
    return "Successfully Added...."

app.run(debug= True)

   

# import pymongo
# from pymongo import MongoClient
# from flask import Flask
# from flask import jsonify,request
# from bson.json_util import dumps, loads
# import json
# app = Flask(__name__)

# client = MongoClient("mongodb+srv://bala_09122002:BalajiAsm09@cluster0.auy9sri.mongodb.net/?retryWrites=true&w=majority")
# db = client.sample_1
# collection_1 = db.table_1


# @app.route("/",methods=['GET'])
# def home_page():
#     x = collection_1.find()
#     y = dumps(list(x), indent = 2) 
#     authors = json.loads(y)
#     return authors

# @app.route("/<int:id>",methods=['GET'])
# def find(id):
#     x = collection_1.find({"id": str(id) })
#     y = dumps(list(x), indent = 2) 
#     authors = json.loads(y)
#     return authors

# @app.route("/add",methods=['POST'])
# def find_id():
#     req = request.get_json()
#     ID = req['id']
#     NAME = req['name']
#     collection_1.insert_one({"id" : ID, "name" : NAME})
#     return "Successfully Added...."

# app.run(debug= True)