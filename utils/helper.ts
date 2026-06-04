import { MusicMetadata } from "@/types";


async function uploadToPinata(
  file: File
) {
  const formData =
    new FormData();

  formData.append(
    "file",
    file
  );

  const res = await fetch(
    "/api/upload",
    {
      method: "POST",
      body: formData,
    }
  );

  const text =
    await res.text();

  let data;

  try {
    data =
      JSON.parse(text);
  } catch {
    console.error(
      "Bukan JSON:",
      text
    );

    throw new Error(text);
  }

  if (!res.ok) {
    throw new Error(
      data.error ??
        "Upload gagal"
    );
  }

  return data;
}

async function saveToFirestore(metadata: MusicMetadata): Promise<string> {


  await new Promise((r) => setTimeout(r, 600));
  console.log("FIRESTORE PAYLOAD:", metadata);
  return `doc_${Date.now()}`;
}


function FormatterDecimal() {
    
}

export {saveToFirestore , uploadToPinata}