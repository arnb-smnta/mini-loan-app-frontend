import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function ButtonLoading() {
  return (
    <div className="flex justify-center">
      <Button disabled>
        <Loader2 className="animate-spin" />
        Please wait
      </Button>
    </div>
  );
}
