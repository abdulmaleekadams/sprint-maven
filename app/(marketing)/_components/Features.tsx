import Feature from "./Feature";

const features = [
  {
    title: "Integration ecosystem",
    description:
      "Enhance your productivity by connecting with your favorite tools, keeping all your essentials in one place.",
  },
  {
    title: "Goal setting and tracking",
    description:
      "Define and track your goals, breaking down objectives into achievable tasks to keep your targets in sight.",
  },
  {
    title: "Secure data encryption",
    description:
      "With end-to-end encryption, your data is securely stored and protected from unauthorized access.",
  },
];
const Features = () => {
  return (
    <div className="bg-[black] text-white py-[72px] sm:py-24">
      <div className="container">
        <h2 className="text-center font-bold text-5xl sm:text-6xl tracking-tighter">
          Everything you need
        </h2>
        <div className="mt-5 max-w-xl mx-auto">
          <p className="text-center text-xl text-white/70">
            Enjoy customizable lists, team work tools, and smart tracking all in
            one place. Set tasks, get reminders, and see your progress simply
            and quickly.
          </p>
        </div>

        <div className="flex max-sm:flex-col gap-4 mt-16">
          {features.map(({ description, title }) => (
            <Feature description={description} title={title} key={title} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
