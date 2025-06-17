"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

function CreateBudget() {
  const [EmojiIcon, setEmojiIcon] = useState("😀");
  const [OpenEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [Name, setName] = useState("");
  const [amount, setAmount] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      Name,
      amount: parseFloat(amount),
      icon: EmojiIcon,
    };
    try {
      const response = await fetch("/api/budget", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        const errorData = await response.json();
        toast(errorData.error || "Failed to create budget");
        return;
      }
      setName("");
      setAmount("");
      setCategory("");
      setEmojiIcon("😀");
      setOpenEmojiPicker(false);
      toast("Budget created successfully");
    } catch (error) {
      console.error("Budget creation error:", error);
      toast("An error occurred while creating budget");
    }
  };
  return (
    <Dialog aschild>
      <DialogTrigger>
        {" "}
        <div>
          <div
            className="bg-slate-100 p-10 rounded-md items-center flex flex-col border-2 border-dashed
      cursor-pointer hover:shadow-md"
          >
            <h2 className="text-3xl">+</h2>
          </div>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Budget</DialogTitle>
          <DialogDescription>
            <div className="mt-5">
              <Button
                variant="outline"
                size="lg"
                onClick={() => setOpenEmojiPicker(!OpenEmojiPicker)}
              >
                {EmojiIcon}
              </Button>
              <div className="absolute">
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
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="my-2">
                <h2 className="text-black font-medium my-1">Budget Amount</h2>
                <Input
                  type="number"
                  placeholder="Ex:$5000"
                  onChange={(e) => setAmount(e.target.value)}
                />
              </div>
              <Button disabled={!(Name && amount)} className="mt-5 w-full">
                Create Budget
              </Button>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CreateBudget;
