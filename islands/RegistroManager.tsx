import { useState } from "preact/hooks";
import { uuid } from "https://deno.land/x/uuid@v0.1.2/v4.ts";
import Axios from "npm:axios";

type User = {
  name: string;
  age: string;
  sex: string;
  description: string;
  hobbies: string[];
  photo: string;
  comments: comment[];
};

type comment = {
  user: string;
  message: string;
}

const RegistroManager = () => {
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [sex, setSex] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [photo, setPhoto] = useState<string>("");
  const [comments, setComments] = useState<comment[]>([]);
  const [error, setError] = useState<string>("");
  const [users, setUsers] = useState<User[]>([]);
  const [usuario, setUsuario] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const validateContact = (user: User, users: User[]): boolean => {
    return user.name.length > 0 && user.age.length > 0 && user.sex.length > 0 && user.description.length > 0 && user.hobbies.length > 0 && user.photo.length > 0;
  };

const addUser = async (user: User, users: User[]) => {
  if (!validateContact(user, users)) {
      setError("Usuario inválido. Algún campo no ha sido rellenado");
      return;
  }
  try {
      const proxyurl = "https://cors-anywhere.herokuapp.com/";
      const url = 'https://lovers.deno.dev/';
      const response = await fetch(proxyurl + url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              name: user.name,
              password: password,
              age: Number(user.age), 
              sex: user.sex,
              description: user.description,
              hobbies: user.hobbies,
              photo: user.photo,
              comments: user.comments.map(comment => comment.message) 
          })
      });

      if (!response.ok) {
          throw new Error("Error al enviar el usuario");
      }
      window.location.href = "/menu";

      document.cookie = `username=${user.name}; path=/`;
      document.cookie = `password=${password}; path=/`;

      const newUser = { ...user, id: uuid() };
      setUsers([...users, newUser]);
      setUsuario('');
      setPassword('');
      setName('');
      setAge('');
      setSex('');
      setDescription('');
      setHobbies([]);
      setPhoto('');
      setComments([]);
  } catch (error) {
      console.error(error);
  }
};
return (
    <>
      <div class="agendaForm">
        <h2>Añadir Nuevo Usuario</h2>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onInput={(e) => {
            setError("");
            setName(e.currentTarget.value);
          }}
        />
        <input
          type="text"
          placeholder="Age"
          value={age}
          onInput={(e) => {
            setError("");
            setAge(e.currentTarget.value);
          }}
        />

        <input
          type="text"
          placeholder="Sex"
          value={sex}
          onInput={(e) => {
            setError("");
            setSex(e.currentTarget.value);
          }}
        />

        <input
          type="text"
          placeholder="Description"
          value={description}
          onInput={(e) => {
            setError("");
            setDescription(e.currentTarget.value);
          }}
        />

        <input
          type="text"
          placeholder="Hobbies"
          value={hobbies.join(', ')} 
          onInput={(e) => {
            setError("");
            setHobbies(e.currentTarget.value.split(', ')); 
          }}
        />


        <input
          type="text"
          placeholder="Photo"
          value={photo}
          onInput={(e) => {
            setError("");
            setPhoto(e.currentTarget.value);
          }}
        />

        <input
          type="text"
          placeholder="Usuario"
          value={usuario}
          onInput={(e) => {
            setError("");
            setUsuario(e.currentTarget.value);
          }}
        />

        <input
          type="text"
          placeholder="Password"
          value={password}
          onInput={(e) => {
            setError("");
            setPassword(e.currentTarget.value);
          }}
        />
        <button onClick={() => {
          addUser({name, age, sex, description, hobbies,photo, comments }, users);
        }}>
          Añadir Usuario
        </button>

        {error && <p class="error">{error}</p>}
      </div>
    </>
  );
};

export default RegistroManager;

