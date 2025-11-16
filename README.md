# Cloud-Based Restaurant Reservation System


# Running the App

To run the application locally, follow these steps:

## Clone the Repository

Clone the repository using the following command:


git clone https://github.com/John-Paul-Alvarez/Restaurant-Reservation.git


## Navigate to the Directory

Navigate to the directory where you cloned the repository:


cd proj


## Start the Docker Container

Open your command line interface (CLI) or terminal in the directory where you cloned the repository and run the following command to start the Docker container:

docker-compose up


This command will build and start the Docker containers defined in the `docker-compose.yml` file.

## Access the Application

Once the Docker container is running, you can access the application by opening your web browser and navigating to the following URL:


http://localhost:3000


This URL will direct you to the app running on your local machine. You can now use the application as intended.

## Shutting Down the Application

To stop the application and shut down the Docker containers, you can press `Ctrl + C` in the terminal where you ran `docker-compose up`. This will gracefully stop the containers.

Alternatively, you can run the following command in the same directory to stop and remove the Docker containers:


docker-compose down


This command will stop and remove the containers defined in the `docker-compose.yml` file.
***************************************
***************************************
***************************************


## Product Vision

FOR restaurants and diners WHO seek a streamlined and efficient reservation management solution, THE Reserve system is a cloud-based reservation platform THAT facilitates seamless booking, management, and cancellation of reservations online. UNLIKE traditional reservation methods, such as phone calls or in-person bookings, OUR product offers a user-friendly interface accessible anytime, anywhere, enabling customers to easily reserve tables and providing restaurant staff with tools to efficiently manage booking availability and customer information.

## Goal
Restaurants, cafes, and eateries are the primary target customers for the Reserve system, as it enhances their operational efficiency, improves customer satisfaction, and ultimately boosts revenue by optimizing table utilization and minimizing reservation errors. Furthermore, the system offers valuable insights through analytics and notifications, empowering restaurant owners and managers to make data-driven decisions and deliver exceptional dining experiences.


## Target Audience:

### 1. Customers:
- Individuals seeking to make dining reservations conveniently and efficiently.
- Food enthusiasts looking for a hassle-free way to secure tables at their favorite restaurants.
- Groups planning gatherings, celebrations, or business meetings at restaurants and in need of reservation management.

### 2. Restaurant Staff:
- Managers: Responsible for overseeing reservation availability, optimizing table occupancy, and ensuring smooth operations.
- Hosts/Hostesses: Tasked with managing incoming reservations, seating arrangements, and guest interactions.
- Servers: Need access to reservation information to provide personalized service and accommodate special requests.
- Chefs and Kitchen Staff: Benefit from having visibility into reservation schedules to prepare for expected dining volumes.
- Administrators: Handle administrative tasks related to customer data, reservation records, and system maintenance.

## Key Features:
   - View and manage reservation details, including date, time, party size, and customer preferences.
   - Easily update reservation statuses (confirmed, pending, canceled) and availability in real-time.
   - Maintain a centralized database of customer profiles, including contact information, preferences, and dining history.
   - Receive automated notifications for new reservations, cancellations, and updates.
   - Implement secure user authentication mechanisms to control access levels for staff members.
   - Assign roles and permissions (manager, host/hostess, server) to regulate staff access to reservation management features.

## Problem Statement:

The current manual process of managing restaurant reservations often leads to inefficiencies, errors, and missed opportunities for revenue optimization. Restaurant staff face several challenges in handling reservation requests and maintaining booking availability effectively. These challenges include:

- Time-consuming manual entry of reservation details, increasing the risk of errors and oversights.
- Difficulty in managing fluctuating demand and optimizing table occupancy during peak hours or special events.
- Lack of centralized customer information, resulting in inconsistent service and missed opportunities for personalized experiences.
- Inadequate tools for automated notifications and reminders.

The system aims to address these challenges by providing restaurant staff with a comprehensive reservation management platform. By automating reservation processes, centralizing customer data, and facilitating communication and coordination among staff members, the system enhances operational efficiency, improves customer satisfaction, and ultimately drives revenue growth for the restaurant.

## Product Backlog:
   - As a new user, I want to create an account with my Username and password, so I can access the reservation system.
   - As a returning user, I want to log in to my account with my credentials, so I can manage my reservations and preferences.
   - As a user, I want the option to reset my password if I forget it, to regain access to my account.
   - As a customer, I want to select for available date, time, party size, and location so that I can make a reservation.
   - As a customer, I want a confirmation notification after successfully making a reservation.
   - As a restaurant staff member, I want to view incoming reservations with details such as date, time, party size, and customer contact information.
   - As a restaurant staff member, I want to confirm or reject reservations based on availability and preferences.
   - As a restaurant staff member, I want to update reservation statuses in real-time.
   - As a user, I want to view my reservation history and upcoming bookings.

## Sprint Planning:

Using days instead of weeks for sprint duration in this scenario aligns with the Agile principle of delivering value incrementally and frequently.

### Sprint 1 (Day 1-5):

#### Day 1-2 (Sprint Planning and Setup):
- Set up the development environment and establish project management tools.
- Define the sprint goals and prioritize user stories from the product backlog.

#### Day 3 (User Account Creation):
- Implement user account creation functionality.
- Develop the user interface for creating a new account.
- Include validation for username and password.

#### Day 4 (Reservation Making - Part 1):
- Implement basic reservation search functionality (date, time, party size, location).
- Develop the user interface for selecting reservation options.

#### Day 5 (Reservation Making - Part 2):
- Complete reservation making functionality, including confirmation notification.
- Test and validate the reservation creation process.

### Sprint 2 (Day 6-10):

#### Day 6 (Reservation Management for Restaurant Staff):
- Implement reservation management functionality for restaurant staff.
- Develop the user interface for viewing and managing incoming reservations.
- Include features for confirming, rejecting, and updating reservation statuses.

#### Day 7 (Notification System - Part 1):
- Set up notification system infrastructure.
- Implement basic notification functionality for customers and restaurant staff.

#### Day 8 (Notification System - Part 2):
- Complete notification system implementation, including email and SMS notifications.
- Test and validate notification delivery.

#### Day 9 (User Profile Management):
- Implement user profile management functionality.
- Develop the user interface for viewing reservation history and upcoming bookings.

#### Day 10 (Final Testing and Deployment):
- Perform comprehensive testing of all implemented features.
- Address any bugs or issues identified during testing.
- Prepare for deployment to production environment.

# Testing Server: Quick Guide

1. **Open Terminal**: Open your terminal.
2. **Navigate to Server Directory**: Use `cd` to go to your server directory.
3. **Go to Test Directory**: Move into the `test` directory.
4. **Choose Test**: Select the test script you want to run.
5. **Run Test**: Execute the chosen test script with `python`.
6. **Review Results**: Check the terminal for test results.
7. **Repeat**: Repeat for other tests as needed.

# Microservices Architecture

- **Overview:**
  - In this project, a microservices architecture has been adopted. This architecture is composed of several independent services, each responsible for specific functionalities. These services include the user service, authentication service, and reservation handling service.

- **Services:**
  - **User Service:**
    - Responsible for managing user-related tasks such as user registration, profile management, and user data storage.
  - **Authentication Service:**
    - Handles user authentication, login, and security features like token generation and validation.
  - **Reservation Handling Service:**
    - Manages all aspects of reservation functionalities including booking, cancellation, and modification.

- **Independence and Communication:**
  - Each service operates independently and communicates with others as needed. For instance:
    - The user service may interact with the authentication service to verify user credentials during login.
    - The reservation handling service might access user data from the user service when processing bookings.


# Software Architecture
- **Frontend (React):**
  - React was chosen for the frontend due to its widespread adoption, ease of maintenance, and ability to provide a rich user experience.

- **Backend (Python with HTTP Server):**
  - Python's HTTP server was selected for the backend due to its simplicity, flexibility, and seamless integration with the chosen frontend framework.

- **Database (MySQL):**
  - MySQL was chosen as the database management system for its reliability, scalability, and strong performance capabilities.
    

# Reflection

**Challenges Faced:**
- *Integration of Frontend, Backend, and Database:* 
- *Dockerization:*

**Lessons Learned:**
- *Deployment to AWS* .
- *User Authentication Using JWT Token:*

**Potential Areas for Future Development:**
- *Real-time Updates:*
- *Improved Scalability:*





