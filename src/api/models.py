from flask_sqlalchemy import SQLAlchemy
import random

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return '<User %r>' % self.username

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }
    
    def getUser(email, password):
        user = User.query.filter_by(email=email, password=password).first()
        return user

    def create(email, password, is_active):
        user = User(email=email, password=password, is_active=is_active)
        db.session.add(user)
        db.session.commit()

    def randomPassword(email):
        user = User.query.filter_by(email=email).first()
        password = ''.join((random.choice('abcdxyzpqr') for i in range(5)))
        user.password = password
        db.session.commit()

        return password
