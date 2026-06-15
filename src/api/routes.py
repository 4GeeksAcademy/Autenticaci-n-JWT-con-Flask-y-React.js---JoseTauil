"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, Blueprint
from api.models import db, User
from flask_cors import CORS

# 🔐 JWT
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend"
    }

    return jsonify(response_body), 200


# =========================
# SIGNUP
# =========================
@api.route('/signup', methods=['POST'])
def signup():

    body = request.get_json()

    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        return jsonify({"msg": "Faltan datos"}), 400

    existing_user = User.query.filter_by(email=email).first()

    if existing_user:
        return jsonify({"msg": "El usuario ya existe"}), 400

    new_user = User(
        email=email,
        password=password,
        is_active=True
    )

    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "msg": "Usuario creado correctamente"
    }), 201


# =========================
# LOGIN (🔐 CON JWT)
# =========================
@api.route('/login', methods=['POST'])
def login():

    body = request.get_json()

    email = body.get("email")
    password = body.get("password")

    if not email or not password:
        return jsonify({"msg": "Faltan datos"}), 400

    user = User.query.filter_by(email=email).first()

    if user is None:
        return jsonify({"msg": "Usuario no existe"}), 401

    if user.password != password:
        return jsonify({"msg": "Contraseña incorrecta"}), 401

    # 🔐 CREAR TOKEN JWT
    access_token = create_access_token(identity=user.id)

    return jsonify({
        "msg": "Login correcto",
        "token": access_token,
        "user": user.serialize()
    }), 200