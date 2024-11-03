"use client";

import { Button, Card, Select, TextInput } from "@repo/ui";
import { useState } from "react";
import { createOnRampTransaction } from "../app/lib/actions/createOnrampTransaction";

const SUPPORTED_BANKS = [
  {
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com",
  },
  {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/",
  },
];

export const AddMoney = () => {
  const [redirectUrl, setRedirectUrl] = useState(
    SUPPORTED_BANKS[0]?.redirectUrl
  );
  const [provider, setProvider] = useState(SUPPORTED_BANKS[0]?.name || "");
  const [value, setValue] = useState(0);
  return (
    <Card title="Add Money">
      <div className="w-full">
        <TextInput
          placeholder={"Amount"}
          onChange={(val) => {
            setValue(Number(val));
          }}
          label={"Amount"}
        ></TextInput>
        <div className="py-4 text-left">Bank</div>
        <Select
          label="Bank"
          options={SUPPORTED_BANKS.map((x) => ({
            key: x.name,
            value: x.redirectUrl,
          }))}
          onSelect={(value) => {
            setRedirectUrl(
              SUPPORTED_BANKS.find((x) => x.name === value)?.redirectUrl || ""
            );
            setProvider(
              SUPPORTED_BANKS.find((x) => x.name === value)?.name || ""
            );
          }}
          className="pt-4"
        ></Select>
        <div className="flex justify-center pt-4">
          <Button
            onClick={async () => {
              await createOnRampTransaction(provider, value);
              window.location.href = redirectUrl || "";
            }}
          >
            Add Money
          </Button>
        </div>
      </div>
    </Card>
  );
};
