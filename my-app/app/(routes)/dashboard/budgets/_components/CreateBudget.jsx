"use client";
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
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { getCookie } from "cookies-next/client";
import { Loader } from "lucide-react";
function CreateBudget({ refreshData }) {
  const [EmojiIcon, setEmojiIcon] = useState("😀");
  const [OpenEmojiPicker, setOpenEmojiPicker] = useState(false);
  const [Name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [open, setOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const userid = getCookie("userid");
    const data = {
      userid,
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
        setLoading(true);
        const errorData = await response.json();
        toast(errorData.error || "Failed to create budget");
        return;
      }
      setLoading(false);
      setName("");
      setAmount("");
      setEmojiIcon("😀");
      setOpenEmojiPicker(false);
      setOpen(false);
      refreshData();
      toast("Budget created successfully");
    } catch (error) {
      console.error("Budget creation error:", error);
      toast("An error occurred while creating budget");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
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
                  value={Name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="my-2">
                <h2 className="text-black font-medium my-1">Budget Amount</h2>
                <Input
                  type="number"
                  placeholder="Ex:₹5000"
                  value={amount}
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
              onClick={handleSubmit}
            >
              {Loading ? <Loader className="animate-spin" /> : "Create Budget"}
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default CreateBudget;
