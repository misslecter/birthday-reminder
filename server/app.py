from flask import Flask, render_template, request
from flask_restx import Api, Namespace

BIRTHDAYS_NAMESPACE = '/birthdays'
birthdays_api = Namespace(BIRTHDAYS_NAMESPACE)


def create_app() -> Flask:
    app = Flask(__name__)

    def configure_api():
        api = Api(
            doc='/doc/',
            version='0.1',
            title='Birthdays API'
        )
        api.init_app(app, add_specs=True)
        api.add_namespace(birthdays_api, path=BIRTHDAYS_NAMESPACE)

    def configure_index():
        @app.route('/')
        def index_html():
            return render_template('index.html')

    def enable_cors():
        @app.after_request
        def add_headers(response):
            allowed_origins = {
                'http://localhost:1234',
                'https://localhost:1234',
                'https://misslecter.github.io',
            }
            origin = request.headers.get('origin')
            if origin in allowed_origins:
                response.headers.add('Access-Control-Allow-Origin', origin)
                response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
                response.headers.add('Access-Control-Allow-Methods', 'GET,POST,PUT')
            return response

    with app.app_context():
        configure_index()
        enable_cors()
        configure_api()
        return app
