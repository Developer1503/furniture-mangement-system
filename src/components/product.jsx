import React from 'react';

function Products() {
  return (
    <div>
      <div className="container">
        <div className="row" style={{ marginTop: '100px' }}>
          {[
            { img: '/assets/images/ch.png', title: 'Best Chair', text: 'Lorem ipsum dolor.' },
            { img: '/assets/images/sf.png', title: 'Sofa', text: 'Lorem ipsum dolor.' },
            { img: '/assets/images/work desk.png', title: 'Work Desk', text: 'Lorem ipsum dolor.' }
          ].map((card, index) => (
            <div className="col-md-4 py-3 py-md-0" key={index}>
              <div className="card" id="tpc">
                <img src={process.env.PUBLIC_URL + card.img} alt="" className="card image-top" />
                <div className="card-img-overlay">
                  <h4 className="card-titel">{card.title}</h4>
                  <p className="card-text">{card.text}</p>
                  <div id="btn2"><button>View More</button></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        <h3 className="text-center" style={{ marginTop: '50px' }}>TREANDLY PRODUCTS</h3>
        <div className="row" style={{ marginTop: '50px' }}>
          {[
            { img: '/assets/images/card1.png', title: 'Best Sofa', price: '$1000.50' },
            { img: '/assets/images/card2.png', title: 'New Sofa', price: '$100.50' },
            { img: '/assets/images/card3.png', title: 'New Chair', price: '$300.20' },
            { img: '/assets/images/card4.png', title: 'Modern Chair', price: '$500.50' },
            { img: '/assets/images/card5.png', title: 'Best Sofa', price: '$200.50' },
            { img: '/assets/images/card6.png', title: 'Sofa Chair', price: '$100.50' },
            { img: '/assets/images/card1.png', title: 'Table Chair', price: '$150.50' },
            { img: '/assets/images/card1.png', title: 'Hanging Chair', price: '$500.60' }
          ].map((card, index) => (
            <div className="col-md-3 py-3 py-md-0" key={index}>
              <div className="card" id="c">
                <img src={process.env.PUBLIC_URL + card.img} alt="" className="card image-top" />
                <div className="card-body">
                  <h3 className="card-titel text-center">{card.title}</h3>
                  <p className="card-text text-center">{card.price}</p>
                  <div id="btn3"><button>Shop Now</button></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Products;
