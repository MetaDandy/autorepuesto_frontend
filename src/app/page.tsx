'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: 'Correo inválidom' }),
  password: z.string().min(6, { message: 'Mínimo de 6 caracteres.' })
});

export default function Home() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    console.log("Iniciando sesión...", data);
  
    try {
      const login = await fetch("http://localhost:3001/auth/sign_in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
  
      const response = await login.json();
  
      if (login.ok) {
        localStorage.setItem("token", response.token); 
  
        console.log("Token guardado en localStorage:", response.token);
        
        reset();
      } else {
        console.error("Error en la autenticación:", response.message);
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold">Bienvenido a la Tienda de Autopartes</h1>
        <p className="text-gray-600">Encuentra lo que necesitas para tu vehículo</p>
      </div>

      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Iniciar Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="">
              <Input {...register('email')} placeholder="Correo electrónico" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div className="">
              <Input type="password" {...register('password')} placeholder="Contraseña" />
              {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}
            </div>
            <Button type="submit" className="w-full">Ingresar</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
