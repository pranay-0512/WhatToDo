# adb_test-master
 This is the repository for the adbrew_test.
 

Watch the working.mp4 video to see the working solution.


For local setup, 

1.Clone this repository
git clone https://github.com/adbrew/test.git


2.Change into the cloned directory and set the environment variable for the code path. Replace path_to_repository appropriately.

export ADBREW_CODEBASE_PATH="{path_to_repository}/test/src"


3.Build container (you only need to build containers for the first time or if you change image definition, i.e., Dockerfile). This step will take a good amount of time.

docker-compose build

If any issue occurs while building, toggle the command in the dockerfile - RUN easy_install pip


4.Once the build is completed, start the containers:
docker-compose up -d


5.Once complete, docker ps should output something like this:
CONTAINER ID   IMAGE               COMMAND                  CREATED         STATUS         PORTS                      NAMES
e445be7efa61   adbrew_test_api     "bash -c 'cd /src/re…"   3 minutes ago   Up 2 seconds   0.0.0.0:8000->8000/tcp     api
0fd203f12d8a   adbrew_test_app     "bash -c 'cd /src/ap…"   4 minutes ago   Up 3 minutes   0.0.0.0:3000->3000/tcp     app
884cb9296791   adbrew_test_mongo   "/usr/bin/mongod --b…"   4 minutes ago   Up 3 minutes   0.0.0.0:27017->2701        mongo

The localhost:3000 (react app) will take some time.
Once built, you can access http://localhost:3000 and http://localhost:8000/todos .

The app is built such that not webpage refresh is required for updation of any changes made in the backend and/or database.

Any changes in the backend and/or database, the change will be reflected in the frontend and vice-versa.
