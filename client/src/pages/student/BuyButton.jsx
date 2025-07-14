import React from "react";

const BuyButton = ({ amount, courseId, userId, refetchCourse }) => {
  const handlePayment = async () => {
    try {
      const res = await fetch("http://localhost:8000/api/v1/payment/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();

      if (!data.success) {
        alert("❌ Failed to create Razorpay order.");
        return;
      }

      const options = {
        key: "rzp_test_7wAJNl44FVc9cR",
        amount: data.order.amount,
        currency: data.order.currency,
        order_id: data.order.id,
        name: "LMS Payment",
        description: "Course purchase",
        handler: async function (response) {
          alert(`✅ Payment successful! Payment ID: ${response.razorpay_payment_id}`);

          try {
            const saveRes = await fetch("http://localhost:8000/api/v1/purchase/save", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                userId,
                courseId,
                amount,
                paymentId: response.razorpay_payment_id,
                status: "success",
              }),
            });

            const saveData = await saveRes.json();

             // ✅ Immediately refetch course data so "Buy" becomes "Go to Lectures"
              if (refetchCourse) {
                await refetchCourse();
              }
            if (saveData.success) {
              alert("🎉 Purchase saved successfully!");

             
            } else {
              alert("⚠️ Purchase saved but enrollment failed.");
            }
          } catch (err) {
            console.error("Failed to save payment:", err);
            alert("Error saving purchase data.");
          }
        },
        prefill: {
          name: "Harsh Radadiya",
          email: "h@gmail.com",
        },
        theme: {
          color: "#3399cc",
        },
      };

      if (window.Razorpay) {
        const rzp = new window.Razorpay(options);
        rzp.open();
      } else {
        alert("Razorpay SDK not loaded.");
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert("Something went wrong while processing your payment.");
    }
  };

  return (
    <button
      onClick={handlePayment}
      className="w-full mt-auto cursor-pointer bg-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
    >
      Buy Course ₹{amount}
    </button>
  );
};

export default BuyButton;
