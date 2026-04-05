"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeployLambdaAndApiService = exports.LambdaAndApiDeploymentStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const constructs_1 = require("constructs");
const path_1 = __importDefault(require("path"));
// import * as sqs from 'aws-cdk-lib/aws-sqs';
class LambdaAndApiDeploymentStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        // example resource
        // const queue = new sqs.Queue(this, 'InfraQueue', {
        //   visibilityTimeout: cdk.Duration.seconds(300)
        // });
        new DeployLambdaAndApiService(this, "lambdaAndApiDeployment");
    }
}
exports.LambdaAndApiDeploymentStack = LambdaAndApiDeploymentStack;
class DeployLambdaAndApiService extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        const lambdaFunction = new aws_cdk_lib_1.aws_lambda.Function(this, "getProductList", {
            runtime: aws_cdk_lib_1.aws_lambda.Runtime.NODEJS_20_X,
            memorySize: 1024,
            timeout: aws_cdk_lib_1.Duration.seconds(5),
            functionName: 'getProductList',
            handler: 'getProductListHandler.handler',
            code: aws_cdk_lib_1.aws_lambda.Code.fromAsset(path_1.default.join(__dirname, "../dist/handlers/getProductList"))
        });
        const lambdaFunction2 = new aws_cdk_lib_1.aws_lambda.Function(this, "getProductsById", {
            runtime: aws_cdk_lib_1.aws_lambda.Runtime.NODEJS_20_X,
            memorySize: 1024,
            timeout: aws_cdk_lib_1.Duration.seconds(5),
            functionName: 'getProductsById',
            handler: "getProductsByIdHandler.handler",
            code: aws_cdk_lib_1.aws_lambda.Code.fromAsset(path_1.default.join(__dirname, "../dist/handlers/getProductsById"))
        });
        const api = new aws_cdk_lib_1.aws_apigateway.RestApi(this, "task2ApiGateWayPeer", {
            restApiName: "My API Gateway",
            description: "This API serves the Lambda functions"
        });
        const lambdaIntegration = new aws_cdk_lib_1.aws_apigateway.LambdaIntegration(lambdaFunction, {});
        const lambdaIntegration2 = new aws_cdk_lib_1.aws_apigateway.LambdaIntegration(lambdaFunction2, {});
        const productsResource = api.root.addResource("products");
        productsResource.addMethod("GET", lambdaIntegration);
        const productByIdResource = productsResource.addResource("{productId}");
        productByIdResource.addMethod("GET", lambdaIntegration2);
    }
}
exports.DeployLambdaAndApiService = DeployLambdaAndApiService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mcmEtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmZyYS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw2Q0FBb0Y7QUFDcEYsMkNBQXVDO0FBQ3ZDLGdEQUF3QjtBQUN4Qiw4Q0FBOEM7QUFFOUMsTUFBYSwyQkFBNEIsU0FBUSxtQkFBSztJQUNwRCxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQWtCO1FBQzFELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXhCLDZDQUE2QztRQUU3QyxtQkFBbUI7UUFDbkIsb0RBQW9EO1FBQ3BELGlEQUFpRDtRQUNqRCxNQUFNO1FBQ04sSUFBSSx5QkFBeUIsQ0FBQyxJQUFJLEVBQUUsd0JBQXdCLENBQUMsQ0FBQTtJQUMvRCxDQUFDO0NBQ0Y7QUFaRCxrRUFZQztBQUlELE1BQWEseUJBQTBCLFNBQVEsc0JBQVM7SUFDdEQsWUFBWSxLQUFlLEVBQUUsRUFBUztRQUNwQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFBO1FBRWhCLE1BQU0sY0FBYyxHQUFHLElBQUksd0JBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQ3JFLE9BQU8sRUFBRSx3QkFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ3ZDLFVBQVUsRUFBQyxJQUFJO1lBQ2YsT0FBTyxFQUFDLHNCQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzQixZQUFZLEVBQUUsZ0JBQWdCO1lBQzlCLE9BQU8sRUFBQywrQkFBK0I7WUFDdkMsSUFBSSxFQUFDLHdCQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxpQ0FBaUMsQ0FBQyxDQUFDO1NBRXhGLENBQUMsQ0FBQztRQUVILE1BQU0sZUFBZSxHQUFHLElBQUksd0JBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO1lBQ3ZFLE9BQU8sRUFBQyx3QkFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQ3RDLFVBQVUsRUFBQyxJQUFJO1lBQ2YsT0FBTyxFQUFDLHNCQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUMzQixZQUFZLEVBQUUsaUJBQWlCO1lBQy9CLE9BQU8sRUFBQyxnQ0FBZ0M7WUFDeEMsSUFBSSxFQUFDLHdCQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxrQ0FBa0MsQ0FBQyxDQUFDO1NBQ3pGLENBQUMsQ0FBQTtRQUVGLE1BQU0sR0FBRyxHQUFHLElBQUksNEJBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLHFCQUFxQixFQUFFO1lBQ2hFLFdBQVcsRUFBQyxnQkFBZ0I7WUFDNUIsV0FBVyxFQUFDLHNDQUFzQztTQUNyRCxDQUFDLENBQUM7UUFFSCxNQUFNLGlCQUFpQixHQUFHLElBQUksNEJBQWMsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDbkYsTUFBTSxrQkFBa0IsR0FBRyxJQUFJLDRCQUFjLENBQUMsaUJBQWlCLENBQUMsZUFBZSxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXJGLE1BQU0sZ0JBQWdCLEdBQUcsR0FBRyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDMUQsZ0JBQWdCLENBQUMsU0FBUyxDQUFDLEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO1FBRXJELE1BQU0sbUJBQW1CLEdBQUcsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3hFLG1CQUFtQixDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsa0JBQWtCLENBQUMsQ0FBQztJQUczRCxDQUFDO0NBR0Y7QUF6Q0QsOERBeUNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHthd3NfYXBpZ2F0ZXdheSwgYXdzX2xhbWJkYSwgRHVyYXRpb24sIFN0YWNrLCBTdGFja1Byb3BzfSBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xuLy8gaW1wb3J0ICogYXMgc3FzIGZyb20gJ2F3cy1jZGstbGliL2F3cy1zcXMnO1xuXG5leHBvcnQgY2xhc3MgTGFtYmRhQW5kQXBpRGVwbG95bWVudFN0YWNrIGV4dGVuZHMgU3RhY2sge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wcz86IFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcblxuICAgIC8vIFRoZSBjb2RlIHRoYXQgZGVmaW5lcyB5b3VyIHN0YWNrIGdvZXMgaGVyZVxuXG4gICAgLy8gZXhhbXBsZSByZXNvdXJjZVxuICAgIC8vIGNvbnN0IHF1ZXVlID0gbmV3IHNxcy5RdWV1ZSh0aGlzLCAnSW5mcmFRdWV1ZScsIHtcbiAgICAvLyAgIHZpc2liaWxpdHlUaW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygzMDApXG4gICAgLy8gfSk7XG4gICAgbmV3IERlcGxveUxhbWJkYUFuZEFwaVNlcnZpY2UodGhpcywgXCJsYW1iZGFBbmRBcGlEZXBsb3ltZW50XCIpXG4gIH1cbn1cblxuXG5cbmV4cG9ydCBjbGFzcyBEZXBsb3lMYW1iZGFBbmRBcGlTZXJ2aWNlIGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6Q29uc3RydWN0LCBpZDpzdHJpbmcpe1xuICAgIHN1cGVyKHNjb3BlLCBpZClcblxuICAgIGNvbnN0IGxhbWJkYUZ1bmN0aW9uID0gbmV3IGF3c19sYW1iZGEuRnVuY3Rpb24odGhpcywgXCJnZXRQcm9kdWN0TGlzdFwiLCB7XG4gICAgICBydW50aW1lOiBhd3NfbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzIwX1gsXG4gICAgICBtZW1vcnlTaXplOjEwMjQsXG4gICAgICB0aW1lb3V0OkR1cmF0aW9uLnNlY29uZHMoNSksXG4gICAgICBmdW5jdGlvbk5hbWU6ICdnZXRQcm9kdWN0TGlzdCcsXG4gICAgICBoYW5kbGVyOidnZXRQcm9kdWN0TGlzdEhhbmRsZXIuaGFuZGxlcicsXG4gICAgICBjb2RlOmF3c19sYW1iZGEuQ29kZS5mcm9tQXNzZXQocGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi9kaXN0L2hhbmRsZXJzL2dldFByb2R1Y3RMaXN0XCIpKVxuICAgICAgXG4gICAgfSk7XG5cbiAgICBjb25zdCBsYW1iZGFGdW5jdGlvbjIgPSBuZXcgYXdzX2xhbWJkYS5GdW5jdGlvbih0aGlzLCBcImdldFByb2R1Y3RzQnlJZFwiLCB7XG4gICAgICBydW50aW1lOmF3c19sYW1iZGEuUnVudGltZS5OT0RFSlNfMjBfWCxcbiAgICAgIG1lbW9yeVNpemU6MTAyNCxcbiAgICAgIHRpbWVvdXQ6RHVyYXRpb24uc2Vjb25kcyg1KSxcbiAgICAgIGZ1bmN0aW9uTmFtZTogJ2dldFByb2R1Y3RzQnlJZCcsXG4gICAgICBoYW5kbGVyOlwiZ2V0UHJvZHVjdHNCeUlkSGFuZGxlci5oYW5kbGVyXCIsXG4gICAgICBjb2RlOmF3c19sYW1iZGEuQ29kZS5mcm9tQXNzZXQocGF0aC5qb2luKF9fZGlybmFtZSwgXCIuLi9kaXN0L2hhbmRsZXJzL2dldFByb2R1Y3RzQnlJZFwiKSlcbiAgICB9KVxuXG4gICAgY29uc3QgYXBpID0gbmV3IGF3c19hcGlnYXRld2F5LlJlc3RBcGkodGhpcywgXCJ0YXNrMkFwaUdhdGVXYXlQZWVyXCIsIHtcbiAgICAgICAgcmVzdEFwaU5hbWU6XCJNeSBBUEkgR2F0ZXdheVwiLFxuICAgICAgICBkZXNjcmlwdGlvbjpcIlRoaXMgQVBJIHNlcnZlcyB0aGUgTGFtYmRhIGZ1bmN0aW9uc1wiXG4gICAgfSk7XG5cbiAgICBjb25zdCBsYW1iZGFJbnRlZ3JhdGlvbiA9IG5ldyBhd3NfYXBpZ2F0ZXdheS5MYW1iZGFJbnRlZ3JhdGlvbihsYW1iZGFGdW5jdGlvbiwge30pO1xuICAgIGNvbnN0IGxhbWJkYUludGVncmF0aW9uMiA9IG5ldyBhd3NfYXBpZ2F0ZXdheS5MYW1iZGFJbnRlZ3JhdGlvbihsYW1iZGFGdW5jdGlvbjIsIHt9KTtcblxuICAgIGNvbnN0IHByb2R1Y3RzUmVzb3VyY2UgPSBhcGkucm9vdC5hZGRSZXNvdXJjZShcInByb2R1Y3RzXCIpO1xuICAgIHByb2R1Y3RzUmVzb3VyY2UuYWRkTWV0aG9kKFwiR0VUXCIsIGxhbWJkYUludGVncmF0aW9uKTtcblxuICAgIGNvbnN0IHByb2R1Y3RCeUlkUmVzb3VyY2UgPSBwcm9kdWN0c1Jlc291cmNlLmFkZFJlc291cmNlKFwie3Byb2R1Y3RJZH1cIik7XG4gICAgcHJvZHVjdEJ5SWRSZXNvdXJjZS5hZGRNZXRob2QoXCJHRVRcIiwgbGFtYmRhSW50ZWdyYXRpb24yKTtcblxuXG4gIH1cblxuXG59XG5cbiJdfQ==