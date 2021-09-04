"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from flask_jwt_extended import JWTManager
from flask_mail import Mail, Message

ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)

app.url_map.strict_slashes = False

# database condiguration
if os.getenv("DATABASE_URL") is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

MIGRATE = Migrate(app, db)
db.init_app(app)

app.config['SECRET_KEY'] = 'top-secret!'
app.config['MAIL_SERVER'] = 'smtp.sendgrid.net'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'apikey'
app.config['MAIL_PASSWORD'] = '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'
app.config['MAIL_DEFAULT_SENDER'] = 'labarca.manu@gmail.com'
mail = Mail(app)
#Add JWT

app.config["JWT_SECRET_KEY"] = "paralelepipedo"
jwt = JWTManager(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)



# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')


# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response


@app.route('/forgot-password', methods=['POST'])

def recovery_password():
    body = request.get_json()
    if body is None:
        return jsonify({"msg": "Body is empty or null"})

    email = body["email"]
    print("email", email)
    password = User.randomPassword(email)
 
    msg = Message('Recuperar contraseña', recipients=[email])
    msg.body = 'Su contraseña temporal es: ' + password
    mail.send(msg)

    return jsonify({"msg": "Correo enviado"}), 200    


# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
