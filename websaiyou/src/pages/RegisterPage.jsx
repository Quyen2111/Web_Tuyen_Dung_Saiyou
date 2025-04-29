import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook } from "react-icons/fa";

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

  const handleGoogleRegister = () => {
    console.log("Register with Google");
  };

  const handleFacebookRegister = () => {
    console.log("Register with Facebook");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-sm shadow-lg rounded-lg bg-white">
        <CardContent className="space-y-6 p-8">
          <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Đăng Ký</h2>
          
          <Input
            name="HovaTen"
            placeholder="Họ và tên"
            type="text"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
          />
          
          <Input
            name="email"
            placeholder="Email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
          />

          <Input
            name="password"
            placeholder="Mật khẩu"
            type="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
          />
          
          <Button
            onClick={handleRegister}
            className="w-full py-3 text-white bg-blue-600 hover:bg-blue-700 rounded-lg"
          >
            Đăng Ký
          </Button>

          <div className="flex items-center justify-center gap-4 mt-6">
            <Button
              variant="outline"
              onClick={handleGoogleRegister}
              className="w-full py-3 border border-gray-300 text-gray-700 rounded-lg flex items-center justify-center gap-2 hover:bg-gray-100"
            >
              <FcGoogle className="w-5 h-5" />
              Google
            </Button>

            <Button
              variant="outline"
              onClick={handleFacebookRegister}
              className="w-full py-3 border border-gray-300 text-blue-600 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-50"
            >
              <FaFacebook className="w-5 h-5 text-blue-600" />
              Facebook
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
