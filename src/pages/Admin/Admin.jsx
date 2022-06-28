import React from 'react'
import styles from './Admin.styles.scss'

export default function Admin() {
  const mockedData = [
    {
      name: 'John Doe',
      selectedOption: 'Hamburguer',
      queuePosition: 1,
    },
    {
      name: 'Jane Doe',
      selectedOption: 'Pizza',
      queuePosition: 2,
    },
    {
      name: 'John Doe',
      selectedOption: 'Hot Dog',
      queuePosition: 3,
    },
  ]

  return (
    <div>
      <h1>Admin</h1>
      <span>Pedidos Cadastrados</span>
      {mockedData.map(data => (
        <div className={styles.orders} key={data.queuePosition}>
          <div className={styles.userData}>
            <span>{data.name}</span>
            <span>{data.selectedOption}</span>
            <span>{data.queuePosition}</span>
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
