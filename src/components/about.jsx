import React from 'react';

function About() {
  return (
    <div className="container">
      <h1 className="text-center" style={{ marginTop: '50px' }}>ABOUT US</h1>
      <div className="row" style={{ marginTop: '50px' }}>
        <div className="col-md-6 py-3 py-md-0">
          <div className="card">
            <img src={process.env.PUBLIC_URL + '/assets/images/about.png'} alt="About Us" />
          </div>
        </div>
        <div className="col-md-6 py-3 py-md-0">
          <h2>Company History</h2>
          <p>
            Our company was founded in [Year] by [Founder's Name], who had a vision to create high-quality,
            stylish, and durable furniture. Over the years, we have grown from a small workshop to a
            well-established brand, known for our unique designs and commitment to excellence.
          </p>
          <h2>Mission and Values</h2>
          <p>
            Our mission is to provide our customers with the best furniture solutions that combine
            functionality, aesthetics, and durability. We value innovation, craftsmanship, and
            customer satisfaction above all else.
          </p>
          <h2>What Sets Us Apart</h2>
          <p>
            We pride ourselves on our unique selling points, such as custom design options, sustainable
            materials, and artisan craftsmanship. Our dedication to quality and innovative design
            processes sets us apart from the competition.
          </p>
          <h2>Product Approach</h2>
          <p>
            We specialize in a variety of furniture types, including chairs, sofas, desks, and tables.
            Our design inspiration comes from a blend of modern and classic styles, ensuring that our
            products are both timeless and trendy. We use only the finest materials and pay meticulous
            attention to detail in our craftsmanship.
          </p>
          <h2>Customer Promise</h2>
          <p>
            We guarantee the quality of our products and stand behind them with a robust return/exchange
            policy. Our customer support team is always ready to assist you, ensuring that your
            experience with us is nothing short of exceptional.
          </p>
          <h2>Team or Artisan Highlights</h2>
          <p>
            Our team consists of skilled designers and craftspeople who bring years of experience and
            expertise to the table. Their passion for furniture making is evident in every piece we
            create.
          </p>
          <h2>Sustainability</h2>
          <p>
            We are committed to eco-friendly practices and sustainable material sourcing. Our environmental
            commitments ensure that our products are not only beautiful but also responsible.
          </p>
          <h2>Community Involvement</h2>
          <p>
            We believe in giving back to the community. Through local partnerships and social responsibility
            initiatives, we support local artisans and manufacturers, fostering a sense of community and
            shared prosperity.
          </p>
          <div id="btn4"><button>Read More...</button></div>
        </div>
      </div>
    </div>
  );
}

export default About;
