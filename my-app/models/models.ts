import dynamoose from "@/app/lib/dynamoose";
const { Schema, model } = dynamoose;

// Define schema WITHOUT manually declaring timestamp fields
const userSchema = new Schema({
  id: {
    type: String,
    hashKey: true,
  },
  username: String,
  email: {
    type: String,
    index: {
      name: "EmailIndex",
      type: "global",
    },
  },
  password: String,
});

// Create model (auto-creates the table)
export const User = model("Users", userSchema);
