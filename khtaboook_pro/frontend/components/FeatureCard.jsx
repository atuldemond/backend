import React from "react";

const features = [
  {
    title: "Login",
    description:
      "Securely log in to your Khatabook account with your credentials.",
    icon: "🔑",
  },
  {
    title: "Signup",
    description:
      "Create a new Khatabook account to manage your tasks efficiently.",
    icon: "📝",
  },
  {
    title: "Logout",
    description: "Log out of your Khatabook account securely.",
    icon: "🚪",
  },
  {
    title: "To-Do List",
    description:
      "Manage your tasks with add, edit, delete, and view operations.",
    icon: "📋",
  },
];

const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="max-w-sm p-6 bg-white rounded-lg shadow-md hover:scale-110 transition-transform duration-300">
      <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 text-4xl text-blue-600">
        {icon}
      </div>
      <h3 className="mb-2 text-xl font-bold text-center text-gray-900">
        {title}
      </h3>
      <p className="text-center text-gray-700">{description}</p>
    </div>
  );
};

const FeaturesSection = () => {
  return (
    <div className="container px-6 py-12 mx-auto flex flex-col items-center ">
      <h2 className="mb-6 text-3xl font-extrabold text-center text-gray-900 animate-pulse">
        Welcome to Khatabook
      </h2>
      <div className="grid gap-8 md:grid-cols-2  lg:grid-cols-4 ">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesSection;
