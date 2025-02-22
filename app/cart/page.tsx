import Container from "@/app/components/Container";
import CartClient from "@/app/cart/CartClient";
import {getCurrentUser} from "@/actions/getCurrentUser";

const Cart = async () => {
    const currentUser = await getCurrentUser();

    return (
        <div className="pt-14">
            <Container>
                <CartClient currentUser={currentUser}/>
            </Container>
        </div>
    )
}
export default Cart;