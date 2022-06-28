import React, { useEffect, useState } from 'react'
import socket from 'services/socket'
import styles from './Admin.styles.scss'

export default function Admin() {
  const [queueData, setQueueData] = useState([])

  socket.on('sendData', data => {
    setQueueData(data)
    console.log(data)
  })

  return (
    <div>
      <h1>Admin</h1>
      <span>Pedidos Cadastrados</span>
      {queueData.length === 0 && <span>Nenhum pedido cadastrado ainda.</span>}
      {queueData?.map((data, index) => (
        <div className={styles.orders} key={index.toString()}>
          <div className={styles.userData}>
            <span>{data.name}</span>
            <span>{data.selectedOption}</span>
            <span>{index + 1}</span>
          </div>
          <div className={styles.actions}>
            <button type="button">Chamar Senha</button>
            <button type="button">Remover</button>
          </div>
        </div>
      ))}
    </div>
  )
}
