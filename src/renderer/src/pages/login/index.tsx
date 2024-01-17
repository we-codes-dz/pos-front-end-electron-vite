
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import loginImage from '../../assets/images/login-bg.jpg';
import BgLoginImage from './bg-login-image';
import Header from './header';
import { z } from 'zod';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Input } from '@nextui-org/react';
import ErrorMessage from '@renderer/components/inputs/ErrorMessage/ErrorMessage';
import SpinnerComponent from '@renderer/components/Spinner/Spinner';
import { useBoundStore } from '@renderer/stores/store';
import ErrorHeader from './error-header';
import axios from '@renderer/api/axios';
import { userSchema } from '@renderer/types/form-schema';

type Inputs = z.infer<typeof userSchema>

const index = () => {
    const [isSubmitting, setSubmitting] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const formRef = useRef<HTMLFormElement>(null);

    const auth = useBoundStore((state) => state);

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<Inputs>({
        mode: 'onChange',
        resolver: zodResolver(userSchema),
    })

    const onSubmit = async (data: any) => {
        try {
            setSubmitting(true);
            const response = await axios.post(
                "/auth/login-admin",
                JSON.stringify({ email: data.email, password: data.password }),
                {
                    headers: { "Content-Type": "application/json" },
                }
            );
            const tokens: {
                accessToken: string;
                refreshToken: string;
            } = {
                accessToken: response?.data.data.tokens.accessToken,
                refreshToken: response?.data.data.tokens.refreshToken,
            };
            const user: { id: string; createdAt: string } = {
                id: response.data.data.user.id,
                createdAt: response.data.data.user.createdAt,
            };

            auth.login(tokens, user);
            setSubmitting(false);
            navigate("/work-space");
        } catch (error: any) {
            if (error.response) {
                setError("Invalid Email or passsword");
            } else if (error.request) {
                setError(
                    "Error in your connection internet, please connect and try again"
                );
            } else {
                setError(error.message);
            }

            setSubmitting(false);
        }
    };

    return (
        <div className="bg-gray-100 flex justify-center items-center h-screen text-black">
            <BgLoginImage src={loginImage} />
            <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
                <ErrorHeader error={error} setError={() => setError(null)} />
                <Header />
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="space-y-4"
                    ref={formRef}
                >
                    <Input
                        type="text"
                        label="Nom d'utilisateur"
                        placeholder="Nom d'utilisateur..."
                        className="shadow-md overflow-auto rounded-lg"
                        //errorMessage={errors.title && "Title is required"}
                        {...register('email')}
                    />
                    {errors.email && <ErrorMessage>{errors.email.message}</ErrorMessage>}
                    <Input
                        type='password'
                        label="Mot de passe"
                        placeholder='mot de passe'
                        className="shadow-md overflow-auto rounded-lg"
                        //errorMessage={errors.title && "Title is required"}
                        {...register('password')}
                    />
                    {errors.password && <ErrorMessage>{errors.password.message}</ErrorMessage>}
                    <div className='flex  items-center w-full'>
                        <Button type='submit' radius="sm" className="w-full text-white bg-blue-500 hover:bg-blue-600">
                            Connexion {isSubmitting && <SpinnerComponent />}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}
export default index
