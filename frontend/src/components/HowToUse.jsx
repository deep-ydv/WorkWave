import React from 'react';

const HowToUse = () => {
  return (
    <div className="w-[80%] h-[600px]   bg-gradient-to-br from-purple-100 to-blue-100 flex justify-center ">
      <div className="max-w-3xl w-full bg-white  shadow-2xl p-8 ">
        <h1 className="text-3xl font-bold text-center text-purple-800">🔧 How to Use Work Wave</h1>

        <section className="">
          <h2 className="text-xl font-semibold text-gray-700">🚀 Getting Started</h2>
          <p className="text-gray-600">
            Welcome to <span className="font-semibold text-purple-700">Work Wave</span>! Here's how you can get started with existing or new accounts.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-700">👩‍💼 Existing Admin Login</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Email: <span className="font-mono text-purple-700">admin@email.com</span></li>
            <li>Password: <span className="font-mono text-purple-700">12345678</span></li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-700">👨‍💻 Existing User Login</h2>
          <ul className="list-disc list-inside text-gray-600">
            <li>Email: <span className="font-mono text-purple-700">user@email.com</span></li>
            <li>Password: <span className="font-mono text-purple-700">12345678</span></li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold text-gray-700">🆕 Create a New Account</h2>
          <p className="text-gray-600">
            You can create your own account as either a user or an admin:
          </p>
          <ul className="list-disc list-inside text-gray-600">
            <li><span className="font-semibold text-purple-700">To register as an admin</span>, enter the invite code <span className="font-mono text-blue-700">9389256981</span> during sign-up.</li>
            <li><span className="font-semibold text-purple-700">To register as a user</span>, simply leave the invite code field blank.</li>
          </ul>
        </section>

        <div className="text-center">
          <p className="text-gray-500 text-sm">Happy Task Managing 🚀</p>
        </div>
      </div>
    </div>
  );
};

export default HowToUse;
