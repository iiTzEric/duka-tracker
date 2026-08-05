import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

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
    <div className="app-shell">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
        <header className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-slate-950/30 ring-1 ring-slate-700/60">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-cyan-300/80">Duka Tracker</p>
              <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
                Inventory management for your store
              </h1>
              <p className="mt-3 max-w-2xl text-slate-400">
                Add products, update stock, and keep your prices visible with a clean list view.
              </p>
            </div>
            <div className="inline-flex items-center gap-3 rounded-3xl bg-slate-950/80 px-5 py-4 text-sm text-slate-300 ring-1 ring-slate-700">
              <span className="rounded-full bg-cyan-500/15 px-3 py-1 text-cyan-200">Live</span>
              <span>{data.length} items</span>
            </div>
          </div>
        </header>

        <main className="mt-10 grid gap-6 lg:grid-cols-[1.58fr_0.82fr]">
          <section className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20 ring-1 ring-slate-700">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-2xl font-semibold text-white">Inventory list</h2>
                <p className="mt-1 text-sm text-slate-400">
                  Review your current stock and adjust items directly.
                </p>
              </div>
              <span className="inline-flex items-center gap-2 rounded-2xl bg-slate-950/75 px-4 py-2 text-sm text-slate-300 ring-1 ring-slate-700">
                {data.length} records
              </span>
            </div>

            <div className="space-y-4">
              {data.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-slate-700 bg-slate-950/60 p-8 text-center text-slate-500">
                  No items yet. Add one to get started.
                </div>
              ) : (
                data.map(item => (
                  <div key={item._id} className="item-card">
                    {editingId === item._id ? (
                      <div className="space-y-4">
                        <div className="grid gap-3 sm:grid-cols-3">
                          <input
                            className="field"
                            value={editValues.name}
                            onChange={e => setEditValues({ ...editValues, name: e.target.value })}
                            placeholder="Item Name"
                          />
                          <input
                            className="field"
                            type="number"
                            value={editValues.price}
                            onChange={e => setEditValues({ ...editValues, price: Number(e.target.value) })}
                            placeholder="Price"
                          />
                          <input
                            className="field"
                            type="number"
                            value={editValues.quantity}
                            onChange={e => setEditValues({ ...editValues, quantity: Number(e.target.value) })}
                            placeholder="Quantity"
                          />
                        </div>
                        <div className="flex flex-wrap gap-3">
                          <button className="btn-primary" onClick={() => handleUpdate(item._id)}>
                            Save
                          </button>
                          <button className="btn-secondary" onClick={() => setEditingId(null)}>
                            Cancel
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                          <p className="text-lg font-semibold text-white">{item.name}</p>
                          <div className="mt-2 flex flex-wrap gap-3 text-sm text-slate-400">
                            <span>Price: Ksh {item.price}</span>
                            <span>Qty: {item.quantity}</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-3">
                          <button className="btn-danger" onClick={() => handleDelete(item._id)}>
                            Delete
                          </button>
                          <button className="btn-secondary" onClick={() => startEdit(item)}>
                            Edit
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </section>

          <section className="rounded-[2rem] border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/20 ring-1 ring-slate-700">
            <h2 className="text-2xl font-semibold text-white">Add new item</h2>
            <p className="mt-2 text-sm text-slate-400">
              Keep your store inventory updated with product details.
            </p>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <input
                className="field"
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Item Name"
              />
              <input
                className="field"
                type="number"
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
                placeholder="Item Price"
              />
              <input
                className="field"
                type="number"
                value={quantity}
                onChange={e => setQuantity(Number(e.target.value))}
                placeholder="Item Quantity"
              />
              <button type="submit" className="btn-primary w-full">
                Add Item
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}

export default App;
