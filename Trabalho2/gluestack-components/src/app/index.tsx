import { Button, ButtonText } from "@/components/ui/button";
import { Link } from "expo-router";

export default function HomeScreen() {
  return (
    <>
      <Button>
        <ButtonText>Botão Gluestack</ButtonText>
      </Button>

      <Link href="/input">Ir para Input</Link>
    </>
  );
}