import Heading from "../components/UI/Heading";

function Home() {
  return (
    <div className="h-[60vh] flex flex-col items-center justify-center">
      <Heading
        center
        title="Productbox Frontend Challenge"
        subtitle="A simple ecommerce app that lists products, allow users to add items to their baskets and even add new ones!"
      />
    </div>
  );
}

export default Home;
