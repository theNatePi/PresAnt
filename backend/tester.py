import requests
from json import dumps


def main():
    url = "http://127.0.0.1:5000/signup/"
    data = {"name": "kyle"}
    response = requests.post(url, json=data)
    print(response.status_code)
    print(response.content)


main()
