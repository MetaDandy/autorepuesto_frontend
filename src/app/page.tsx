'use client';

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { API_ROUTES } from "@/lib/api.routes";
import useAuthStore from "@/lib/auth.store";
import useAppStore from "@/lib/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: 'Correo inválido.' }),
  password: z.string().min(6, { message: 'Mínimo de 6 caracteres.' })
});

export default function Home() {
  const { setToken } = useAuthStore();
  const { setLockScreen, showToast } = useAppStore();
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    setLockScreen({ isVisible: true, type: "loading", content: "Iniciando sesión..." });

    try {
      const login = await fetch(API_ROUTES.SIGN_IN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const response = await login.json();

      if (!login.ok) throw new Error(response.message || "Error de autenticación");

      setToken(response.token);
      showToast('Inicio de sesión exitoso', "Bienvenido de vuelta", "success");
      reset();
    } catch (error: any) {
      showToast("Error", error.message, "error");
      console.error("Error en la solicitud:", error);
    } finally {
      setLockScreen(false);
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100 dark:bg-gray-950 p-4 overflow-hidden">
      
      {/* Fondo decorativo */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-blue-100 via-white to-yellow-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900" />
      <div className="absolute z-0 blur-3xl opacity-30 inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 h-72 w-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse dark:bg-blue-800"></div>
        <div className="absolute bottom-0 right-0 h-72 w-72 bg-yellow-300 rounded-full mix-blend-multiply filter blur-2xl opacity-50 animate-pulse dark:bg-yellow-800"></div>
      </div>

      <div className="text-center mb-6 z-10">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Bienvenido a la Tienda de Autopartes
        </h1>
        <p className="text-gray-600 dark:text-gray-400">
          Encuentra lo que necesitas para tu vehículo
        </p>
      </div>

      <Card className="w-full max-w-md shadow-xl border border-border dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm z-10">
        <CardHeader>
          <CardTitle className="text-xl text-gray-800 dark:text-white">Iniciar Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <Input {...register('email')} placeholder="Correo electrónico" />
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
            <div>
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
