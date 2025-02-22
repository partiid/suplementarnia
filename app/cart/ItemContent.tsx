import {CartProductType} from "@/app/product/[productId]/ProductDetails";
import React from "react";
import {formatPrice} from "@/utils/formatPrice";
import Link from "next/link";
import {truncateText} from "@/utils/truncateText";
import Image from "next/image";
import SetQuantity from "@/app/components/products/SetQuantity";
import {useCart} from "@/hooks/useCart";
import {FaRegTrashCan} from "react-icons/fa6";


interface ItemContentProps {
    item: CartProductType;
}

const ItemContent: React.FC<ItemContentProps> = ({item}) => {
    const {handleRemoveProductFromCart, handleCartQtyIncrease, handleCartQtyDecrease} = useCart();

    return <div>
    <div className="grid grid-cols-6 text-xs md:text-sm gap-4 py-4 items-center">
        <div className="col-span-2 justify-self-start flex gap-2 md:gap-4">
            <Link href={`/product/${item.id}`}>
                <div className="relative w-[70px] aspect-square">
                    <Image src={item.selectedImage.image} alt={item.name} fill className="object-contain"/>
                </div>
            </Link>
            <div className="flex flex-col justify-between">
                <Link href={`/product/${item.id}`}>
                    <p className="text-xs uppercase text-gray-500">{item.brand}</p>
                    <p className="pt-1 text-lg">{truncateText(item.name)}</p>
                </Link>
                <div className="pt-0.5 text-xs">Smak: {item.selectedFlavour.flavour}</div>

            </div>
        </div>
        <div className="justify-self-center">
            {formatPrice(item.price)}
        </div>
        <div className="justify-self-center">
            <SetQuantity
                cartCounter={true}
                cartProduct={item}
                handleQtyIncrease={() => handleCartQtyIncrease(item)}
                handleQtyDecrease={() => handleCartQtyDecrease(item)}
                maxQuantity={item.selectedFlavour.quantity} // Przekazanie maxQuantity
            />
        </div>
        <div className="justify-self-center font-semibold">
            {formatPrice(item.price * item.quantity)}
        </div>
        <div className="justify-self-center underline">
            <button onClick={() => {

                handleRemoveProductFromCart(item)
            }}>
                <FaRegTrashCan size={25} className="text-red-500"/>
            </button>
        </div>
    </div>

    </div>
}
export default ItemContent