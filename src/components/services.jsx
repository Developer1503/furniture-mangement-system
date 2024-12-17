import React from 'react';

function Services() {
  return (
    <div className="container">
      <h3 className="text-center" style={{ paddingTop: '30px' }}>SERVICES WE OFFER</h3>
      <div className="row" style={{ marginTop: '50px' }}>
        {[
          { img: '/assets/images/c1.png', title: 'CUSTOM MENUS', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam vitae facere eius modi iure possimus, soluta ea inventore. Omnis!' },
          { img: '/assets/images/c2.png', title: 'SMARTEST WAY', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam vitae facere eius modi iure possimus, soluta ea inventore. Omnis!' },
          { img: '/assets/images/c3.png', title: 'USER FRIENDLEY', text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Numquam ipsam vitae facere eius modi iure possimus, soluta ea inventore. Omnis!' }
        ].map((card, index) => (
          <div className="col-md-4 py-3 py-md-0" key={index}>
            <div className="card">
              <img src={process.env.PUBLIC_URL + card.img} alt="" className="card image-top" height="200px" />
              <div className="card-body">
                <h5 className="card-titel text-center">{card.title}</h5>
                <p className="text-center">{card.text}</p>
                <div id="btn2" className="text-center"><button>View More</button></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
