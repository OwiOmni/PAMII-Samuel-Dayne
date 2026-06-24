import { Input, InputField } from "@/components/ui/input";
import { Link } from "expo-router";

export default function InputPage() {
  return (
    <>
      <Input>
        <InputField placeholder="Digite algo" />
      </Input>

      <Link href="/select">Ir para Select</Link>
    </>
  );
}