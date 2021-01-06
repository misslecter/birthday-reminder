from flask_restx import fields

from app import birthdays_api

DateJson = birthdays_api.model('Date', {
    'day': fields.DateTime(required=True),
    'month': fields.Integer(required=True),
    'year': fields.Integer(required=False)
})

BirthdayJson = birthdays_api.model('Birthday', {
    'id': fields.Integer(required=True, description='Database id of the birthday'),
    'name': fields.String(required=True, description='Person name'),
    'birthday': fields.Nested(required=True, model=DateJson)
})

BirthdaysJson = birthdays_api.model('Birthdays', {
    "birthdays": fields.List(required=False, cls_or_instance=fields.Nested(BirthdayJson))
})
