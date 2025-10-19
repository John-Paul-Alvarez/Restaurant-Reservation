import unittest
import json
import threading
import mysql.connector
from http.server import HTTPServer
from urllib.request import Request, urlopen
from unittest.mock import patch
from app import MyHTTPRequestHandler
from requests import post, put, delete


# Define the database connection function
def connect_to_database():
    try:
        conn = mysql.connector.connect(
            user='root', password='root', host='mysql', port="3306", database='db'
        )
        print("Connected to MySQL successfully!")
        return conn
    except mysql.connector.Error as err:
        print(f"Error connecting to MySQL: {err}")
        return None


class TestAuthService(unittest.TestCase): 
    @classmethod
    def setUpClass(cls):
        cls.server_address = ('localhost', 5000)
        cls.server = HTTPServer(cls.server_address, MyHTTPRequestHandler)
        cls.server_thread = threading.Thread(target=cls.server.serve_forever)
        cls.server_thread.daemon = True
        cls.server_thread.start()

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.server_thread.join()

    def test_customer_login_endpoint(self):
        # Mocking database connection and cursor execution
        with patch('app.connect_to_database', new=connect_to_database):
            # Sending POST request to the customer login endpoint
            login_data = {'username': 'aa', 'password': 'aa'}
            headers = {'Content-type': 'application/json'}
            url = 'http://localhost:5000/api/customer/login'
            response = post(url, json=login_data, headers=headers)

            # Assertions
            self.assertEqual(response.status_code, 401)

    def test_staff_login_endpoint(self):
        # Mocking database connection and cursor execution
        with patch('app.connect_to_database', new=connect_to_database):
            # Sending POST request to the staff login endpoint
            login_data = {'username': 'manager1', 'password': 'hashed_password1'}
            headers = {'Content-type': 'application/json'}
            url = 'http://localhost:5000/api/staff/login'
            response = post(url, json=login_data, headers=headers)

            # Assertions
            self.assertEqual(response.status_code, 401)


if __name__ == '__main__':
    unittest.main()
