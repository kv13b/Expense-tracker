"use client";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import EmojiPicker from "emoji-picker-react";
import { getCookie } from "cookies-next/client";
import { toast } from "sonner";
type BudgetType = {
  icon: string;
  name: string;
  amount: number;
  expenseId: string;
};
function EditBudget({
  budgetList,
  RefreshExpense,
}: {
  budgetList: BudgetType;
  RefreshExpense: () => void;
}) {
  const [EmojiIcon, setEmojiIcon] = useState(budgetList?.icon);
  const [OpenEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [Name, setName] = useState(budgetList.name);
  const [amount, setAmount] = useState(budgetList.amount);
  const [open, setOpen] = useState(false);
  const onUpdateBudget = async (e: any) => {
    e.preventDefault();
    const userid = getCookie("userid");
    const data = {
      userid,
      Name,
      amount: Number(amount),
      icon: EmojiIcon,
      expenseId: budgetList.expenseId,
    };
    try {
      const res = await fetch(`/api/budget/`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Failed to update ");
      }
      console.log(res);
      toast("Budget Updted Successfully");
      RefreshExpense();
    } catch (err) {
      console.log(err);
      toast("Error updating budget" + err);
    }
  };
  useEffect(() => {
    if (budgetList) {
      setEmojiIcon(budgetList?.icon);
      setAmount(budgetList.amount);
      setName(budgetList.name);
    }
  }, []);
  console.log(budgetList);
  return (
    <div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger>
          <Button>
            <PenBox />
            Edit
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Budget</DialogTitle>
            <DialogDescription>
              <div className="mt-5">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setOpenEmojiPicker(!OpenEmojiPicker)}
                >
                  {EmojiIcon}
                </Button>
                <div className="absolute z-20">
                  <EmojiPicker
                    open={OpenEmojiPicker}
                    onEmojiClick={(e) => {
                      setEmojiIcon(e.emoji);
                      setOpenEmojiPicker(false);
                    }}
                  />
                </div>
                <div className="my-2">
                  <h2 className="text-black font-medium my-1">Budget Name</h2>
                  <Input
                    placeholder="Ex:Grocery Budget"
                    defaultValue={budgetList.name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="my-2">
                  <h2 className="text-black font-medium my-1">Budget Amount</h2>
                  <Input
                    type="number"
                    placeholder="Ex:₹5000"
                    defaultValue={budgetList.amount}
                    onChange={(e) => setAmount(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && Name && amount) {
                        onUpdateBudget(e);
                      }
                    }}
                  />
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild>
              <Button
                disabled={!(Name && amount)}
                className="mt-5 w-full"
                onClick={onUpdateBudget}
              >
                Update Budget
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default EditBudget;
