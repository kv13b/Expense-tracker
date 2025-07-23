"use client";
import { Button } from "@/components/ui/button";
import { PenBox } from "lucide-react";
import React, { useState } from "react";
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
type BudgetType = {
  icon: string;
  Name: string;
  amount: number;
};
function EditBudget({ budgetList }: { budgetList: BudgetType }) {
  const [EmojiIcon, setEmojiIcon] = useState(budgetList.icon);
  const [OpenEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [Name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const onUpdateBudget = () => {};
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
                    defaultValue={budgetList.Name}
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
                        handleSubmit(e);
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
