import React, { useState } from 'react';
import './App.css'

function SearchComponent({ searchCourse, courseSearchUserFunction }) {
  return (
      <header className="App-header">
          <h1>My Shopping Cart</h1>
          <div className="search-bar">
              <input
                  type="text"
                  placeholder="Search for Products..."
                  value={searchCourse}
                  onChange={courseSearchUserFunction}
              />
          </div>
      </header>
  );
}

function ShowCourseComponent({ courses, 
  filterCourseFunction, 
  addCourseToCartFunction }) {
  return (
      <div className="product-list">
          {filterCourseFunction.length === 0 ? (
              <p className="no-results">
                  Sorry User, No matching Product found.
              </p>
          ) : (
              filterCourseFunction.map((product) => (
                  <div className="product" key={product.id}>
                      <img src={product.image} alt={product.name} />
                      <h2>{product.name}</h2>
                      <p>Price: ₹{product.price}</p>
                      <button className="add-to-cart-button" onClick={() => addCourseToCartFunction(product)}>
                        Add to Shopping Cart
                      </button>
                  </div>
              ))
          )}
      </div>
  );
}

function UserCartComponent({cartCourses, deleteCourseFromCartFunction, totalAmountCalculationFunction, setCartCourses,}) {
return (
<div className={`cart ${cartCourses.length > 0 ? 'active' : ''}`}>
  <h2>My Cart</h2>
  {
    cartCourses.length === 0 ? ( <p className="empty-cart">User, your cart is empty.</p> ) : (
<div>
  <ul>
      {cartCourses.map((item) => (
          <li key={item.product.id} className="cart-item">
              <div>
                  <div className="item-info">
                      <div className="item-image">
                          <img src={item.product.image} 
                               alt={item.product.name} />
                      </div>
                      <div className="item-details">
                          <h3>{item.product.name}</h3>
                          <p>Price: ₹{item.product.price}</p>
                      </div>
                  </div>
                  <div>
                      <div className="item-actions">
                          <button
                              className="remove-button"
                              onClick={() => 
                              deleteCourseFromCartFunction(item.product)}>
                              Remove Product
                          </button>
                          <div className="quantity">
                              <button style={{ margin: "1%" }} 
                                  onClick={(e) => {
                                  setCartCourses((prevCartCourses) => {
                                      const updatedCart = prevCartCourses.map(
                                      (prevItem) =>
                                        prevItem.product.id === item.product.id
                                              ? { ...prevItem, quantity: 
                                              item.quantity + 1 }
                                              : prevItem
                                      );
                                      return updatedCart;
                                  })
                              }}>+</button>
                              <p className='quant'>{item.quantity} </p>
                              <button 
                                  onClick={(e) => {
                                  setCartCourses((prevCartCourses) => {
                                      const updatedCart = prevCartCourses.map(
                                      (prevItem) =>
                                      prevItem.product.id === item.product.id
                                              ? { ...prevItem, quantity:
                                              Math.max(item.quantity - 1, 0) }
                                              : prevItem
                                      );
                                      return updatedCart;
                                  })
                              }}>-</button>
                          </div>
                      </div>
                  </div>
              </div>
          </li>
      ))}
  </ul>
  <div className="checkout-section">
      <div className="checkout-total">
          <p className="total">Total Amount: 
              ₹{totalAmountCalculationFunction()}
          </p>
      </div>
      <button
          className="checkout-button"
          disabled={cartCourses.length === 0 || 
          totalAmountCalculationFunction() === 0}
      >
          Proceed to Payment
      </button>
  </div>
</div>
          )}
</div>
  );
}

function App() {

  const [courses, setCourses] = useState([
    { id: 1, 
      name: 'My T-shirt', 
      price: 499, 
      image:'https://m.media-amazon.com/images/I/715vxpYQLAL._SX569_.jpg'
    },
    { id: 2, 
      name: 'My Bag', 
      price: 699, 
      image: 'https://www.samsonite.in/dw/image/v2/AAWQ_PRD/on/demandware.static/-/Sites-Samsonite/default/dwdec5f7fa/images/biz-2-go-laptop-backpack/hi-res/142144_1779_hi-res_FRONT34_1.jpg'
    },
    { id: 3, 
      name: 'My Hoodie', 
      price: 799, 
      image: 'https://www.redwolf.in/image/cache/catalog/hoodies/dbz-warrior-kanji-hoodie-india-600x800.jpg'
    }
]);

const [cartCourses, setCartCourses] = useState([]);
const [searchCourse, setSearchCourse] = useState('');

const addCourseToCartFunction = (course) => {
    
  const alreadyCourses = cartCourses.find(item => item.product.id === course.id);
   
    if(alreadyCourses) 
    {
        const latestCartUpdate = cartCourses.map(item =>item.product.id === course.id ? { ...item, quantity: item.quantity + 1 } : item);
        setCartCourses(latestCartUpdate);
    } 
    else 
    {
        setCartCourses([...cartCourses, {product: course, quantity: 1}]);
    }
};

const deleteCourseFromCartFunction = (Course) => {
    const updatedCart = cartCourses.filter(item => item.product.id !== Course.id);
    setCartCourses(updatedCart);
};

const totalAmountCalculationFunction = () => {
    return cartCourses.reduce((total, item) =>  total + item.product.price * item.quantity, 0);
};

const courseSearchUserFunction = (event) => {
    setSearchCourse(event.target.value);
};

const filterCourseFunction = courses.filter((course) =>course.name.toLowerCase().includes(searchCourse.toLowerCase()));

return (
    <div className="App">
        <SearchComponent searchCourse={searchCourse} 
                         courseSearchUserFunction=
                             {courseSearchUserFunction} />
        <main className="App-main">
            <ShowCourseComponent
                courses={courses}
                filterCourseFunction={filterCourseFunction}
                addCourseToCartFunction={addCourseToCartFunction}
            />

            <UserCartComponent
                cartCourses={cartCourses}
                deleteCourseFromCartFunction={deleteCourseFromCartFunction}
                totalAmountCalculationFunction={
                    totalAmountCalculationFunction
                }
                setCartCourses={setCartCourses}
            />
        </main>
    </div>
);
}

export default App
