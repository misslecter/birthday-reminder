import os

from flask import json
from flask_restx import Resource

from app import create_app, birthdays_api
from swagger import BirthdaysJson

app = create_app()


@birthdays_api.route('/', methods=['GET'])
class BirthdaysList(Resource):

    @birthdays_api.doc(responses={200: 'OK'}, description="Get list of custom birthdays")
    @birthdays_api.response(code=200, model=BirthdaysJson, description="Get list of custom birthdays")
    @birthdays_api.response(code=404, description='Birthdays file not found')
    def get(self):
        filename = os.path.join(app.static_folder, 'birthdays.json')

        with open(filename) as file:
            return json.load(file)


if __name__ == '__main__':
    app.run(host='localhost', port=8080, debug=True)
