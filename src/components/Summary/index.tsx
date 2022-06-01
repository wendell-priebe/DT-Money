import { Container } from "./styles";
import incomeIMG from '../../assets/entradas.svg'
import outcomeIMG from '../../assets/saidas.svg'
import totalIMG from '../../assets/total.svg'

export function Summary(){
    return(
        <Container>

            <div>
                <header>
                    <p>Entradas</p>
                    <img src={ incomeIMG } alt="entradas" />
                </header>
                <strong>R$2000,00</strong>
            </div>

            <div>
                <header>
                    <p>Saidas</p>
                    <img src={ outcomeIMG } alt="saidas" />
                </header>
                <strong>- R$500,00</strong>
            </div>

            <div className="highlight-background">
                <header>
                    <p>Total</p>
                    <img src={ totalIMG } alt="total" />
                </header>
                <strong>R$1500,00</strong>
            </div>

        </Container>
    )
}