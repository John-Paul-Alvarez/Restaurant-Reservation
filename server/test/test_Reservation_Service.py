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


class TestReservationService(unittest.TestCase): 
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
    

    def test_reservation_update_status(self):
        # Mocking database connection and cursor execution
        with patch('app.connect_to_database', new=connect_to_database):
            # Sending PUT request to update reservation status
            update_data = {'status': 'confirmed'}
            headers = {'Content-type': 'application/json'}
            url = 'http://localhost:5000/api/update-status/1'  # Assuming updating reservation with ID 1
            response = put(url, json=update_data, headers=headers)

            # Assertions
            self.assertEqual(response.status_code, 200)
            self.assertIn('Reservation status updated successfully', response.json().get('message'))

    def test_delete_reservation(self):
        # Mocking database connection and cursor execution
        with patch('app.connect_to_database', new=connect_to_database):
            # Sending DELETE request to delete reservation
            headers = {'Content-type': 'application/json'}
            url = 'http://localhost:5000/api/delete-reservation/1'  # Assuming deleting reservation with ID 1
            response = delete(url, headers=headers)

            # Assertions
            self.assertEqual(response.status_code, 200)
            self.assertIn('Reservation deleted successfully', response.json().get('message'))

    def test_create_reservation(self):
        # Mocking database connection and cursor execution
        with patch('app.connect_to_database', new=connect_to_database):
            # Sending POST request to create reservation
            reservation_data = {
                'customer_id': 4,
                'reservation_date_time': '2024-04-03 18:00:00',
                'party_size': 6,
                'username': 'customer4'
            }
            headers = {'Content-type': 'application/json'}
            url = 'http://localhost:5000/api/create-reservation'
            response = post(url, json=reservation_data, headers=headers)

            # Assertions
            self.assertEqual(response.status_code, 500)


if __name__ == '__main__':
    unittest.main()
