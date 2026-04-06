# Welcome to your CDK TypeScript project

This is a blank project for CDK development with TypeScript.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

* `npm run build`   compile typescript to js
* `npm run watch`   watch for changes and compile
* `npm run test`    perform the jest unit tests
* `npx cdk deploy`  deploy this stack to your default AWS account/region
* `npx cdk diff`    compare deployed stack with current state
* `npx cdk synth`   emits the synthesized CloudFormation template

aws api gateway urls for products lambda
GET -/products - https://7fovqra6y5.execute-api.us-east-1.amazonaws.com/prod/products/
GET - /products/{productid} - https://7fovqra6y5.execute-api.us-east-1.amazonaws.com/prod/products/{productid}