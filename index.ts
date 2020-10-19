// Copyright 2016-2019, Pulumi Corporation.  All rights reserved.

import * as aws from "@pulumi/aws";
import * as pulumi from "@pulumi/pulumi";

// Create an s3 bucket to upload a new file.
const docsBucket = new aws.s3.Bucket("docs");

// Export the name of the bucket.
export const bucketName = docsBucket.id;

// Configure IAM so that the AWS Lambda has DynamoDB access.
const docsHandlerRole = new aws.iam.Role("docsHandlerRole", {
   assumeRolePolicy: {
      Version: "2012-10-17",
      Statement: [{
         Action: "sts:AssumeRole",
         Principal: {
            Service: "lambda.amazonaws.com",
         },
         Effect: "Allow",
         Sid: "",
      }],
   },
});
new aws.iam.RolePolicyAttachment("writeObjectDetails", {
   role: docsHandlerRole,
   policyArn: aws.iam.ManagedPolicies.AmazonDynamoDBFullAccess,
});

// Create a DynamoDB Table
const db = new aws.dynamodb.Table("newtable", {
    attributes: [
        { name: "Id", type: "S" },
    ],
    hashKey: "Id",
    readCapacity: 10,
    writeCapacity: 10,
});

// Create a lambda function and add a python file.
const pythonLambda = new aws.lambda.Function("aws-lambda-dynamodb-python", {
    runtime: aws.lambda.Python3d6Runtime,
    code: new pulumi.asset.AssetArchive({
        ".": new pulumi.asset.FileArchive("./python"),
    }),
    timeout: 5,
    handler: "lambda_function.lambda_handler",
    role: docsHandlerRole.arn
});

// Give the bucket permission to invoke the lambda and trigger lambda when any object is created in the bucket.
const permission = new aws.lambda.Permission("invokelambda", {
  function: pythonLambda,
  action: "lambda:InvokeFunction",
  principal: "s3.amazonaws.com", sourceArn: docsBucket.id.apply(bucketName => `arn:aws:s3:::${bucketName}`), });

const notification = new aws.s3.BucketNotification("onAnyObjectCreated", {
      bucket: docsBucket.id,
      lambdaFunctions: [{
          events: ["s3:ObjectCreated:*"],
          lambdaFunctionArn: pythonLambda.arn,
      }],
  })
