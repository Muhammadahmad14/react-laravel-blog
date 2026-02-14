function CancelPage() {
  return (
    <div className="text-center mt-20">
      <h1 className="text-2xl font-bold text-red-600">
        Payment Failed ❌
      </h1>
      <p className="mt-4 text-gray-600">
        Your payment was not completed. Please try again.
      </p>
    </div>
  );
}

export default CancelPage;
