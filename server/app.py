from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import mysql.connector
from urllib.parse import urlparse, parse_qs
from werkzeug.security import generate_password_hash, check_password_hash
import jwt

def connect_to_database():
    return mysql.connector.connect(
        user='root', password='root', host='mysql', port="3306", database='db'
    )

class MyHTTPRequestHandler(BaseHTTPRequestHandler):
    def do_GET(self):
        if self.path.startswith('/api/customer'):
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()

            conn = connect_to_database()
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM customer")
            customers = cursor.fetchall()
            print("Customers fetched:", customers)
            cursor.close()
            conn.close()

            self.wfile.write(json.dumps(customers).encode())
        elif self.path.startswith('/api/staff'):
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()

            conn = connect_to_database()
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM staff")
            staffs = cursor.fetchall()
            cursor.close()
            conn.close()

            self.wfile.write(json.dumps(staffs).encode())
        elif self.path.startswith('/api'):
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()

            conn = connect_to_database()
            cursor = conn.cursor(dictionary=True)
            cursor.execute("SELECT * FROM reservation")
            reservations = cursor.fetchall()
            cursor.close()
            conn.close()

            # Convert datetime objects to string format
            for reservation in reservations:
                reservation['reservation_date_time'] = reservation['reservation_date_time'].strftime('%Y-%m-%d %H:%M:%S')

            self.wfile.write(json.dumps(reservations).encode())
        else:
            self.send_error(404, "Not Found")

    def do_PUT(self):
        if self.path.startswith('/api/update-status'):
            parsed_path = urlparse(self.path)
            reservation_id = int(parsed_path.path.split('/')[-1])
            
            content_length = int(self.headers['Content-Length'])
            put_data = self.rfile.read(content_length)
            put_data = json.loads(put_data.decode('utf-8'))
            new_status = put_data.get('status')

            conn = connect_to_database()
            cursor = conn.cursor()
            try:
                cursor.execute("UPDATE reservation SET reservation_status = %s WHERE reservation_id = %s", (new_status, reservation_id))
                conn.commit()
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'message': 'Reservation status updated successfully'}).encode())
            except Exception as e:
                conn.rollback()
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode())
            finally:
                cursor.close()
                conn.close()
        else:
            self.send_error(404, "Not Found")

    def do_DELETE(self):
        if self.path.startswith('/api/delete-reservation'):
            parsed_path = urlparse(self.path)
            reservation_id = int(parsed_path.path.split('/')[-1])

            conn = connect_to_database()
            cursor = conn.cursor()
            try:
                cursor.execute("DELETE FROM reservation WHERE reservation_id = %s", (reservation_id,))
                conn.commit()
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'message': 'Reservation deleted successfully'}).encode())
            except Exception as e:
                conn.rollback()
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode())
            finally:
                cursor.close()
                conn.close()
        else:
            self.send_error(404, "Not Found")

    def do_POST(self):
        if self.path.startswith('/api/create-reservation'):
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            post_data = json.loads(post_data.decode('utf-8'))

            conn = connect_to_database()
            cursor = conn.cursor()
            try:
                cursor.execute("INSERT INTO reservation (customer_id, reservation_date_time, party_size, reservation_status, username) VALUES (%s, %s, %s, %s, %s)", (post_data['customer_id'], post_data['reservation_date_time'], post_data['party_size'], 'pending', post_data['username']))
                conn.commit()
                self.send_response(201)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'message': 'Reservation created successfully'}).encode())
            except Exception as e:
                conn.rollback()
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode())
            finally:
                cursor.close()
                conn.close()
        elif self.path.startswith('/api/customer/register'):
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            post_data = json.loads(post_data.decode('utf-8'))

            username = post_data.get('username')
            password = post_data.get('password')
            email = post_data.get('email')
            additional_info = post_data.get('additionalInfo')

            conn = connect_to_database()
            cursor = conn.cursor()
            try:
                cursor.execute("SELECT * FROM customer WHERE username = %s", (username,))
                existing_user = cursor.fetchone()
                if existing_user:
                    self.send_response(400)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': 'Username already exists'}).encode())
                else:
                    hashed_password = generate_password_hash(password)
                    cursor.execute(
                        "INSERT INTO customer (username, password, email, additional_customer_information) "
                        "VALUES (%s, %s, %s, %s)",
                        (username, hashed_password, email, additional_info)
                    )
                    conn.commit()
                    new_customer_id = cursor.lastrowid  # ✅ Get the new id

                    self.send_response(201)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({
                        'message': 'Registration successful',
                        'customer_id': new_customer_id  # ✅ Return ID
                    }).encode())
            except Exception as e:
                conn.rollback()
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode())
            finally:
                cursor.close()
                conn.close()
        elif self.path.startswith('/api/staff/register'):
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            post_data = json.loads(post_data.decode('utf-8'))

            username = post_data.get('username')
            password = post_data.get('password')
            email = post_data.get('email')
            role = post_data.get('role')
            additional_info = post_data.get('additionalInfo')

            conn = connect_to_database()
            cursor = conn.cursor()
            try:
                cursor.execute("SELECT * FROM staff WHERE username = %s", (username,))
                existing_user = cursor.fetchone()
                if existing_user:
                    self.send_response(400)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'error': 'Username already exists'}).encode())
                else:
                    hashed_password = generate_password_hash(password)
                    cursor.execute("INSERT INTO staff (username, password, email, role, additional_staff_information) VALUES (%s, %s, %s, %s, %s)", (username, hashed_password, email, role, additional_info))
                    conn.commit()
                    self.send_response(201)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'message': 'Staff registration successful'}).encode())
            except Exception as e:
                conn.rollback()
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode())
            finally:
                cursor.close()
                conn.close()
        elif self.path.startswith('/api/customer/login'):
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            post_data = json.loads(post_data.decode('utf-8'))

            username = post_data.get('username')
            password = post_data.get('password')

            conn = connect_to_database()
            cursor = conn.cursor(dictionary=True)
            try:
                cursor.execute("SELECT * FROM customer WHERE username = %s", (username,))
                user = cursor.fetchone()
                cursor.close()
                conn.close()

                ok = False
                if user:
                    stored_pw = user['password']  # may be hashed or plain (from seed)
                    # If it looks like a Werkzeug hash, verify properly; otherwise compare plain
                    if isinstance(stored_pw, str) and stored_pw.startswith('pbkdf2:'):
                        ok = check_password_hash(stored_pw, password)
                    else:
                        ok = (stored_pw == password)

                if ok:
                    token = jwt.encode({'username': username, 'role': 'customer'}, 'secret_key', algorithm='HS256')
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({
                        'token': token,
                        'customer_id': user['customer_id']  # ✅ send id back
                    }).encode())
                else:
                    self.send_response(401)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'message': 'Invalid credentials'}).encode())
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode())
        elif self.path.startswith('/api/staff/login'):
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            post_data = json.loads(post_data.decode('utf-8'))

            username = post_data.get('username')
            password = post_data.get('password')

            conn = connect_to_database()
            cursor = conn.cursor(dictionary=True)
            try:
                cursor.execute("SELECT * FROM staff WHERE username = %s", (username,))
                staff = cursor.fetchone()
                cursor.close()
                conn.close()

                if staff and check_password_hash(staff['password'], password):
                    # Encode username and role into the JWT token
                    token = jwt.encode({'username': username, 'role': 'staff'}, 'secret_key', algorithm='HS256')
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'token': token}).encode())
                else:
                    self.send_response(401)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({'message': 'Invalid credentials'}).encode())
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode())
        elif self.path.startswith('/api/decode-token'):
            try:
                # Get the token from the request body
                content_length = int(self.headers['Content-Length'])
                post_data = self.rfile.read(content_length)
                data = json.loads(post_data.decode('utf-8'))
                token = data.get('token')

                # Decode the token
                decoded_token = jwt.decode(token, 'secret_key', algorithms=['HS256'])

                # Extract the role from the decoded token
                role = decoded_token.get('role')

                # Return the role
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'role': role}).encode())

            except jwt.ExpiredSignatureError:
                self.send_response(401)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'Token expired'}).encode())
            except jwt.InvalidTokenError:
                self.send_response(401)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': 'Invalid token'}).encode())
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': str(e)}).encode())
        else:
            self.send_error(404, "Not Found")

def run(server_class=HTTPServer, handler_class=MyHTTPRequestHandler, port=5000):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print(f"Server running on port {port}")
    httpd.serve_forever()

if __name__ == "__main__":
    run()
