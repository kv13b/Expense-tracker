import dynamoose from "dynamoose";

dynamoose.aws.ddb.local(); // Optional: for local dev
dynamoose.aws.sdk.config.update({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

export default dynamoose;
