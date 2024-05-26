from pocketbase import PocketBase  # Client also works the same
from pocketbase.client import FileUpload
from pocketbase.utils import ClientResponseError
from flask import Flask, jsonify, request
from friends import addRequest, addFriend, removeFriend, getFriendList
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins='http://169.234.73.190:5000',
     methods=['GET', 'POST'], allow_headers=['Content-Type'])

CLIENT = PocketBase('http://127.0.0.1:8090')


def attemptSignUp(username, password):
    email = username + '@uci.edu'
    signup_data = {
        "username": username,
        "email": email,
        "emailVisibility": True,
        "password": password,
        "passwordConfirm": password,
        "friend_list": {"friends": []},
        "classid_list": {"classes": []},
        "made": 0,
        "missed": 0,
        "class_schedule": {},
        "pending_list": {"pending": []},
    }
    print(signup_data)
    try:
        received = CLIENT.collection('ant_users').create(signup_data)
        login_data = {
            "code": 200, 
            "user_id": str(received.id)
        }
        return login_data
    except ClientResponseError as err:
        print(err.data)
        login_data = {
            "code": 400,
            "user_id": ''
        }
        return login_data

@app.route("/signup/", methods=["POST"])
def sign_up():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        info = request.json
        result = attemptSignUp(info['username'], info['password'])
        print(result['code'])
        return jsonify(result) # info is DICT


def assignPhotos(user_id, sad_photo_string, happy_photo_string):
    try:
        student_return = CLIENT.collection('ant_users').get_one(user_id)
        new_photo_data = {
            "sad_photo": sad_photo_string,
            "happy_photo": happy_photo_string
        }
        CLIENT.collection('ant_users').update(user_id, new_photo_data)
        photo_data = {
            "code": 200
        }
        return photo_data
    except ClientResponseError as err:
        photo_data = {
            "code": 400
        }
        return photo_data
    
@app.route("/photo/", methods = ["POST"])
def assign_photos():
    content_type = request.headers.get("Content-Type")
    if content_type == "application/json":
        info = request.json
        result = assignPhotos(info['user_id'], info['sad_photo'], info['happy_photo'])
        print(result['code'])
        return jsonify(result)
        

def attemptLogin(username, password):
    try:
        email = username + '@uci.edu'
        received = CLIENT.collection('ant_users').auth_with_password(
            email, password)
        login_data = {
            "code": 200,
            "user_id": str(received.record.id)
        }
        return login_data
    except ClientResponseError as err:
        login_data = {
            "code": 400,
            "user_id": ''
        }
        return login_data

@app.route("/login", methods = ["POST"])
def login():
    content_type = request.headers.get("Content-Type")
    if content_type == "application/json":
        info = request.json
        result = attemptLogin(info['username'], info['password'])
        print(result['code'])
        return jsonify(result)

@app.route("/request", methods= ["POST"])
def add_request():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        info = request.json
        result = addRequest(info['user_id'], info['request_id'])
        return jsonify(result)
    
@app.route("/addFriend", methods = ['POST'])
def add_friend():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        info = request.json
        result = addFriend(info['user_id'], info['pending_id'])
        return jsonify(result)
    
@app.route("/removeFriend", methods = ["POST"])
def remove_friend():
    content_type = request.headers.get('Content-Type')
    if(content_type == 'application/json'):
        info = request.json
        result = addFriend(info['user_id'], info['pending_id'])
        return jsonify(result)
    
@app.route("/getFriendList", methods= ["POST"])
def get_friend_list():
    content_type = request.headers.get('Content-Type')
    if(content_type == 'application/json'):
        info = request.json
        result = getFriendList(info['user_id'])
        return jsonify(result)


if __name__ == '__main__':
    app.run(debug=True, host="169.234.73.190")