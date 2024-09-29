/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import JSONPretty from "react-json-pretty";
import "../../styles/JsonStyle.css";
import { Button } from "../ui/button";
import { useState } from "react";
import { getButtonVariant, handleCopy } from "@/util/copyButtonHandle";
import React from "react";

const RequestBodyDialog = ({ requestBody }: { requestBody: object | null }) => {
  const [copyStatus, setCopyStatus] = useState<string>(
    "Copy Body to Clipboard"
  );

  return (
    <Dialog onOpenChange={() => setCopyStatus("Copy Body to Clipboard")}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-4 right-4 w-fit" variant="teal">
          Show request body
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Request Body</DialogTitle>
          <DialogDescription>
            The request body sent to the server. You can copy the JSON below and
            use it.
          </DialogDescription>
        </DialogHeader>
        {requestBody && (
          <>
            <div className="mb-4">
              <JSONPretty data={requestBody} />
            </div>
            <Button
              onClick={() => handleCopy(requestBody, setCopyStatus)}
              variant={getButtonVariant(copyStatus, "teal")}
            >
              {copyStatus}
            </Button>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default RequestBodyDialog;
