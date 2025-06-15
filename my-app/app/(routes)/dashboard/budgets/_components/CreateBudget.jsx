import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
function CreateBudget() {
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
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CreateBudget;
