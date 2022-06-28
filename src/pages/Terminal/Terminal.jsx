import React, { useEffect, useState } from 'react'

export default function Terminal() {
  const [userData, setUserData] = useState(null)
  const [name, setName] = useState('')
  const [selectedOption, setSelectedOption] = useState('')

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
    const queuePos = Math.floor(Math.random() * 10) + 1

    const payload = {
      name,
      selectedOption,
      queuePosition: queuePos,
    }

    setUserData(payload)
    localStorage.setItem('queueData', JSON.stringify(payload))
  }

  return (
    <div>
      <span>Olá, qual o seu nome?</span>
      <input onChange={handleName} />
      <select onSelect={handleSelect}>
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
