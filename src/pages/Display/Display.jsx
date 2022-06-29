import React, { useState } from 'react'
import socket from 'services/socket'
import styles from './Display.module.scss'

export default function Display() {
  const [current, setCurrent] = useState(null)

  socket.on('sendCurrent', currentOrder => {
    if (currentOrder !== null) {
      setCurrent(currentOrder + 1)
    }
  })

  return (
    <div className={styles.container}>
      <h1>Senha Atual</h1>
      {current !== null && <h1 className={styles.current}>{current}</h1>}
      {current === null && <p>Os pedidos estão sendo preparados.</p>}
    </div>
  )
}
