import {
  Select,
  SelectBackdrop,
  SelectContent,
  SelectInput,
  SelectItem,
  SelectPortal,
  SelectTrigger,
} from "@/components/ui/select";
import { Link } from "expo-router";

export default function SelectPage() {
  return (
    <>
      <Select>
        <SelectTrigger>
          <SelectInput placeholder="Escolha uma opção" />
        </SelectTrigger>

        <SelectPortal>
          <SelectBackdrop />
          <SelectContent>
            <SelectItem label="Opção 1" value="1" />
            <SelectItem label="Opção 2" value="2" />
          </SelectContent>
        </SelectPortal>
      </Select>

      <Link href="/">Voltar ao início</Link>
    </>
  );
}