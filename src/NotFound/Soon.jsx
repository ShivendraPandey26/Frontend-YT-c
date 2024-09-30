import React from "react";
import Layout from "../components/Layout/Layout";

const Soon = () => {
  return (
    <Layout>
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center p-8">
          <h1 className="text-4xl font-bold text-gray-800">
            This Page Will Be Added Soon...
          </h1>
          <p className="mt-4 text-gray-600">
            We're working hard to bring you this page. Stay tuned for updates!
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Soon;
