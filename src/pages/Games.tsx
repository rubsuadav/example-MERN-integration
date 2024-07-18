import { useParams } from "react-router-dom";
import { API_URL } from "../config";
import { useEffect, useState } from "react";

export default function Games() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [game, setGame] = useState({
    name: "",
    genre: "",
    image: {},
  });
  const { id } = useParams();

  async function getGameById() {
    const response = await fetch(`${API_URL}/api/game/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    setGame(data);
  }

  // actualizar y mostrar imagen del juego
  function handleSelectedFile(event: any) {
    setSelectedFile(event.target.files[0]);
  }

  async function uploadImage(e: any) {
    e.preventDefault();
    const formData = new FormData();

    if (!selectedFile) {
      return;
    }

    formData.append("image", selectedFile);

    const response = await fetch(`${API_URL}/api/game/${id}/uploadImage`, {
      method: "POST",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
      },
      body: formData,
    });

    switch (response.status) {
      case 200:
        const data = await response.json();
        const imageData = data.img.buffer.data;

        // convertir la imagen (buffer) a base64
        const base64 = btoa(
          new Uint8Array(imageData).reduce(
            (data, byte) => data + String.fromCharCode(byte),
            ""
          )
        );
        setGame({ ...game, image: base64 });
        localStorage.setItem("image", base64);
        break;
      case 400:
        break;
      case 404:
        break;
      case 500:
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    getGameById();
    const savedImage = localStorage.getItem("image");
    if (savedImage) {
      setGame((currentGame) => ({ ...currentGame, image: savedImage }));
    }
  }, [id]);

  return (
    <div className="flex flex-col items-center justify-start pt-20 h-screen bg-primary-green">
      <div className="flex flex-col items-center justify-center py-4 px-32 bg-white rounded-lg">
        <h1 className="text-3xl font-bold mb-4">{game.name}</h1>
        <h3 className="text-sm text-gray-500 mb-8">{game.genre}</h3>

        <form
          onSubmit={uploadImage}
          className="flex flex-col items-center justify-center"
        >
          <input
            type="file"
            onChange={handleSelectedFile}
            accept="image/*"
            className="mb-4"
          />
          <button type="submit">Subir imagen</button>
        </form>
        {/*mostrar la imagen*/}
        {game.image && (
          <img
            src={`data:image/jpeg;base64,${game.image}`}
            alt="game"
            className="w-64 h-64 mb-8 rounded-full border-2 border-gray-300"
          />
        )}
      </div>
    </div>
  );
}
