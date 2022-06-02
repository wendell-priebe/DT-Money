import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { api } from '../services/api';

interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: string;
  category: string;
  createdAt: string;
}

type TransactionInput = Omit<Transaction, 'id'| 'createdAt'>  //deste mode exclui os pampos q nao vai utilizar
// type TransactionInput = Pick<Transaction, 'title'| 'amount'| 'type' | 'category' >   // desse modo ele seleciona os capos q quer utilizar

interface TransactionsProviderProps{
  children: ReactNode;
}

interface TransactionsContextData{
  transactions: Transaction[];
  createTransaction: (transaction: TransactionInput) => Promise<void>;
}

const TransactionsContext = createContext<TransactionsContextData>(
  {} as TransactionsContextData // força a tipagem
);

export function TransactionsProvider({ children }: TransactionsProviderProps){
  const [ transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(()=>{
      api.get('transactions')
          .then((response => setTransactions(response.data.transactions)))
  },[])

  async function createTransaction(transactionInput: TransactionInput){
    const response = await api.post('/transactions',{
      ... transactionInput,
      createdAt: new Date()
    })
    const { transaction } = response.data;

    setTransactions([
      ...transactions,
      transaction
    ])
  }

  return (
    <TransactionsContext.Provider value={{ transactions, createTransaction }}>
      { children }
    </TransactionsContext.Provider>
  )
}

export function useTransactions(){
  const context = useContext(TransactionsContext);

  return context;
}