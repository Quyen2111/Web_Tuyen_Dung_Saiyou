import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = () => {
    console.log("Register with", formData);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-sm shadow-lg rounded-lg bg-white">
        <CardContent className="space-y-6 p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Đăng ký</h2>
          
          <Input
            name="name"
            placeholder="Họ và tên"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          
          <Input
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          />
          
          <Input
            name="password"
            placeholder="Mật khẩu"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          />
          
          <Button
            onClick={handleRegister}
            className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Đăng ký
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
