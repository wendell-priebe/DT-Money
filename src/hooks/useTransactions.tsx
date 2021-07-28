import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Transaction{
  id: number,
  title: string,
  amount:number,
  type: string,
  category: string,
  createdAt: string,
}

// interface TransactionInput{
//   title: string,
//   amount:number,
//   type: string,
//   category: string,
// }
type TransactionInput = Omit<Transaction, 'id' | 'createdAt'> //omite os atributos escolhido
//type TransactionInput = Pick<Transaction, 'title' | 'amount' | 'type' | 'category'> //pega os atributos escolhido

interface TransactionsProviderProps{
  children: ReactNode;
}

interface TransactionsContextData{
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData //engana o typescript para acabar com o erro
);

export function TransactionsProvider({ children } : TransactionsProviderProps){
  const [ transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(()=>{
    api.get('/transactions')
      //.then(response => response.json()) // utilizando axios não precisa mais fazer essa conversao
      //.then(Response => console.log(Response.data))
      .then(response => setTransactions(response.data.transactions))
  }, [])

  async function createTransaction (transactionInput: TransactionInput){
   const response =  await api.post('/transactions', {
      ...transactionInput,
      createdAt: new Date(),
    })
   const { transaction } = response.data;

   setTransactions([
     ...transactions,
     transaction,
   ])
  }

  return(
    <TransactionsContext.Provider value={{transactions, createTransaction}}>
      { children }
    </TransactionsContext.Provider>
  )
}

export function useTransactions(){
  const context = useContext(TransactionsContext)

  return context
}