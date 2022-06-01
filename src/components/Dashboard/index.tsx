import { Summary } from "../Summary";
import { TrasactionTable } from "../TransactionsTable";
import { Container } from "./styles";

export function Dashboard(){
    return(
        <Container>
            <Summary />
            <TrasactionTable />
        </Container>
    )
}