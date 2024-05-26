from pocketbase import PocketBase  # Client also works the same
from pocketbase.client import FileUpload
from pocketbase.utils import ClientResponseError
from flask import Flask, jsonify, request
from friends import addRequest, addFriend, removeFriend, getFriendList
from flask_cors import CORS
from pocketbase import PocketBase  # Client also works the same
from pocketbase.client import FileUpload
from pocketbase.utils import ClientResponseError
from icalendar import Calendar
from datetime import datetime, timedelta
from geocode import getGeocodeData
from flask import Flask, request, jsonify
import pytz

app = Flask(__name__)
CORS(app, origins='http://172.20.10.9:5000',
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



def readICSText(ics_text):
    events = {}
    
    calendar = Calendar.from_ical(ics_text)
    
    for component in calendar.walk():
        if component.name == "VEVENT":
            summary = str(component.get('SUMMARY'))
            description = str(component.get('DESCRIPTION'))
            
            if "Final Exam" in summary:
                continue
            
            dtstart = component.get('DTSTART').dt
            dtend = component.get('DTEND').dt
            location = str(component.get('LOCATION', ''))
            rrule = component.get('RRULE', {})
            
            start_time = dtstart.strftime('%H:%M:%S')
            end_time = dtend.strftime('%H:%M:%S')
            
            if 'BYDAY' in rrule:
                days_of_week = rrule['BYDAY']
            else:
                days_of_week = [dtstart.strftime('%a')]
            
            event_key = (summary, description, start_time, end_time, location)
            
            if event_key in events:
                events[event_key].extend(days_of_week)
            else:
                events[event_key] = list(days_of_week)

    classes = [
        [key[0], key[2], key[3], key[4], sorted(list(set(days)))] for key, days in events.items()
    ]
    
    return classes

def checkUnique(class_data):
    result = CLIENT.collection('ant_classes').get_list(1, 20, {"filter:": f'title = "{class_data[0]}" && start = "{class_data[1]}" && end = "{class_data[2]}"'})
    if result:
        return True
    else:
        return False
    
def getIntervals(start_time, end_time):
    start_datetime = datetime.strptime(start_time, "%H:%M:%S")
    end_datetime = datetime.strptime(end_time, "%H:%M:%S")

    result = [start_datetime.strftime("%H:%M")]

    current_time = start_datetime
    while current_time < end_datetime:
        current_time += timedelta(minutes=30)
        result.append(current_time.strftime("%H:%M"))

    return result[:-1]

def setOTWandLEFT(student_id):
    student_return = CLIENT.collection('ant_users').get_one(student_id)
    classes_dict = student_return.class_schedule
    
    current_time = datetime.strptime("00:30", "%H:%M")
    end_time = datetime.strptime("23:30", "%H:%M")
    null_count = 0

    while current_time <= end_time:
        time_str = current_time.strftime("%H:%M")
        if classes_dict[time_str] == 'NULL':
            null_count += 1
            if null_count == 1:
                last_time = current_time - timedelta(minutes=30)
                if classes_dict[last_time.strftime("%H:%M")] != 'NULL':
                    classes_dict[current_time] += '_LEFT'
        else:
            if null_count >= 6:
                last_time = current_time - timedelta(minutes=30)
                classes_dict[last_time.strftime("%H:%M")] += '_OTW'
            null_count = 0
        current_time += timedelta(minutes=30)

    new_classes_data = {
        "class_schedule": classes_dict
    }
    CLIENT.collection('ant_users').update(student_id, new_classes_data)
    

def uploadSchedule(student_id, ics_text):
    classes = readICSText(ics_text)
    for class_data in classes:
        # Decide if in table already.
        if checkUnique(class_data):
            # MAKE LONG AND LAT MAPS API CALL. REMEMBER TO CHANGE.
            # geocode_data = getGeocodeData(class_data[3])
            geocode_data = {'lat': 33.6460519, 'lng': -117.8427446}
            new_class_data = {
                "title": class_data[0],
                "start": class_data[1],
                "end": class_data[2],
                "location": class_data[3],
                "studentid_ids": {"ids": [student_id]},
                "week_list": {"days": class_data[4]},
                "long_lat": {"longitude": geocode_data['lng'], "latitude": geocode_data['lat']} 
            }
            try:
                # Create new class.
                received = CLIENT.collection('ant_classes').create(new_class_data)
                
                # Add class_id to list in student.
                student_return = CLIENT.collection('ant_users').get_one(student_id)
                classid_dict = student_return.classid_list
                classid_list = classid_dict['classes']
                classid_list.append(received.id) 
                new_classid_data = {
                    "classid_list": classid_dict
                }
                CLIENT.collection('ant_users').update(student_id, new_classid_data)

                # Add clases to intervals in student schedule.
                classes_dict = student_return.class_schedule
                for stamp in getIntervals(class_data[1], class_data[2]):
                    classes_dict[stamp] = received.id
                new_classes_data = {
                    "class_schedule": classes_dict
                }
                CLIENT.collection('ant_users').update(student_id, new_classes_data)

            except ClientResponseError as err:
                upload_data = {
                    "code": 400,
                    "message": f"{class_data[0]} upload unsuccessful."
                }
                return upload_data
        else:
            try:
                # Add student_id to list in class.
                class_return = CLIENT.collection('ant_classes').get_list(1, 20, {"filter:": f'title = "{class_data[0]}" && start = "{class_data[1]}" && end = "{class_data[2]}"'})
                class_ret_data = class_return.items[0]
                studentid_dict = class_return.studentid_list
                studentid_list = studentid_dict['ids']
                studentid_list.append(student_id)
                new_studentid_data = {
                    "studentid_list": studentid_dict
                }
                CLIENT.collection('ant_classes').update(class_ret_data.id, new_studentid_data)
                
                # Add class_id to list in student.
                student_return = CLIENT.collection('ant_users').get_one(student_id)
                classid_dict = student_return.classid_list
                classid_list = classid_dict['classes']
                classid_list.append(class_ret_data.id) 
                new_classid_data = {
                    "classid_list": classid_dict
                }
                CLIENT.collection('ant_users').update(student_id, new_classid_data)

                # Add clases to intervals in student schedule.
                classes_dict = student_return.class_schedule
                for stamp in getIntervals(class_data[1], class_data[2]):
                    classes_dict[stamp] = class_ret_data.id
                new_classes_data = {
                    "class_schedule": classes_dict
                }
                CLIENT.collection('ant_users').update(student_id, new_classes_data)

            except ClientResponseError as err:
                # Return error.
                upload_data = {
                    "code": 400,
                    "message": f"{class_data[0]} update unsuccessful."
                }
                return upload_data
    # Add id_OTW and id_LEFT.
    setOTWandLEFT(student_id)
    upload_data = {
        "code": 200,
        "message": f"{class_data[0]} update successful."
    }
    return upload_data

@app.route("/uploadics/", methods= ["POST"])
def upload_schedule():
    content_type = request.headers.get('Content-Type')
    if (content_type == 'application/json'):
        info = request.json
        result = uploadSchedule(info['student_id'], info['ics_text'])
        return jsonify(result)



if __name__ == '__main__':
    app.run(debug=True, host="172.20.10.9")
