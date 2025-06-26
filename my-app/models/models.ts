import dynamoose from "@/app/lib/dynamoose";
const { Schema, model } = dynamoose;

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
//budget main tb
const BudgetSchema = new Schema({
  userId: {
    type: String,
    hashKey: true,
  },
  expenseId: {
    type: String,
    rangeKey: true,
  },
  amount: Number,
  currency: {
    type: String,
    default: "INR",
  },
  name: String,
  date: String,
  icon: String,
  createdAt: String,
  updatedAt: String,
});
const ExpenseSchema = new Schema({
  userId: {
    type: String,
    hashKey: true,
  },
  SingleExpenseId: {
    type: String,
    rangeKey: true,
  },
  BudgetId: String,
  amount: Number,
  currency: {
    type: String,
    default: "INR",
  },
  name: String,
  date: String,
  icon: String,
  createdAt: String,
  updatedAt: String,
  imageUrl: String, //future purpose
});
export const Expense = model("Expense", ExpenseSchema);
export const Budget = model("Budgets", BudgetSchema);
export const User = model("Users", userSchema);
