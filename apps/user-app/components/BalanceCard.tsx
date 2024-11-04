import { Card } from "@repo/ui";

export const BalanceCard = ({
  amount,
  locked,
}: {
  amount: number;
  locked: number;
}) => {
  return (
    <Card title="Balance">
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div> Unblocked balance</div>
        <div>{amount / 100} INR</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div> Total locked balance</div>
        <div>{locked / 100} INR</div>
      </div>
      <div className="flex justify-between border-b border-slate-300 pb-2">
        <div> Total balance</div>
        <div>{(locked + amount) / 100} INR</div>
      </div>
    </Card>
  );
};