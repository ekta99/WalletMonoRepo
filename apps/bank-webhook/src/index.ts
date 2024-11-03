import db from "@repo/db/client";
import express from "express";

const app = express();
app.use(express.json());

app.post("/hdfcWebhook", async (req, res) => {
  //TODO: Add zod validation here
  // check if this request actually came from hdfc bank => use a webhook secret here

  const paymentInformation = {
    token: req.body.token,
    userId: req.body.user_identifier,
    amount: req.body.amount,
  };
  const onRampTx = await db.onRampTransaction.findFirst({
    where: {
      userId: paymentInformation.userId,
    },
  });
  if (onRampTx?.status === "Success") {
    res.status(401).json({
      message: "Transaction is already successful",
    });
    return;
  }
  try {
    console.log(paymentInformation.amount, paymentInformation.userId);
    await db.$transaction([
      db.balance.upsert({
        where: {
          userId: Number(paymentInformation.userId),
        },
        create: {
          userId: paymentInformation.userId,
          amount: Number(paymentInformation.amount),
          locked: 0,
        },
        update: {
          amount: {
            increment: Number(paymentInformation.amount),
          },
        },
      }),

      db.onRampTransaction.update({
        where: {
          token: paymentInformation.token,
        },
        data: {
          status: "Success",
        },
      }),
    ]);
    res.status(200).json({
      message: "captured",
    });
  } catch (e) {
    console.error(e);
    res.status(411).json({
      message: "Error while processing webhook",
    });
  }
});

app.listen(3003);
