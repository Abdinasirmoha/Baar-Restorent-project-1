const printReceipt = (order) => {
  console.log("\n🧾 NEW ORDER RECEIVED");
  console.log("=====================");

  order.items.forEach((item) => {
    console.log(
      `${item.name} x${item.quantity} = $${item.price * item.quantity}`
    );
  });

  console.log("---------------------");
  console.log("TOTAL:", order.total);
  console.log("ADDRESS:", order.address);
  console.log("STATUS:", order.status);
  console.log("=====================\n");
};

module.exports = printReceipt;