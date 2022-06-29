import React, { useState } from 'react'
import socket from 'services/socket'
import styles from './Admin.module.scss'

export default function Admin() {
  const [queueData, setQueueData] = useState([])

  socket.on('sendData', data => {
    setQueueData(data)
  })

  function makeCurrent(id) {
    socket.emit('makeCurrent', id)
    socket.emit('delete', id)
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Admin</h1>
      <span className={styles.ordersLabel}>Pedidos Cadastrados</span>
      {queueData.length === 0 && <span>Nenhum pedido cadastrado ainda.</span>}
      {queueData?.map((data, index) => (
        <div className={styles.orders} key={index.toString()}>
          <div className={styles.userData}>
            <span>{data.name}</span>
            <span>{data.selectedOption}</span>
            <span>{index + 1}</span>
          </div>
          <div className={styles.actions}>
            <button onClick={() => makeCurrent(index)} type="button">
              Chamar Senha
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
