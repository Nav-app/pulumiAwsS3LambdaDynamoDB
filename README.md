# Pulumi-aws-s3-lambda-dynamoDB
### Create and deploy a AWS Lambda application that processes uploads to a storage bucket and builds an index of the files in a DynamoDB table.
 
Below mentioned are list of tasks to be performed.
-   Create an S3 Bucket
-   Create an IAM Role for lambda to access DynamoDB
-   Create a DynamoDB Table
-   Create a Lambda Function which gets triggered on an addition to s3 bucket

Use the sequence:
1. Set up Pulumi
` $ install pulumi'`
2. Create a new directory for your project and change into it.
`$ mkdir <Directory> && cd <Directory> `
3. Pull down your project to get started.
   ` $ pulumi new <https://github.com....> -s <workspace>/dev`
4. Deploy Project
   ` $ pulumi up`
