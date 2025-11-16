CREATE DATABASE IF NOT EXISTS db;

USE db;

CREATE TABLE customer (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    additional_customer_information VARCHAR(255)
);

INSERT INTO
    customer (
        username,
        password,
        email,
        additional_customer_information
    )
VALUES (
        'Anneta Konstantinides ',
        'aa',
        'customer1@example.com',
        'Regular customer'
    ),
    (
        'Ariel Klein',
        'hashed_password2',
        'customer2@example.com',
        'VIP customer'
    ),
    (
        'Alex Mierjeski',
        'hashed_password3',
        'customer3@example.com',
        'VIP customer'
    );

CREATE TABLE staff (
    staff_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE,
    role VARCHAR(50),
    additional_staff_information VARCHAR(255)
);

INSERT INTO
    staff (
        username,
        password,
        email,
        role,
        additional_staff_information
    )
VALUES (
        'manager1',
        'hashed_password1',
        'manager1@example.com',
        'manager',
        'Senior Manager'
    ),
    (
        'receptionist1',
        'hashed_password2',
        'receptionist1@example.com',
        'receptionist',
        'Front Desk'
    );

CREATE TABLE reservation (
    reservation_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT,
    reservation_date_time DATETIME,
    party_size INT,
    reservation_status VARCHAR(50),
    username VARCHAR(255),
    FOREIGN KEY (customer_id) REFERENCES customer (customer_id)
);

INSERT INTO
    reservation (
        customer_id,
        reservation_date_time,
        party_size,
        reservation_status,
        username
    )
VALUES (
        1,
        '2024-04-01 18:55:55',
        4,
        'pending',
        'Anneta Konstantinides'
    ),
    (
        2,
        '2024-04-02 19:55:55',
        2,
        'pending',
        'Ariel Klein'
    ),
    (
        3,
        '2024-04-02 20:55:55',
        3,
        'pending',
        'Alex Mierjeski'
    );

CREATE TABLE notification (
    notification_id INT AUTO_INCREMENT PRIMARY KEY,
    recipient_id INT,
    notification_type VARCHAR(50),
    message_content VARCHAR(255),
    timestamp TIMESTAMP,
    FOREIGN KEY (recipient_id) REFERENCES customer (customer_id) ON DELETE CASCADE,
    FOREIGN KEY (recipient_id) REFERENCES staff (staff_id) ON DELETE CASCADE
);

INSERT INTO
    notification (
        recipient_id,
        notification_type,
        message_content,
        timestamp
    )
VALUES (
        1,
        'reservation_confirmation',
        'Your reservation for April 1st at 6:00 PM has been confirmed.',
        CURRENT_TIMESTAMP
    ),
    (
        2,
        'reservation_confirmation',
        'Your reservation for April 2nd at 7:00 PM has been confirmed.',
        CURRENT_TIMESTAMP
    );