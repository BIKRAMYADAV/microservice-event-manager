EventHive - Distributed Ticket Booking System For Events

It is a microservice architecture based ticket booking platform designed to handle high concurrency seat locking and booking using Redis and Mongo backed distributed locking and Saga-based orchestration.

Architecture Overview -
    1. API Gateway
    2. Auth service
    3. Event service
    4. Booking service
    5. Seat service
    6. Redis (for distributed locking)
    7. MongoDB (for persistent  storage)

Tech Stack-
    1. Backend : Node, Express, JWT for auth
    2. DB : MongoDB, Redis (for seat locking)
    3. DevOps: Docker, DockerCompose, CI/Cd using Github actions
    4. Architecture: Microservices

System Features-
    1. Distributed seat locking using redis, bulk seat creation for admin
    2. Saga based booking orchestration ( looking forward to event driven using kafka)
    3. auto-expiring locks (Redis)
    4. rate limiting at gateway
    5. health checks

System Design highlights -
    1. Mongo acts as a backup in case the Redis one fails as well as it provides persistent storage as compared to  Redis, which is mainly used for locking mechanism.
    2. I implemented orchestration over event driven choreography in v1 of this project owing to complexity constraints and also noting the smaller scale of it at present.

RUn the project -
    docker-compose up --build


Future-
    1. conversion to event driven choreography using kafka
    2. payment gateway integration
    3. kubernetes deployment

