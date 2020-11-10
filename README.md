# pm2-ipc-test
I tried myself on pm2 by starting a node app in multiple instances so its more performant by doing load balancing... 
main purpose was to learn how to do inter process communication in pm2 which i needed for a bigger Project

***Note: Load Balancing did not work as expected on Windows, but did on Linux***


## Start the App 
go to root directory of this project and start it with pm2 by writing ```pm2 start .src/index.js``` into the terminal

### Starting the App with multiple Node Instances
just like you would normally start the app with pm2 but adding ´´´-i´´´ which tells pm2 to run in a cluster
and a number afterwards ```-1``` to run with all cores -1 or ```all``` if you want all or any number then it uses that number

***Example: ```pm2 start .src/index.js -i -1```***
