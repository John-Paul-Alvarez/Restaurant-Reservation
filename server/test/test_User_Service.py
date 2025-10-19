import unittest
import json
import threading
import mysql.connector
from http.server import HTTPServer
from urllib.request import Request, urlopen
from unittest.mock import patch
from app import MyHTTPRequestHandler
from requests import post, put, delete
import sys
import os

# Add parent directory to Python path
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))



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


class TestUserService(unittest.TestCase): 
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

    # user =================================================================================================================================
    def test_customer_endpoint(self):
        # Mocking database connection and cursor execution
        with patch('app.connect_to_database', new=connect_to_database):

            # Sending request to the customer endpoint
            response = urlopen('http://localhost:5000/api/customer')
            data = response.read().decode('utf-8')
            print("Response data:", data)  # Debugging print
            customers = json.loads(data)

            # Assertions
            self.assertEqual(response.status, 200)
            # Add assertions based on the expected data from the database
            self.assertEqual(len(customers), 3)  # Assuming there are 3 customers in the database

    def test_customer_registration(self):
        # Mocking database connection and cursor execution
        with patch('app.connect_to_database', new=connect_to_database):
            # Sending POST request to the customer registration endpoint
            registration_data = {
                'username': 'new_user',
                'password': 'new_password',
                'email': 'new_user@example.com',
                'additionalInfo': 'New customer'
            }
            headers = {'Content-type': 'application/json'}
            request = Request('http://localhost:5000/api/customer/register', data=json.dumps(registration_data).encode('utf-8'), headers=headers, method='POST')
            response = urlopen(request)
            response_data = response.read().decode('utf-8')

            # Assertions
            self.assertEqual(response.status, 201)
            self.assertIn('Registration successful', response_data)
    
    def test_staff_endpoint(self):
        # Mocking database connection and cursor execution
        with patch('app.connect_to_database', new=connect_to_database):
            # Sending request to the staff endpoint
            response = urlopen('http://localhost:5000/api/staff')
            data = response.read().decode('utf-8')
            print("Response data:", data)  # Debugging print
            staffs = json.loads(data)

            # Assertions
            self.assertEqual(response.status, 200)
            # Add assertions based on the expected data from the database
            self.assertEqual(len(staffs), 2)  # Assuming there are 2 staff members in the database
    

    def test_staff_registration(self):
        # Mocking database connection and cursor execution
        with patch('app.connect_to_database', new=connect_to_database):
            # Sending POST request to the staff registration endpoint
            registration_data = {
                'username': 'new_staff',
                'password': 'new_password',
                'email': 'new_staff@example.com',
                'role': 'receptionist',
                'additionalInfo': 'New staff member'
            }
            headers = {'Content-type': 'application/json'}
            request = Request('http://localhost:5000/api/staff/register', data=json.dumps(registration_data).encode('utf-8'), headers=headers, method='POST')
            response = urlopen(request)
            response_data = response.read().decode('utf-8')

            # Assertions
            self.assertEqual(response.status, 201)
            self.assertIn('Staff registration successful', response_data)    


if __name__ == '__main__':
    unittest.main()
