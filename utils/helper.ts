import { MusicMetadata } from "@/types";

async function uploadToPinata(
  file: File
) {
  // ambil signed url
  const signed =
    await fetch(
      "/api/pinata-url"
    );

  const { url } =
    await signed.json();

  // upload langsung ke pinata
  const upload =
    await fetch(url, {
      method: "POST",
      body: (() => {
        const fd =
          new FormData();

        fd.append(
          "file",
          file
        );

        return fd;
      })(),
    });

  const result =
    await upload.json();

  const cid =
    result.cid;

  return {
    cid,
    url:
      `https://gateway.pinata.cloud/ipfs/${cid}`,
  };
}
async function saveToFirestore(metadata: MusicMetadata): Promise<string> {


  await new Promise((r) => setTimeout(r, 600));
  console.log("FIRESTORE PAYLOAD:", metadata);
  return `doc_${Date.now()}`;
}


function FormatterDecimal() {
    
}

export {saveToFirestore , uploadToPinata}