import { useState, useEffect, useRef } from 'react';
import { Popup } from '@mobiscroll/react';
import { Trash2, Plus, Check, X, Edit2, ShoppingCart } from 'lucide-react';
import './ShopApp.css';

const API_BASE_URL = 'http://localhost:8000/items';
const ORDER_URL = '/orders';
// note for me:
// to boot up fastAPI, go to ./backend:   python -m uvicorn shop_app:app --reload
// make sure you're using venv:                         .venv\Scripts\Activate.ps1
// and finally, boot react from frontend/shop:                   npm run dev

export default function ShopApp() {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [input, setInput] = useState('');
  const [isPopupOpen, setPopupOpen] = useState(false);
  const filteredItems = items.filter(item =>
  item.name.toLowerCase().includes(input.toLowerCase())
);

  const inputRef = useRef(null);

  useEffect(() => {
    fetchItems();
    fetchOrders();
  }, []);

  useEffect(() => {
    const cartCount = orders.length;
    document.title = cartCount > 0 ? `Shop (${cartCount} in cart)` : `Shop`;
  }, [orders]);

  const fetchItems = async () => {
    try {
      const response = await fetch(API_BASE_URL);
      console.log(response);
      const data = await response.json();
      setItems(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const fetchOrders = async () => {
    try {
      const response = await fetch(API_BASE_URL + ORDER_URL);
      if (!response.ok) {
        const text = await response.text();
        console.error("Server error:", text);
        return;
      }
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const addOrder = async (item_id) => {
    const existOrder = orders.find(order => order.item_id === item_id)
    if (existOrder) {
      updateOrder({ ...existOrder, amount: existOrder.amount + 1 })
    }
    else

      try {
        const response = await fetch(API_BASE_URL + ORDER_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            // use str type (instead of int) for id
            id: new Date(Date.now()).toISOString(),
            item_id: item_id,
            amount: 1,
          }),
        });
        if (response.ok) {
          fetchOrders();
        }
      } catch (error) {
        alert(error);
      }

      setInput('');
  };

const getItemFromOrder = (order) => {
  return items.find(item => item.id === order.item_id);
};

const updateOrder = async (order) => {
  try {
    const response = await fetch(
      `${API_BASE_URL + ORDER_URL}/${order.id}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: order.id,
          item_id: order.item_id,
          amount: order.amount,
        }),
      }
    );

    if (response.ok) {
      fetchOrders();
    }
  } catch (error) {
    alert(error);
  }
};

  const deleteOrder = async (id) => {
    const ordersToDelete = orders.find(order => order.id === id);
    if (window.confirm(`Are you sure you want to delete this order?`)) {
      if (ordersToDelete !== undefined) {
        try {
          const response = await fetch(`${API_BASE_URL + ORDER_URL}/${id}`, {
            method: 'DELETE'
          });
          if (response.ok) {
            fetchOrders();
          }
        } catch (error) {
          alert("Error deleting an order.");
        }
      }
    }
  };

  return (
    <div className="app-container">
      <div className="app-wrapper">
        <div className="header">
          <h1 className="header-title">One Stop Shop</h1>
          <p className="header-subtitle">Selling everything from overpriced soup to dirt-cheap RAM</p>
        </div>

        <div className="input-section">
          <input
            type="text"
            ref={inputRef} // attaching the ref here
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What do you want to buy?"
            className="search-input"
          />
          <button className={"cart-button"} onClick={() => setPopupOpen(true)}>
            <ShoppingCart size={35} strokeWidth={2.5}/>
            <span>Cart</span>
          </button>
        </div>

        <Popup themeVariant={"light"} className={"order-popup"} display={"top"} isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} context={document.body}>
            {orders.length === 0 ? (<div> Your cart is empty...</div>) : (

                <ul className={"order-list"}>
                  {orders.map((order) => (
                      <li key={order.id} className={"order-item"}>
                        <div className="order-amount-control">
                          <span className="amount">{order.amount}</span>

                          <div className="arrows">
                            <button onClick={() => updateOrder({ ...order, amount: order.amount + 1 })}>
                              ^
                            </button>
                            <button onClick={() => updateOrder({ ...order, amount: order.amount - 1 })}>
                              v
                            </button>
                          </div>



                          <span>{getItemFromOrder(order).name}</span>

                          <button onClick={() => deleteOrder(order.id)}>
                            <Trash2></Trash2>
                          </button>
                        </div>
                      </li>
                  ))}
                </ul>
            )}

        </Popup>

        <div className="item-list">
          {filteredItems.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🛒</div>
              <p>No items found</p>
            </div>
          ) : (
            <ul className="shop-items">
              {filteredItems.map((item) => (
                <li key={item.id} className="shop-item">
                  <div className="item-card">
                    <span className="item-text">{item.name}</span>

                    <img
                      className="item-image"
                      src={"../images/" + item.image}
                      alt={item.name + "not found :("}
                    />

                    <button
                      onClick={() => addOrder(item.id)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}