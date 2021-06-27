import { FormEvent } from "react";
import { Button } from "../components/Button";
import illustrationImg from "../assets/images/illustration.svg";
import logoImg from "../assets/images/logo.svg";
import "../styles/auth.scss";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";
import { database } from "../services/firebase";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory()
  const [roomName, setRoomName] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (roomName.trim() === "") {
      return;
    }

    const roomRef = database.ref("rooms");
    // ! Validar se o usuario já não possui uma sala com o mesmo nome
    const firebaseRoom = await roomRef.push({
      title: roomName,
      authorId: user?.id,
    });

    history.push(`/rooms/${firebaseRoom.key}`);
  }
  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas de sua audiêcia em tempo real</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letemeask" />
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setRoomName(event.target.value)}
              value={roomName}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
}
