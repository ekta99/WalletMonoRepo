"use client";

import { Button, Card, Center, TextInput } from "@repo/ui";
import { useState } from "react";
import { p2pTransfer } from "../app/lib/actions/p2pTransfer";

export function SendCard() {
  const [number, setNumber] = useState("");
  const [amount, setAmount] = useState("");

  return (
    <div className="h-[90vh]">
      <Center>
        <Card title="Send">
          <div className="min-w-72 pt-2">
            <TextInput
              placeholder="Number"
              label="Number"
              onChange={(val) => {
                setNumber(val);
              }}
            />
            <TextInput
              placeholder="Amount"
              label="Amount"
              onChange={(val) => {
                setAmount(val);
              }}
            />
            <div className="pt-4 flex justify-center">
              <Button
                onClick={async () => {
                  await p2pTransfer(number, Number(amount) * 100);
                }}
              >
                Send
              </Button>
            </div>
          </div>
        </Card>
      </Center>
    </div>
  );
}
