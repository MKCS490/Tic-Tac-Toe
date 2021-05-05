# Project 2

To use this repository, you must follow these steps: 
1. In your terminal run git clone https://github.com/NJIT-CS490-SP21/project2-mhk8/tree/milestone_1

## Requirements
1. Install npm by running npm install
2. Install all the program dependencies by running pip install -r requirements.txt
3. Run  `echo "DANGEROUSLY_DISABLE_HOST_CHECK=true" > .env.development.local`  in the project directory

## Running the Program  
1. Switch to the project directory
2. Run the command python app.py
3. Open a new terminal and switch to the project directory
4. While the python app.py is running in the old terminal run npm run start in the second terminal
5. Click on the preview button and view your newly created tic tac toe game!

## Deploying to Heroku

1. Run the command heroku login -i
2. Enter email and password
3. Create a Heroku app by running the following command heroku create --buildpack heroku/python
4. Add the nodejs buildpack by running heroku buildpacks:add --index 1 heroku/nodejs
6. push to heroku by running git push heroku milestone_1:main

## Additional Features

1. One feature I would like to add would be to create an option so players can rotate and take turns after every game. Right now, the same players play over and over again.
2. I would also like to add some more CSS beautification if I had more time. Unfortunately, react took most of the time.

## Technical Issues 

1. One issue I had was getting started with react. I was very confused and found it hard. It took me very long to make the tic tac toe game. I ended up following the tutorial linked in HW9 which used classes. Then I changed it over to functional react.
2. I had an issue updating the next player on 2 different windows. The board was updating but the player was not updating. So, player O could go twice. I ended up looking on stackoverflow and slack. I found out I was passing the nextplayer variable wrong on useEffect function.
