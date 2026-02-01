import { useState } from "react";
import { Check, Star, Clock, Award, UserCheck } from "lucide-react";
import { subscription } from "../../Laravel/Subscription";

function Plans() {
  const [loadingPlan, setLoadingPlan] = useState("");

  const handleSubscribe = async (plan) => {
    setLoadingPlan(plan);
    try {
      const response = await subscription.createSubscription(plan);
      if (response.success) {
        window.location.href = response.data;
      }
    } catch (error) {
      alert("Something went wrong!");
      console.log(error);
    } finally {
      setLoadingPlan("");
    }
  };

  const plans = [
    {
      name: "Monthly Plan",
      price: "$5 / month",
      features: [
        { icon: UserCheck, text: "Blue Tick Verification" },
        { icon: Star, text: "Premium Badge" },
        { icon: Clock, text: "Cancel anytime" },
      ],
      type: "monthly",
      highlight: false,
    },
    {
      name: "Yearly Plan",
      price: "$50 / year",
      features: [
        { icon: Check, text: "Everything in Monthly" },
        { icon: Award, text: "Save 15%" },
        { icon: Star, text: "Priority Support" },
      ],
      type: "yearly",
      highlight: true,
    },
  ];

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl w-full">
        {plans.map((plan) => (
          <div
            key={plan.type}
            className={`rounded-xl shadow-lg p-8 text-center transform transition hover:scale-105 ${
              plan.highlight
                ? "bg-indigo-50 border-2 border-indigo-600"
                : "bg-white"
            }`}
          >
            <h2 className="text-3xl font-bold mb-2">{plan.name}</h2>
            <p className="text-gray-700 text-xl mb-6">{plan.price}</p>
            <ul className="mb-6 text-left">
              {plan.features.map((feature, idx) => (
                <li
                  key={idx}
                  className="flex items-center mb-3 text-gray-600"
                >
                  <feature.icon className="w-5 h-5 text-indigo-600 mr-2" />
                  {feature.text}
                </li>
              ))}
            </ul>
            <button
              onClick={() => handleSubscribe(plan.type)}
              disabled={loadingPlan === plan.type}
              className={`w-full py-3 rounded-lg text-white font-semibold transition cursor-pointer ${
                plan.highlight
                  ? "bg-indigo-600 hover:bg-indigo-700"
                  : "bg-indigo-500 hover:bg-indigo-600"
              } disabled:opacity-50`}
            >
              {loadingPlan === plan.type
                ? "Redirecting..."
                : `Subscribe ${plan.name.split(" ")[0]}`}
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default Plans;
