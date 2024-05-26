from pocketbase import PocketBase  # Client also works the same
from pocketbase.client import FileUpload
from pocketbase.utils import ClientResponseError
from flask import Flask, request, jsonify


CLIENT = PocketBase('http://127.0.0.1:8090')

def addRequest(user_id, request_id):
    student_return = CLIENT.collection('ant_users').get_one(user_id)
    pending_dict = student_return.pending_list
    pending_list = pending_dict['pending']
    pending_list.append(request_id) 
    new_pending_data = {
        "pending_list": pending_dict
    }
    CLIENT.collection('ant_users').update(user_id, new_pending_data)


def addFriend(user_id, pending_id):
    student_return = CLIENT.collection('ant_users').get_one(user_id)
    pending_dict = student_return.pending_list
    pending_list = pending_dict['pending']
    pending_list.remove(pending_id) 
    new_pending_data = {
        "pending_list": pending_dict
    }
    CLIENT.collection('ant_users').update(user_id, new_pending_data)

    friend_dict = student_return.friend_list
    friend_list = friend_dict['friends']
    friend_list.append(pending_id)
    new_friend_data = {
        "friend_list": friend_dict
    }
    CLIENT.collection('ant_users').update(user_id, new_friend_data)




def removeFriend(user_id, friend_id):
    student_return = CLIENT.collection('ant_users').get_one(user_id)
    friend_dict = student_return.friend_list
    friend_list = friend_dict['friends']
    friend_list.remove(friend_id)
    new_friend_data = {
        "friend_list": friend_dict
    }
    CLIENT.collection('ant_users').update(user_id, new_friend_data)


def getFriendList(user_id):
    student_return = CLIENT.collection('ant_users').get_one(user_id)
    friend_dict = student_return.friend_list
    friend_list = friend_dict['friends']
    return friend_list
