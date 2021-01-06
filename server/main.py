import os

from flask import json
from flask_restx import Resource

from app import create_app, birthdays_api

app = create_app()


@birthdays_api.route('/', methods=['GET'])
class BirthdaysList(Resource):

    @birthdays_api.doc(responses={200: 'OK'}, description="Get list of all movies")
    def get(self):
        filename = os.path.join(app.static_folder, 'birthdays.json')

        with open(filename) as file:
            return json.load(file)


if __name__ == '__main__':
    app.run(host='localhost', port=8080, debug=True)
