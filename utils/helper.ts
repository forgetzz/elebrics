import { MusicMetadata } from "@/types";



async function uploadToPinata(
  file: File
): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Upload gagal");
  }

  return await res.json();
}

async function saveToFirestore(metadata: MusicMetadata): Promise<string> {


  await new Promise((r) => setTimeout(r, 600));
  console.log("FIRESTORE PAYLOAD:", metadata);
  return `doc_${Date.now()}`;
}


function FormatterDecimal() {
    
}

export {saveToFirestore , uploadToPinata}