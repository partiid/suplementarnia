import Container from "@/app/components/Container";

import Link from "next/link";
import Image from "next/image";
import CartCount from "@/app/components/nav/CartCount";
import UserMenu from "@/app/components/nav/UserMenu";
import {getCurrentUser} from "@/actions/getCurrentUser";


const Navbar = async () => {
    const currentUser = await getCurrentUser();
    return (
        <div className="sticky top-0 w-full bg-green-300 z-30 shadow-sm">
            <div className="py-2 border-b-[1px] border-green-400">
                <Container>
                    <div className="flex items-center justify-between gap-3 md:gap-0">
                        <Link href="/"><Image src="/images/logo.png" alt="logo_suplementarnia" width={180} height={60} priority/></Link>
                        <div className="hidden md:block">Search</div>
                        <div className="flex items-center gap-8 md:gap-12">
                            <CartCount/>
                            <UserMenu currentUser={currentUser}/>
                        </div>
                    </div>
                </Container>
            </div>
    </div>
    )
}
export default Navbar;