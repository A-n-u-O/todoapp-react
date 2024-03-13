import React, { useState } from 'react'

const Form = ({ nextId, addItem }) => {
  const [text, setText] = useState('')
  const onSubmit = (e) => {
    e.preventDefault()
    const newValue = {
      "id": nextId,
      "text": text,
      "checked": false
    }
    addItem(newValue)
    setText('')
  }

  return (
    <form onSubmit={onSubmit}>
      <div className={`input-wrapper`}>
        <button type="submit" className={`input-check`}></button>
        <input type="text" value={text} placeholder="Create a new task..." onChange={ e => setText(e.target.value) }/>
      </div>
    </form>
  )
}

export default Form