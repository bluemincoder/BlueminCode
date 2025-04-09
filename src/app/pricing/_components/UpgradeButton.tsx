"use client";
import { Zap } from "lucide-react";

import React, { useState } from "react";
import Script from "next/script";

declare global {
    interface Window {
        Razorpay: any;
    }
}

export default function UpgradeButton() {
    const CHEKOUT_URL = "/payment";

    const AMOUNT = 1999;
    const [isProcessing, setIsProcessing] = useState(false);

    const handlePayment = async () => {
        setIsProcessing(true);

        try {
            const response = await fetch("/api/create-order", {
                method: "POST",
            });

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`Server error: ${response.status} - ${text}`);
            }

            const data = await response.json();

            if (!data.orderId) {
                throw new Error("Order ID not found in response");
            }

            const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID, // ✅ Must be public
                amount: AMOUNT,
                currency: "INR",
                name: "BlueminCode",
                description: "Payment for BlueminCode Pro",
                order_id: data.orderId,
                handler: (response: any) => {
                    console.log("✅ Payment Successful", response);
                    // TODO: Send to Convex DB if needed
                },
                prefill: {
                    name: "John Doe",
                    email: "john@example.com",
                    // contact: "9999999999",
                },
                theme: {
                    color: "black",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("❌ Error in Payment:", error);
            alert("Something went wrong while processing the payment.");
        } finally {
            setIsProcessing(false);
        }
    };
    return (
        <button
            className="inline-flex items-center justify-center gap-2 px-8 py-4 text-white 
        bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg 
        hover:from-blue-600 hover:to-blue-700 transition-all"
            onClick={handlePayment}
            disabled={isProcessing}
        >
            <Script src="https://checkout.razorpay.com/v1/checkout.js" />
            <Zap className="w-5 h-5" />
            Upgrade to Pro
        </button>
    );
}
