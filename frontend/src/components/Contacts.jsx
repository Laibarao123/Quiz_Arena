const Contacts = () => {
  return (
    <section className="bg-[#0f0c29] text-white py-16 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-[#d9b2ff]">
          Get in Touch
        </h2>
        <p className="text-center text-gray-300 mb-12">
          Have questions or want to collaborate? Send us a message!
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold">Address</h3>
              <p className="text-gray-400">123 Purple Street, City, Country</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Email</h3>
              <p className="text-gray-400">contact@example.com</p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">Phone</h3>
              <p className="text-gray-400">+92 300 1234567</p>
            </div>
          </div>

          {/* Contact Form */}
          <form className="bg-[#1e0f3c] p-8 rounded-xl shadow-md space-y-4">
            <input
              type="text"
              placeholder="Your Name"
              className="w-full p-3 rounded-md bg-[#2a1b50] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d9b2ff]"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-3 rounded-md bg-[#2a1b50] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d9b2ff]"
            />
            <textarea
              placeholder="Your Message"
              rows="5"
              className="w-full p-3 rounded-md bg-[#2a1b50] text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-[#d9b2ff]"
            ></textarea>
            <button
              type="submit"
              className="w-full py-3 bg-[#7e3aff] hover:bg-[#5c1fd6] rounded-md font-semibold transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
