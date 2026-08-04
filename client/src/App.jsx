import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

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

  useEffect(() => {
    axios.get("http://localhost:3000/api/items")
      .then(response => setData(response.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      {data.map(item => (
        <div key={item._id}>
          <div>{item.name}</div>
          <div>{item.price}</div>
          <div>{item.quantity}</div>
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