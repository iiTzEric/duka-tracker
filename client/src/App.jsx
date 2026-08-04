import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editValues, setEditValues] = useState({ name: "", price: 0, quantity: 0 });

  const startEdit = (item) => {
    setEditingId(item._id);
    setEditValues({ name: item.name, price: item.price, quantity: item.quantity });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/items", { name, price, quantity })
      .then(response => {
        setData([...data, response.data]);
        setName("");
        setPrice(0);
        setQuantity(0);
      })
      .catch(error => console.error(error));
  };

  const handleUpdate = (id) => {
    axios.put(`http://localhost:3000/api/items/${id}`, editValues)
      .then(response => {
        setData(data.map(item => item._id === id ? response.data : item));
        setEditingId(null);
      })
      .catch(error => console.error(error));
  };

  const handleDelete = (id) => {
    axios.delete(`http://localhost:3000/api/items/${id}`)
      .then(() => {
        setData(data.filter(item => item._id !== id));
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    axios.get("http://localhost:3000/api/items")
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {data.map(item => (
        <div key={item._id}>
          {editingId === item._id ? (
            <>
              <input
                value={editValues.name}
                onChange={e => setEditValues({ ...editValues, name: e.target.value })}
              />
              <input
                type="number"
                value={editValues.price}
                onChange={e => setEditValues({ ...editValues, price: e.target.value })}
              />
              <input
                type="number"
                value={editValues.quantity}
                onChange={e => setEditValues({ ...editValues, quantity: e.target.value })}
              />
              <button onClick={() => handleUpdate(item._id)}>Save</button>
              <button onClick={() => setEditingId(null)}>Cancel</button>
            </>
          ) : (
            <>
              <div>{item.name}</div>
              <div>{item.price}</div>
              <div>{item.quantity}</div>
              <button onClick={() => handleDelete(item._id)}>Delete</button>
              <button onClick={() => startEdit(item)}>Edit</button>
            </>
          )}
        </div>
      ))}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Item Name"
        />
        <input
          type="number"
          value={price}
          onChange={e => setPrice(e.target.value)}
          placeholder="Item Price"
        />
        <input
          type="number"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          placeholder="Item Quantity"
        />
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
}

export default App;