from flask import Flask, render_template
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

    with app.app_context():
        configure_index()
        configure_api()
        return app
