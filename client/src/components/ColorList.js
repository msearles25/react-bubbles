import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from "../utils/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" }
};

const ColorList = ({ colors, updateColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);
  const [newColor, setNewColor] = useState({
    color: "",
    code: { hex: "" }
  })

  const editColor = color => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = e => {
    e.preventDefault();
    // Make a put request to save your updated color
    // think about where will you get the id from...
    // where is is saved right now?

    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then(() => {
        axiosWithAuth()
          .get('/colors')
          .then(res => updateColors(res.data))
      })
  };

  const deleteColor = color => {
    // make a delete request to delete this color
    axiosWithAuth()
      .delete(`/colors/${color.id}`)
      .then(res => {
        updateColors(colors.filter(color => color.id !== res.data))  
      })
  };
  // first way that I deleted a color.
  // .then(() => {
  //   axiosWithAuth()
  //     .get('/colors')
  //     .then(res => updateColors(res.data))
  // })

  const addNewColor = e => {
    e.preventDefault()
    axiosWithAuth()
      .post('/colors', newColor)
      .then(() => {
        axiosWithAuth()
          .get('/colors')
          .then(res => updateColors(res.data))
      })
  }

  return (

    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map(color => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span className="delete" onClick={e => {
                e.stopPropagation();
                deleteColor(color)
              }
              }>
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <form onSubmit={saveEdit}>
          <legend>edit color</legend>
          <label>
            color name:
            <input
              onChange={e =>
                setColorToEdit({ ...colorToEdit, color: e.target.value })
              }
              value={colorToEdit.color}
            />
          </label>
          <label>
            hex code:
            <input
              onChange={e =>
                setColorToEdit({
                  ...colorToEdit,
                  code: { hex: e.target.value }
                })
              }
              value={colorToEdit.code.hex}
            />
          </label>
          <div className="button-row">
            <button type="submit">save</button>
            <button onClick={() => setEditing(false)}>cancel</button>
          </div>
        </form>
      )}
      <div className="spacer" />
      {/* stretch - build another form here to add a color */}
      <div>
        <form onSubmit={addNewColor}>
          <input
            type='text'
            name='color'
            placeholder='add a new color'
            onChange={e => {
              setNewColor({ ...newColor, color: e.target.value })
            }}
          />
          <input
            type='text'
            name='hex'
            placeholder='add a new color'
            onChange={e => {
              setNewColor({ ...newColor, code: { hex: e.target.value } })
            }}
          />
          <div className="button-row">
            <button>add color</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ColorList;
