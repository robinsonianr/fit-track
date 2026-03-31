# Fitness Tracker

[![Codacy Badge](https://app.codacy.com/project/badge/Grade/2da72f82744a4ef682f455cd080f427f)](https://app.codacy.com/gh/robinsonianr/fitness-tracker/dashboard?utm_source=gh&utm_medium=referral&utm_content=&utm_campaign=Badge_grade)![example workflow](https://github.com/robinsonianr/fitness-tracker/actions/workflows/backend-cd.yml/badge.svg) ![example workflow](https://github.com/robinsonianr/fitness-tracker/actions/workflows/frontend-cd.yml/badge.svg)

## Table of Contents

-   [Prequisites](#prerequisites)
-   [Setup](#setup)
-   [Build and Run](#build)
-   [Contributing](#contributing)

### Prerequisites

- Java 17+ (Liberica or Zulu) compatible & uses Gradle 7.6.1
- Node.js 18+
- For Windows haved WSL installed if starting application with docker containers
- Recommended IDE IntelliJ

### Setup
1. Clone the repository.
   
    ```sh
    git clone https://github.com/robinsonianr/fit-track.git
    ```
   
2. Navigate to the project UI directory.
   ```sh
    `cd fit-track-ui/react`
   ```
3. Install node package dependencies.
   
    ```sh
    npm install
    ```
   
4. Database setup
   
   - Install Docker Desktop and enable Docker terminal in the settings then restart Docker Desktop.
     
   In Docker terminal or WSL run the following command below.
   ```sh
   docker run -d --name fit-db \
   -e POSTGRES_USER=postgres \
   -e POSTGRES_PASSWORD=root1234 \
   -e POSTGRES_DB=fit-tracker \
   -p 5432:5432 \
   --restart always \
   postgres:15-alpine
   ```
      
   - Run `docker ps` to see if the container is running; if not, run `docker start fit-db`.
  
   - In IntelliJ or preferred DB manager, add datasource to database tool by entering the URL `jdbc:postgresql://localhost:5432/fit-tracker` and add user and password.
  
   - After successfully connecting to db, add schema to the db called `fit_tracker`.

## Build

### Here's how you can build and run application

#### Build and run application manually
1. Build and run the application.
   - Build and run the application (recommend Intellij but can use your preferred IDE).
   - In root of project run `.\gradlew build` (If using an IDE other than Intellij)
   - Then run application `.\gradlew run` (If using an IDE other than Intellij)
2. Start UI
    change directory with `cd fit-track-ui/react`
   ```sh
   npm run start
   ```
   - Open a web browser and navigate to [http://localhost:5173](http://localhost:5173).
  
> Or

#### Start application using Docker container  
Change directory to the root of the project

```sh
cd [location of project]
```
Then run start script
> MacOS

```sh
sh start-fit-track.sh
```
> WSL
```sh
./start-fit-track.sh
```

Output should look like this:
<img width="1579" height="381" alt="Screenshot 2026-03-31 183037" src="https://github.com/user-attachments/assets/b3d9064c-4568-4acc-a6d8-012b4d5a4ab7" />

Access fit-track locally at [http://localhost:5173](http://localhost:5173)

Development Url:
- http://fit-track-dev.eba-jpnjhwum.us-east-1.elasticbeanstalk.com

Test Account Credentials:
- Email: test123@gmail.com
- Password: Test123


## Contributing

We welcome contributions from the community to contribute to this project. Please follow these guidelines:

1. Fork or clone the repository to your local machine.
2. Create a new branch for your feature or bug fix.
3. Make your changes and test them thoroughly.
4. Submit a pull request and fill out the PR template with details of changes.
