import { useEffect, useState } from "react";

export default function ToDo() {
  const [_name, setName] = useState("");
  const [items, setItems] = useState(function () {
    const data = localStorage.getItem("items");
    return data ? JSON.parse(data) : [];
  });

  useEffect(
    function () {
      localStorage.setItem("items", JSON.stringify(items));
    },
    [items]
  );

  function addingItem(item) {
    setItems([...items, item]);
  }

  return (
    <div>
      <InputItem
        _name={_name}
        setName={setName}
        addingItem={addingItem}
        items={items}
      />
      <List items={items} setItem={setItems} />
    </div>
  );
}

function InputItem({ _name, setName, items, addingItem }) {
  function createItem() {
    const item = {
      id: items.length,
      name: _name,
      isComplete: false,
    };
    addingItem(item);
  }

  return (
    <div className="input-container">
      <input
        className="input-name"
        type="text"
        placeholder="Item..."
        value={_name}
        onChange={(e) => setName((naem) => e.target.value)}
      />
      <button className="btn btn-add" onClick={createItem}>
        Add
      </button>
    </div>
  );
}

function List({ items, setItem }) {
  function closeItem(item) {
    setItem(items.filter((added) => added.id !== item.id));
  }
  return (
    <ul>
      {items.map((item) => (
        <Item item={item} key={item.id} closeItem={closeItem} />
      ))}
    </ul>
  );
}

function Item({ item, closeItem }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <input type="checkbox" />
      <h3>{item.name}</h3>
      <button className="btn btn-close" onClick={() => closeItem(item)}>
        &times;
      </button>
    </div>
  );
}
