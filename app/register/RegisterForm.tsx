"use client"

import Heading from "@/app/components/Heading";
import {useState} from "react";
import {FieldValues, SubmitHandler, useForm} from "react-hook-form";
import Input from "@/app/components/inputs/input";
import Button from "@/app/components/Button";
import Link from "next/link";
import {AiOutlineGoogle} from "react-icons/ai";
import axios from "axios";
import toast from "react-hot-toast";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";

const RegisterForm = () => {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<FieldValues>({
        defaultValues: {
            name: "",
            email: "",
            password: ""
        },
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {

        setIsLoading(true);
        axios.post("/api/register", data).then(() => {
            toast.success("Konto zostało utworzone");
            signIn("credentials", {
                email: data.email,
                password: data.password,
                redirect: false,
            }).then((callback) => {
                if (callback?.ok) {
                    router.push('/cart');
                    router.refresh();
                    toast.success('Zalogowano!')
                }
                if (callback?.error) {
                    toast.error(callback.error)
                }
            })
                .catch(()  =>  toast.error("Coś poszło nie tak :/"))
                .finally(() => {
                    setIsLoading(false);
                })
        });
    }

    return (
        <>
            <Heading title="Zarejestruj się"/>
            <Button outline label="Zarejestruj się z Google" icon={AiOutlineGoogle} onClick={() => {
            }}/>
            <hr className="bg-slate-300 w-full h-px"/>
            <Input
                id="name"
                label="Nazwa użytkownika"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="email"
                label="E-mail"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id="password"
                label="Hasło"
                disabled={isLoading}
                register={register}
                errors={errors}
                required
                type="password"
            />
            <Button label={isLoading ? "Ładowanie..." : "Zarejestruj się"} onClick={handleSubmit(onSubmit)}/>
            <p className="text-sm">
                Posiadasz już konto? <Link className="underline" href="/login">
                Zaloguj się
            </Link>
            </p>
        </>
    );
};
export default RegisterForm;