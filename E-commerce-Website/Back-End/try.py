from flask import Flask, jsonify, request, redirect, render_template, url_for
import mysql.connector
from flask_cors import CORS
import bcrypt
import logging

application = Flask(__name__)
CORS(application)

# Set up logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host="localhost",
            port=3307,
            user="root",
            password="",
            database="perfume_shop"
        )
        return connection
    except mysql.connector.Error as err:
        logger.error(f"Error connecting to the database: {err}")
        raise

@application.route('/perfumes', methods=['GET','POST'])
def all_perfumes():
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM perfumes")
        rows = cursor.fetchall()
    except mysql.connector.Error as err:
        logger.error(f"Error fetching perfumes: {err}")
        return jsonify({"error": "An error occurred. Please try again later."}), 500
    finally:
        cursor.close()
        db.close()
    
    return jsonify(rows)

@application.route('/logindatabase', methods=['POST'])
def all_logins():
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM logindatabase")
        rows = cursor.fetchall()
    except mysql.connector.Error as err:
        logger.error(f"Error fetching perfumes: {err}")
        return jsonify({"error": "An error occurred. Please try again later."}), 500
    finally:
        cursor.close()
        db.close()
    
    return jsonify(rows)

@application.route('/perfume/<int:id>', methods=['GET','POST'])
def get_perfume_by_id(id):
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM perfumes WHERE id = %s", (id,))
        perfume_data = cursor.fetchone()
    except mysql.connector.Error as err:
        logger.error(f"Error fetching perfume by ID {id}: {err}")
        return jsonify({"error": "An error occurred. Please try again later."}), 500
    finally:
        cursor.close()
        db.close()
    
    if perfume_data:
        return jsonify(perfume_data)
    else:
        return jsonify({"error": "Perfume not found"}), 404


@application.route('/perfumes', methods=['GET'])
def get_perfume_by_categories():
    categories = request.args.get('perfume_categories')
    if not categories:
        return jsonify({"error": "No category provided"}), 400
    
    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)

        # Use placeholder (?) for the category filter
        cursor.execute("SELECT * FROM perfumes WHERE perfume_categories = %s", (categories,))
        perfume_data = cursor.fetchall()
        
        cursor.close()
        db.close()
        
        if perfume_data:
            return jsonify(perfume_data)
        else:
            return jsonify({"error": "Perfume not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
@application.route('/search', methods=['GET','POST'])
def search_perfumes():
    query = request.args.get('perfume_name')
    if not query:
        return jsonify({"error": "No search query provided"}), 400

    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM perfumes WHERE perfume_name LIKE %s", ('%' + query + '%',))
        results = cursor.fetchall()
    except mysql.connector.Error as err:
        logger.error(f"Error searching perfumes with query {query}: {err}")
        return jsonify({"error": "An error occurred. Please try again later."}), 500
    finally:
        cursor.close()
        db.close()
    
    return jsonify(results)

@application.route('/add_user', methods=['GET', 'POST'])
def add_user():
    if request.method == 'POST':
        name = request.form['perfume_name']
        colour = request.form['perfume_colour']
        price = request.form['perfume_price']
        image = request.form['perfumeimage']
        id = request.form['id']
        category = request.form['perfume_categories']

        try:
            db = get_db_connection()
            cursor = db.cursor()
            cursor.execute("INSERT INTO perfumes (id, perfume_name, perfume_colour, perfume_price, perfumeimage, perfume_categories) VALUES (%s, %s, %s, %s, %s,%s)", (id, name, colour, price, image,category))
            db.commit()
        except mysql.connector.Error as err:
            logger.error(f"Error adding user: {err}")
            return jsonify({"error": "An error occurred. Please try again later."}), 500
        finally:
            cursor.close()
            db.close()
        
        return redirect(url_for('all_perfumes'))
    
    return render_template('add_user.html')
@application.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
 
    if not email or not password:
        return jsonify({"success": False, "message": "Please provide email and password"}), 400

    try:
        db = get_db_connection()
        cursor = db.cursor(dictionary=True)
        cursor.execute("SELECT * FROM logindatabase WHERE email = %s", (email,))
        user = cursor.fetchone()
    except mysql.connector.Error as err:
        logger.error(f"Error logging in user with email {email}: {err}")
        return jsonify({"success": False, "message": "An error occurred. Please try again later."}), 500
    finally:
        cursor.close()
        db.close()

    if user and bcrypt.checkpw(password.encode('utf-8'), user['password'].encode('utf-8')):
        return jsonify({"success": True, "message": "Login successful."})
    else:
        return jsonify({"success": False, "message": "Incorrect email or password."}), 401

@application.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({"success": False, "message": "Please provide email and password"}), 400

    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    try:
        db = get_db_connection()
        cursor = db.cursor()
        cursor.execute("INSERT INTO logindatabase (email, password) VALUES (%s, %s)", (email, hashed_password))
        db.commit()
    except mysql.connector.Error as err:
        logger.error(f"Error registering user with email {email}: {err}")
        return jsonify({"success": False, "message": "An error occurred. Please try again later."}), 500
    finally:
        cursor.close()
        db.close()

    return jsonify({"success": True, "message": "Registration successful."})       
 
if __name__ == "__main__":
    application.run(debug=True)
