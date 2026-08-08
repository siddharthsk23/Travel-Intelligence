function Hero() {
  return (
    <section className="flex flex-col items-center justify-center min-h-[80vh] text-white">
      <h1 className="text-6xl font-extrabold">
        Plan Your Perfect Journey
      </h1>

      <p className="mt-6 text-xl text-gray-300">
        AI Powered Travel Planning Platform
      </p>

      <button className="mt-10 bg-cyan-500 hover:bg-cyan-600 px-8 py-3 rounded-xl text-lg font-semibold">
        Start Planning
      </button>
    </section>
  );
}

export default Hero;