import LoginForm from "@/components/LoginForm";
import { Card, CardContent, CardTitle } from "@/components/ui/card";

export default function Home() {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="w-[500px]">
        <Card className="flex flex-col">
          <CardTitle className="text-center m-4">BLACK JACK</CardTitle>
          <CardContent>
            <LoginForm></LoginForm>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
