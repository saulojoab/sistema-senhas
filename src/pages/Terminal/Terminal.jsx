import React, { useEffect, useState } from 'react'
import socket from 'services/socket'

export default function Terminal() {
  const [userData, setUserData] = useState(null)
  const [name, setName] = useState('')
  const [selectedOption, setSelectedOption] = useState('')
  const [queuePosition, setQueuePosition] = useState(0)

  const optionList = [
    'Hamburguer',
    'Pizza',
    'Hot Dog',
    'Tacos',
    'Frango Frito',
    'Batata Frita',
    'Salada',
  ]

  useEffect(() => {
    setSelectedOption(optionList[0])

    socket.on('created', position => {
      setQueuePosition(position + 1)
    })

    return () => {
      socket.off('created')
    }
  }, [])

  const localStorageData = JSON.parse(localStorage.getItem('queueData'))

  if (userData || localStorageData) {
    const queueData = JSON.parse(localStorage.getItem('queueData'))

    return (
      <div>
        <h1>Olá, {queueData.name}</h1>
        <p>
          You are currently in position {queueData.queuePosition} in the queue.
        </p>
        <p>Você escolheu {queueData.selectedOption}</p>
        <button
          type="button"
          onClick={() => localStorage.removeItem('queueData')}
        >
          clear
        </button>
      </div>
    )
  }

  function handleSelect(event) {
    setSelectedOption(event.target.value)
  }

  function handleName(event) {
    setName(event.target.value)
  }

  function generateQueuePosition() {
    const payload = {
      name,
      selectedOption,
    }

    socket.emit('addData', payload)

    setUserData({ ...payload, queuePosition })
    localStorage.setItem(
      'queueData',
      JSON.stringify({ ...payload, queuePosition })
    )
  }

  return (
    <div>
      <span>Olá, qual o seu nome?</span>
      <input onChange={handleName} />
      <select onChange={handleSelect}>
        {optionList.map((option, index) => (
          <option key={index.toString()} value={option}>
            {option}{' '}
          </option>
        ))}
      </select>

      <button onClick={generateQueuePosition} type="submit">
        Confirmar
      </button>
    </div>
  )
}
