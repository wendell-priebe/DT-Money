import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

// MirageJS API
createServer({
  models:{
    transaction: Model,
  },

  seeds(server){
    server.db.loadData({
      transactions:[ //nome do Model no plural
        {
          id:1,
          title: 'freelance de website',
          type: 'deposit',
          category: 'dev',
          amount: 6000,
          createdAt: new Date('2021-02-12 09:00:00')
        },
        {
          id:2,
          title: 'aluguel',
          type: 'withdraw',
          category: 'casa',
          amount: 1050,
          createdAt: new Date('2021-02-15 19:00:00')
        }
      ]
    })
  },

  routes(){
    this.namespace = 'api';

    this.get('/transactions', () =>{
      return this.schema.all('transaction')
    })

    this.post('transactions', (schema, request) =>{
      const data = JSON.parse(request.requestBody)

      return schema.create('transaction', data)
    })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
