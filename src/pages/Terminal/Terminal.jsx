import React, { useEffect, useState } from 'react'
import socket from 'services/socket'

import styles from './Terminal.module.scss'

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

    socket.on('created', position => {
      setUserData(old => ({ ...old, queuePosition: position }))
      const localData = JSON.parse(localStorage.getItem('queueData'))
      localStorage.setItem(
        'queueData',
        JSON.stringify({ ...localData, queuePosition: position })
      )
    })

    return () => {
      socket.off('created')
    }
  }, [])

  const localStorageData = JSON.parse(localStorage.getItem('queueData'))

  if (userData || localStorageData) {
    const queueData = JSON.parse(localStorage.getItem('queueData'))

    return (
      <div className={styles.container}>
        <h1>Olá, {queueData.name} :)</h1>
        <p className={styles.position}>
          A sua senha é: <b>#{queueData.queuePosition}</b>
        </p>
        <p className={styles.order}>
          <b>Seu prato:</b> {queueData.selectedOption}
        </p>
        <button
          type="button"
          onClick={() => localStorage.removeItem('queueData')}
        >
          Limpar LocalStorage
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

    setUserData(payload)
    localStorage.setItem('queueData', JSON.stringify(payload))
  }

  return (
    <div className={styles.containerForm}>
      <h1>Olá, qual o seu nome?</h1>
      <input
        placeholder="Por favor, insira seu nome..."
        onChange={handleName}
      />
      <span>Selecione o que você quer comer.</span>
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
