import {aws_cloudfront, Stack,type StackProps, aws_cloudfront_origins, aws_s3, aws_s3_deployment, CfnOutput, RemovalPolicy} from 'aws-cdk-lib';
import { aws_lambda, Duration } from 'aws-cdk-lib';
import { aws_apigateway } from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import * as path from "path";
const relativePathFrontend = "../../dist"

export class DeployWebAppStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'InfraQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });

    new DeployMentService(this, 'deployment');
  }
  
}

export class DeployMentService extends Construct {
  constructor(scope: Construct, id: string) {
    super(scope, id);

    const hostingBucket = new aws_s3.Bucket(this, "FrontEndBucketPeer", {
      blockPublicAccess: aws_s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: RemovalPolicy.DESTROY
    });

    const originAccessIdentity = new aws_cloudfront.OriginAccessIdentity(this, 'OriginAccessIdentityPeer', {
      comment: 'Allow CloudFront to access the frontend bucket'
    });

    hostingBucket.grantRead(originAccessIdentity);

    const distribution = new aws_cloudfront.Distribution(this, "CloudfrontDistributionPeer", {
      defaultBehavior:{
        origin: new aws_cloudfront_origins.S3Origin(hostingBucket, {
          originAccessIdentity,
        }),
        viewerProtocolPolicy: aws_cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS
      },
      defaultRootObject: "index.html",
      errorResponses:[
        {
          httpStatus:404,
          responseHttpStatus:200,
          responsePagePath:"/index.html"
        }
      ]
    });

    new aws_s3_deployment.BucketDeployment(this, "BucketDeploymentPeer", {
      sources:[aws_s3_deployment.Source.asset(path.join(__dirname, relativePathFrontend))],
      destinationBucket:hostingBucket,
      distribution,
      distributionPaths:["/*"]
    });

    new CfnOutput(this, "CloudFrontURLPeer", {
      value:distribution.domainName,
      description:"The distribution URL",
      exportName:"CloudfrontURLPeer"
    });

    new CfnOutput(this, "BucketNamePeer", {
      value:hostingBucket.bucketName,
      description:"The name of the s3 bucket",
      exportName:"BucketNamePeer"
    });
  }
}

