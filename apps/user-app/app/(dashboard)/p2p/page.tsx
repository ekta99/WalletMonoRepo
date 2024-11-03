import prisma from "@repo/db/client";
import { OnRampTransaction } from "../../../components/OnRampTransaction";
import { SendCard } from "../../../components/SendCard";
import { getServerSession } from "next-auth";
import { authOptions } from "../../lib/auth";

async function getP2PTransactions() {
  const session = await getServerSession(authOptions);
  const p2p = await prisma.p2PTransfer.findMany({
    where: {
      fromUserId: Number(session?.user?.id),
    },
  });
  return p2p.map((t) => ({
    time: t.timestamp,
    amount: t.amount,
    toUserId: t.toUserId,
  }));
}

export default async function () {
  const transactions = await getP2PTransactions();
  return (
    <div className="w-screen">
      <SendCard></SendCard>
      <OnRampTransaction transactions={transactions} />
    </div>
  );
}
