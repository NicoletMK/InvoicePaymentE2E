# Run e2e Test
Run ```npm run build``` and ```npm run start```, 
then run one of the command below in another terminal window to start Cypress and run E2E testing suite.

Instead of using cypress open in order to run the actual tests,  use cypress run in order to see all e2e tests running.

cypress open keeps running forever because it opens a browser where you can interact and see each test in action but executing them manually. Whereas cypress run will execute all tests in either headless (invisible) or headed (visible, with automated browser) mode.

In order to run the e2e tests, run the following in your terminal:

# Headless mode
```npm run cy:run -- --browser chrome --headless```

# Headed mode
```npm run cy:run -- --browser chrome --headed```
