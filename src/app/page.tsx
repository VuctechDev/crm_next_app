import FilePicker from "@/components/file-picker/FIlePicker";

export default function Home() {
  return (
    <main>
      <FilePicker type="csv" />
      <FilePicker type="img" />
    </main>
  );
}
