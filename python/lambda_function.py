import boto3
from uuid import uuid4
def lambda_handler(event, context):
    s3 = boto3.client("s3")
    dynamodb = boto3.resource('dynamodb')
    for record in event['Records']:
        bucket_name = record['s3']['bucket']['name']
        object_key = record['s3']['object']['key']
        event_name = record ['eventName']
        event_time = record['eventTime']
        dynamoTable = dynamodb.Table('newtable-359ee71')
        dynamoTable.put_item(
            Item={'Id': str(uuid4()), 'Bucket': bucket_name, 'Object': object_key, 'Event': event_name, 'EventTime': event_time})
