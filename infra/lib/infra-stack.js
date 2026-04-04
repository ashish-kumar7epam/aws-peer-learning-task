"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeployMentService = exports.DeployWebAppStack = void 0;
const aws_cdk_lib_1 = require("aws-cdk-lib");
const constructs_1 = require("constructs");
// import * as sqs from 'aws-cdk-lib/aws-sqs';
const path = __importStar(require("path"));
const relativePath = "../../dist";
class DeployWebAppStack extends aws_cdk_lib_1.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        // example resource
        // const queue = new sqs.Queue(this, 'InfraQueue', {
        //   visibilityTimeout: cdk.Duration.seconds(300)
        // });
        new DeployMentService(this, 'deployment');
    }
}
exports.DeployWebAppStack = DeployWebAppStack;
class DeployMentService extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        const hostingBucket = new aws_cdk_lib_1.aws_s3.Bucket(this, "FrontEndBucketPeer", {
            blockPublicAccess: aws_cdk_lib_1.aws_s3.BlockPublicAccess.BLOCK_ALL,
            removalPolicy: aws_cdk_lib_1.RemovalPolicy.DESTROY
        });
        const originAccessIdentity = new aws_cdk_lib_1.aws_cloudfront.OriginAccessIdentity(this, 'OriginAccessIdentityPeer', {
            comment: 'Allow CloudFront to access the frontend bucket'
        });
        hostingBucket.grantRead(originAccessIdentity);
        const distribution = new aws_cdk_lib_1.aws_cloudfront.Distribution(this, "CloudfrontDistributionPeer", {
            defaultBehavior: {
                origin: new aws_cdk_lib_1.aws_cloudfront_origins.S3Origin(hostingBucket, {
                    originAccessIdentity,
                }),
                viewerProtocolPolicy: aws_cdk_lib_1.aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
            },
            defaultRootObject: "index.html",
            errorResponses: [
                {
                    httpStatus: 404,
                    responseHttpStatus: 200,
                    responsePagePath: "/index.html"
                }
            ]
        });
        new aws_cdk_lib_1.aws_s3_deployment.BucketDeployment(this, "BucketDeploymentPeer", {
            sources: [aws_cdk_lib_1.aws_s3_deployment.Source.asset(path.join(__dirname, relativePath))],
            destinationBucket: hostingBucket,
            distribution,
            distributionPaths: ["/*"]
        });
        new aws_cdk_lib_1.CfnOutput(this, "CloudFrontURLPeer", {
            value: distribution.domainName,
            description: "The distribution URL",
            exportName: "CloudfrontURLPeer"
        });
        new aws_cdk_lib_1.CfnOutput(this, "BucketNamePeer", {
            value: hostingBucket.bucketName,
            description: "The name of the s3 bucket",
            exportName: "BucketNamePeer"
        });
    }
}
exports.DeployMentService = DeployMentService;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mcmEtc3RhY2suanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmZyYS1zdGFjay50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSw2Q0FBK0k7QUFDL0ksMkNBQXVDO0FBQ3ZDLDhDQUE4QztBQUM5QywyQ0FBNkI7QUFDN0IsTUFBTSxZQUFZLEdBQUcsWUFBWSxDQUFBO0FBRWpDLE1BQWEsaUJBQWtCLFNBQVEsbUJBQUs7SUFDMUMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFrQjtRQUMxRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUV4Qiw2Q0FBNkM7UUFFN0MsbUJBQW1CO1FBQ25CLG9EQUFvRDtRQUNwRCxpREFBaUQ7UUFDakQsTUFBTTtRQUVOLElBQUksaUJBQWlCLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO0lBQzVDLENBQUM7Q0FFRjtBQWRELDhDQWNDO0FBRUQsTUFBYSxpQkFBa0IsU0FBUSxzQkFBUztJQUM5QyxZQUFZLEtBQWdCLEVBQUUsRUFBVTtRQUN0QyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sYUFBYSxHQUFHLElBQUksb0JBQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQ2xFLGlCQUFpQixFQUFFLG9CQUFNLENBQUMsaUJBQWlCLENBQUMsU0FBUztZQUNyRCxhQUFhLEVBQUUsMkJBQWEsQ0FBQyxPQUFPO1NBQ3JDLENBQUMsQ0FBQztRQUVILE1BQU0sb0JBQW9CLEdBQUcsSUFBSSw0QkFBYyxDQUFDLG9CQUFvQixDQUFDLElBQUksRUFBRSwwQkFBMEIsRUFBRTtZQUNyRyxPQUFPLEVBQUUsZ0RBQWdEO1NBQzFELENBQUMsQ0FBQztRQUVILGFBQWEsQ0FBQyxTQUFTLENBQUMsb0JBQW9CLENBQUMsQ0FBQztRQUU5QyxNQUFNLFlBQVksR0FBRyxJQUFJLDRCQUFjLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSw0QkFBNEIsRUFBRTtZQUN2RixlQUFlLEVBQUM7Z0JBQ2QsTUFBTSxFQUFFLElBQUksb0NBQXNCLENBQUMsUUFBUSxDQUFDLGFBQWEsRUFBRTtvQkFDekQsb0JBQW9CO2lCQUNyQixDQUFDO2dCQUNGLG9CQUFvQixFQUFFLDRCQUFjLENBQUMsb0JBQW9CLENBQUMsaUJBQWlCO2FBQzVFO1lBQ0QsaUJBQWlCLEVBQUUsWUFBWTtZQUMvQixjQUFjLEVBQUM7Z0JBQ2I7b0JBQ0UsVUFBVSxFQUFDLEdBQUc7b0JBQ2Qsa0JBQWtCLEVBQUMsR0FBRztvQkFDdEIsZ0JBQWdCLEVBQUMsYUFBYTtpQkFDL0I7YUFDRjtTQUNGLENBQUMsQ0FBQztRQUVILElBQUksK0JBQWlCLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLHNCQUFzQixFQUFFO1lBQ25FLE9BQU8sRUFBQyxDQUFDLCtCQUFpQixDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUM1RSxpQkFBaUIsRUFBQyxhQUFhO1lBQy9CLFlBQVk7WUFDWixpQkFBaUIsRUFBQyxDQUFDLElBQUksQ0FBQztTQUN6QixDQUFDLENBQUM7UUFFSCxJQUFJLHVCQUFTLENBQUMsSUFBSSxFQUFFLG1CQUFtQixFQUFFO1lBQ3ZDLEtBQUssRUFBQyxZQUFZLENBQUMsVUFBVTtZQUM3QixXQUFXLEVBQUMsc0JBQXNCO1lBQ2xDLFVBQVUsRUFBQyxtQkFBbUI7U0FDL0IsQ0FBQyxDQUFDO1FBRUgsSUFBSSx1QkFBUyxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtZQUNwQyxLQUFLLEVBQUMsYUFBYSxDQUFDLFVBQVU7WUFDOUIsV0FBVyxFQUFDLDJCQUEyQjtZQUN2QyxVQUFVLEVBQUMsZ0JBQWdCO1NBQzVCLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQW5ERCw4Q0FtREMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge2F3c19jbG91ZGZyb250LCBTdGFjayx0eXBlIFN0YWNrUHJvcHMsIGF3c19jbG91ZGZyb250X29yaWdpbnMsIGF3c19zMywgYXdzX3MzX2RlcGxveW1lbnQsIENmbk91dHB1dCwgUmVtb3ZhbFBvbGljeX0gZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG4vLyBpbXBvcnQgKiBhcyBzcXMgZnJvbSAnYXdzLWNkay1saWIvYXdzLXNxcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gXCJwYXRoXCI7XG5jb25zdCByZWxhdGl2ZVBhdGggPSBcIi4uLy4uL2Rpc3RcIlxuXG5leHBvcnQgY2xhc3MgRGVwbG95V2ViQXBwU3RhY2sgZXh0ZW5kcyBTdGFjayB7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzPzogU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuXG4gICAgLy8gVGhlIGNvZGUgdGhhdCBkZWZpbmVzIHlvdXIgc3RhY2sgZ29lcyBoZXJlXG5cbiAgICAvLyBleGFtcGxlIHJlc291cmNlXG4gICAgLy8gY29uc3QgcXVldWUgPSBuZXcgc3FzLlF1ZXVlKHRoaXMsICdJbmZyYVF1ZXVlJywge1xuICAgIC8vICAgdmlzaWJpbGl0eVRpbWVvdXQ6IGNkay5EdXJhdGlvbi5zZWNvbmRzKDMwMClcbiAgICAvLyB9KTtcblxuICAgIG5ldyBEZXBsb3lNZW50U2VydmljZSh0aGlzLCAnZGVwbG95bWVudCcpO1xuICB9XG4gIFxufVxuXG5leHBvcnQgY2xhc3MgRGVwbG95TWVudFNlcnZpY2UgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIGNvbnN0IGhvc3RpbmdCdWNrZXQgPSBuZXcgYXdzX3MzLkJ1Y2tldCh0aGlzLCBcIkZyb250RW5kQnVja2V0UGVlclwiLCB7XG4gICAgICBibG9ja1B1YmxpY0FjY2VzczogYXdzX3MzLkJsb2NrUHVibGljQWNjZXNzLkJMT0NLX0FMTCxcbiAgICAgIHJlbW92YWxQb2xpY3k6IFJlbW92YWxQb2xpY3kuREVTVFJPWVxuICAgIH0pO1xuXG4gICAgY29uc3Qgb3JpZ2luQWNjZXNzSWRlbnRpdHkgPSBuZXcgYXdzX2Nsb3VkZnJvbnQuT3JpZ2luQWNjZXNzSWRlbnRpdHkodGhpcywgJ09yaWdpbkFjY2Vzc0lkZW50aXR5UGVlcicsIHtcbiAgICAgIGNvbW1lbnQ6ICdBbGxvdyBDbG91ZEZyb250IHRvIGFjY2VzcyB0aGUgZnJvbnRlbmQgYnVja2V0J1xuICAgIH0pO1xuXG4gICAgaG9zdGluZ0J1Y2tldC5ncmFudFJlYWQob3JpZ2luQWNjZXNzSWRlbnRpdHkpO1xuXG4gICAgY29uc3QgZGlzdHJpYnV0aW9uID0gbmV3IGF3c19jbG91ZGZyb250LkRpc3RyaWJ1dGlvbih0aGlzLCBcIkNsb3VkZnJvbnREaXN0cmlidXRpb25QZWVyXCIsIHtcbiAgICAgIGRlZmF1bHRCZWhhdmlvcjp7XG4gICAgICAgIG9yaWdpbjogbmV3IGF3c19jbG91ZGZyb250X29yaWdpbnMuUzNPcmlnaW4oaG9zdGluZ0J1Y2tldCwge1xuICAgICAgICAgIG9yaWdpbkFjY2Vzc0lkZW50aXR5LFxuICAgICAgICB9KSxcbiAgICAgICAgdmlld2VyUHJvdG9jb2xQb2xpY3k6IGF3c19jbG91ZGZyb250LlZpZXdlclByb3RvY29sUG9saWN5LlJFRElSRUNUX1RPX0hUVFBTXG4gICAgICB9LFxuICAgICAgZGVmYXVsdFJvb3RPYmplY3Q6IFwiaW5kZXguaHRtbFwiLFxuICAgICAgZXJyb3JSZXNwb25zZXM6W1xuICAgICAgICB7XG4gICAgICAgICAgaHR0cFN0YXR1czo0MDQsXG4gICAgICAgICAgcmVzcG9uc2VIdHRwU3RhdHVzOjIwMCxcbiAgICAgICAgICByZXNwb25zZVBhZ2VQYXRoOlwiL2luZGV4Lmh0bWxcIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfSk7XG5cbiAgICBuZXcgYXdzX3MzX2RlcGxveW1lbnQuQnVja2V0RGVwbG95bWVudCh0aGlzLCBcIkJ1Y2tldERlcGxveW1lbnRQZWVyXCIsIHtcbiAgICAgIHNvdXJjZXM6W2F3c19zM19kZXBsb3ltZW50LlNvdXJjZS5hc3NldChwYXRoLmpvaW4oX19kaXJuYW1lLCByZWxhdGl2ZVBhdGgpKV0sXG4gICAgICBkZXN0aW5hdGlvbkJ1Y2tldDpob3N0aW5nQnVja2V0LFxuICAgICAgZGlzdHJpYnV0aW9uLFxuICAgICAgZGlzdHJpYnV0aW9uUGF0aHM6W1wiLypcIl1cbiAgICB9KTtcblxuICAgIG5ldyBDZm5PdXRwdXQodGhpcywgXCJDbG91ZEZyb250VVJMUGVlclwiLCB7XG4gICAgICB2YWx1ZTpkaXN0cmlidXRpb24uZG9tYWluTmFtZSxcbiAgICAgIGRlc2NyaXB0aW9uOlwiVGhlIGRpc3RyaWJ1dGlvbiBVUkxcIixcbiAgICAgIGV4cG9ydE5hbWU6XCJDbG91ZGZyb250VVJMUGVlclwiXG4gICAgfSk7XG5cbiAgICBuZXcgQ2ZuT3V0cHV0KHRoaXMsIFwiQnVja2V0TmFtZVBlZXJcIiwge1xuICAgICAgdmFsdWU6aG9zdGluZ0J1Y2tldC5idWNrZXROYW1lLFxuICAgICAgZGVzY3JpcHRpb246XCJUaGUgbmFtZSBvZiB0aGUgczMgYnVja2V0XCIsXG4gICAgICBleHBvcnROYW1lOlwiQnVja2V0TmFtZVBlZXJcIlxuICAgIH0pO1xuICB9XG59XG4iXX0=