from pocketbase import PocketBase  # Client also works the same
from pocketbase.client import FileUpload
from pocketbase.utils import ClientResponseError
from fastapi import FastAPI
from backend_components import userLogin

app = FastAPI()

CLIENT = PocketBase('http://127.0.0.1:8090')

@app.post("/signup")
async def attemptSignUp(user_login: userLogin):
    email = userLogin.username + '@uci.edu'
    signup_data = {
        "username": userLogin.username,
        "email": email,
        "emailVisibility": True,
        "password": userLogin.password,
        "password_confirm": userLogin.password,
        "friend_list": {"friends": []},
        "classid_list": {"classes": []},
        "made": 0,
        "missed": 0,
        "class_schedule": {},
        "pending_list": {"pending": []},
    }
    try:
        received = CLIENT.collection('ant_users').create(signup_data)
        login_data = {
            "code": 200
        }
        return login_data
    except ClientResponseError as err:
        login_data = {
            "code": 400
        }
        return login_data  

@app.post("/login")
async def attemptLogin(userLogin):
    try:
        email = userLogin.username + '@uci.edu'
        received = CLIENT.collection('ant_users').auth_with_password(email, userLogin.password)
        login_data = {
            "code": 200,
            "user_id": str(received.record.id),
            "username": received.record.username
        }
        return login_data
    except ClientResponseError as err:
        login_data = {
            "code": 400,
            "user_id": '',
            "username": ''
        }
        return login_data
