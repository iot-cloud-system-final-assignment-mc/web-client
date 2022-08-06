#!/bin/bash -x
APP_SITE_BUCKET=$(aws cloudformation list-exports --query "Exports[?Name=='Cloud-Systems-IoT-ApplicationSiteBucket'].Value" --output text )
APP_SITE_URL=$(aws cloudformation list-exports --query "Exports[?Name=='Cloud-Systems-IoT-ApplicationSite'].Value" --output text )

cd application

echo "Configuring environment for App Client"

npm install && npm run build

echo "aws s3 sync --delete --cache-control no-store build s3://$APP_SITE_BUCKET"
aws s3 sync --delete --cache-control no-store build s3://$APP_SITE_BUCKET 

if [[ $? -ne 0 ]]; then
    exit 1
fi

echo "Completed configuring environment for App Client"

echo "Application site URL: https://$APP_SITE_URL"
echo "Successfully completed deployment"






