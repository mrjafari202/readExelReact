
import React, { useState } from 'react'
import readXlsxFile from 'read-excel-file';
import './App.css'

const App = () => {

  const [rows, setRows] = useState([]);
  const [heders, setHeders] = useState([]);
  const [editHeders, setEditHeders] = useState([]);
  const [isModaleOpen, setIsModaleOpen] = useState(false)

  const fileChengeHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      readXlsxFile(file).then((rows) => {
        setRows(rows);
        setHeders(rows[0]);
        setEditHeders(rows[0]);
        setIsModaleOpen(true)
      })
    }
  }

  const handelHederChenge = (index, value) => {
    const NewHeders = [...editHeders];
    NewHeders[index] = value;
    setEditHeders(NewHeders)
  }

  const handleSaveHeaders = () => {
    setHeders(editHeders);
    setIsModaleOpen(false)
  }

  return (

    <div className="App">

      <h1>Excel Reader</h1>
      <input type="file" onChange={fileChengeHandler} />
      {isModaleOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>ویرایش عنوان‌های ستون‌ها</h2>
            {
              editHeders.map((heder, index) => (
                <div key={index}>
                  <label>عنوان ستون {index + 1} : </label>
                  <input
                    type="text"
                    value={heder}
                    onChange={(e) => handelHederChenge(index, e.target.value)}
                  />
                </div>
              ))
            }
            <button onClick={handleSaveHeaders}>ذخیره و نمایش جدول</button>
          </div>
        </div>
      )}

      {!isModaleOpen && (
        <table border="1">
          <thead>
            <tr>
              {heders.map((heder, index) => (
                <th key={index}>{heder}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {
              rows.slice(1).map((row, index) => (
                <tr key={index}>
                  {
                    row.map((cell, cellIndex) => (
                      <td key={cellIndex}>{cell}</td>
                    ))
                  }
                </tr>
              ))
            }
          </tbody>
        </table>
      )}

    </div>

  )
}

export default App