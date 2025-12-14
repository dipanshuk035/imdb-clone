import { useEffect, useState } from "react";

function NoteApp() {
  const [notesItems, setNotesItems] = useState(function () {
    const data = localStorage.getItem("notes");
    return data ? JSON.parse(data) : [];
  });

  function savingItems(item) {
    setNotesItems([...notesItems, item]);
  }

  function deleteItems(item) {
    setNotesItems(notesItems.filter((savedItems) => savedItems.id !== item.id));
  }

  useEffect(
    function () {
      localStorage.setItem("notes", JSON.stringify(notesItems));
    },
    [notesItems]
  );

  return (
    <div style={{ display: "grid" }}>
      <Form savingItems={savingItems} notesItems={notesItems} />
      <List notesItems={notesItems} deleteItems={deleteItems} />
    </div>
  );
}

export default NoteApp;

function Form({ notesItems, savingItems }) {
  const [_name, setName] = useState("");
  const [_summery, setSummery] = useState("");

  function createItem() {
    const item = {
      id: notesItems.length,
      name: _name,
      summery: _summery,
    };

    savingItems(item);
  }

  return (
    <div
      style={{
        display: "grid",
        gap: "10px",
        padding: "10px",
        justifyItems: "center",
        justifySelf: "center",
        marginTop: "50px",
      }}
    >
      <input
        value={_name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "300px",
          height: "40px",
          borderRadius: "15px",
          padding: "5px",
        }}
        type="text"
        placeholder="Enter Note Heading..."
      />
      <input
        value={_summery}
        onChange={(e) => setSummery(e.target.value)}
        style={{
          height: "100px",
          width: "300px",
          borderRadius: "15px",
          padding: "5px",
        }}
        type="text"
        placeholder="Write Note..."
      />
      <button onClick={createItem} className="btn btn-add">
        Save
      </button>
    </div>
  );
}

function List({ notesItems, deleteItems }) {
  return (
    <ul>
      {notesItems.map((item) => (
        <Note item={item} key={item.id} deleteItems={deleteItems} />
      ))}
    </ul>
  );
}

function Note({ item, deleteItems }) {
  return (
    <li>
      <h3>{item.name}</h3>
      <p>{item.summery}</p>
      <button onClick={() => deleteItems(item)} className="btn btn-close">
        &times;
      </button>
    </li>
  );
}
