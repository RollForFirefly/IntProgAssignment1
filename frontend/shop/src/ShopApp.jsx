import { useState, useEffect, useRef } from 'react';
import { Trash2, Plus, Check, X, Edit2 } from 'lucide-react';
import './ShopApp.css';

const API_BASE_URL = 'http://localhost:5173/items';
const ORDER_URL = '/orders';

export default function ShopApp() {
  const [items, setItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [input, setInput] = useState('');
  const [editingId, setEditingId] = useState(null);

  const inputRef = useRef(null); // To focus the main input after actions

  useEffect(() => {
    fetchItems();
    inputRef.current?.focus();
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
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const addOrder = async (item_id) => {
    if (input.trim()) {
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
        alert("Error saving a new todo.");
        alert(error);
      }

      setInput('');
      //inputRef.current?.focus(); // keep focus after adding
    }
  };

  const toggleTodo = async (id) => {
    const todoToToggle = todos.find(todo => todo.id === id);
    if (todoToToggle !== undefined) {
      try {
        const response = await fetch(`${API_BASE_URL}/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...todoToToggle,
            completed: !todoToToggle.completed,
          }),
        });
        if (response.ok) {
          //fetchTodos();
        }
      } catch (error) {
        alert("Error toggleing a todo's completed status.");
      }
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
          alert("Error deleting a todo.");
        }
      }
    }
  };

  const startEdit = (todo) => {
    setEditingId(todo.id);
  };

  // const saveEdit = async () => {
  //   if (editText.trim()) {
  //     const todoToEdit = todos.find(todo => todo.id === editingId);
  //     if (todoToEdit !== undefined) {
  //       try {
  //         const response = await fetch(`${API_BASE_URL}/${editingId}`, {
  //           method: 'PUT',
  //           headers: {
  //             'Content-Type': 'application/json',
  //           },
  //           body: JSON.stringify({
  //             ...todoToEdit,
  //             text: editText.trim(),
  //           }),
  //         });
  //         if (response.ok) {
  //           //fetchTodos();
  //           cancelEdit();
  //         }
  //       } catch (error) {
  //         alert("Error toggleing a todo's completed status.");
  //         alert(error);
  //       }
  //     }
  //   }
  // };

  const cancelEdit = () => {
    setEditingId(null);
    //setEditText('');
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
            //onKeyDown={(e) => e.key === 'Enter' && addTodo()} TODO: search functionality
            placeholder="What do you want to buy?"
            className="todo-input"
          />
        </div>

        <div className="todo-list">
          {items.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">🛒</div>
              <p>No items found</p>
            </div>
          ) : (
            <ul className="todo-items">
              {items.map((item) => (
                <li key={item.id} className="todo-item">
                  {/* the current todo is being edited */}
                    /* The todo is not being edited */
                    <>
                      <button
                        onClick={() => addOrder(item.id)}
                        className={`checkbox`}
                      >
                        Add to Cart
                        {<ShoppingCart size={16} className="check-icon" />}
                      </button>
                      <span className={`todo-text`}>
                        {item.name}
                      </span>
                    </>
                </li>
              ))}
            </ul>
          )}
        </div>
        {items.length > 0 && (
          <div className="stats">
            <span>{items.length} available</span>
          </div>
        )}
      </div>
    </div>
  );
}