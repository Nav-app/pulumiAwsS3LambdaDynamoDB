Host a Static Website on Amazon S3
A static website that uses S3's website support. For a detailed walkthrough of this example, see the tutorial Static Website on AWS S3.

Deploying and running the program
Note: some values in this example will be different from run to run. These values are indicated with ***.

Create a new stack:

$ pulumi stack init website-testing
Set the AWS region:

$ pulumi config set aws:region us-west-2
Create a Python virtualenv, activate it, and install dependencies:

This installs the dependent packages needed for our Pulumi program.

$ python3 -m venv venv
$ source venv/bin/activate
$ pip3 install -r requirements.txt
Run pulumi up to preview and deploy changes. After the preview is shown you will be prompted if you want to continue or not.

$ pulumi up
Previewing update (dev):

    Type                    Name                  Plan       
+   pulumi:pulumi:Stack     aws-py-s3-folder-dev  create     
+   ├─ aws:s3:Bucket        s3-website-bucket     create     
+   ├─ aws:s3:BucketObject  index.html            create     
+   ├─ aws:s3:BucketObject  python.png            create     
+   ├─ aws:s3:BucketObject  favicon.png           create     
+   └─ aws:s3:BucketPolicy  bucket-policy         create     

Resources:
    + 6 to create

Do you want to perform this update?
> yes
  no
  details
To see the resources that were created, run pulumi stack output:

$ pulumi stack output
Current stack outputs (2):
    OUTPUT                                           VALUE
    bucket_name                                      s3-website-bucket-***
    website_url                                      ***.s3-website-us-west-2.amazonaws.com
To see that the S3 objects exist, you can either use the AWS Console or the AWS CLI:

$ aws s3 ls $(pulumi stack output bucket_name)
2018-04-17 15:40:47      13731 favicon.png
2018-04-17 15:40:48        249 index.html
Open the site URL in a browser to see both the rendered HTML, the favicon, and Python splash image:

$ pulumi stack output website_url
***.s3-website-us-west-2.amazonaws.com
To clean up resources, run pulumi destroy and answer the confirmation question at the prompt.# Pulumi-aws-s3-lambda-dynamoDB
 Create and deploy a serverless application that processes uploads to a storage bucket and builds an index of the files in a database table
