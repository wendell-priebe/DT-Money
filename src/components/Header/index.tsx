import logo from '../../assets/logo.svg'
import { Container } from './styles'
import { Content } from './styles'

interface HeaderProps {
  onOpenNewTransactionModal: () => void; // void significa que não retorna nenhum parametro
}

export function Header({onOpenNewTransactionModal}: HeaderProps){

  return(
    <Container>
      <Content>
        <img src={logo} alt="dt money" />
        <button type="button" onClick={onOpenNewTransactionModal}>
          Nova transação
        </button>

      </Content>
    </Container>
  )
}