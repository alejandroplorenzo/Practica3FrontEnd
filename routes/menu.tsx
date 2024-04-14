
import axios from "npm:axios";
import User from "../components/User.tsx"

type User = {
    name: string;
    age: number;
    sex: string;
    description: string;
    hobbies: string;
    photo: string;
    comments: comment[];
};

type comment = {
  user: string;
  message: string;
}


const menu = async () => { 
    try {
    const response = await axios.get<User[]>(
      "https://lovers.deno.dev/"
    );

    if (response && response.data && response.data) {
      return (
        <div class="flex-column">
          <h1 class="mainTitle">USUARIOS BUSCANDO AMOR</h1>
          <a href="/search">
          <button class="botonname">Ir a la página de filtros</button>
          </a>
          <a href="/comentar">
          <button class="botonname">Hacer un comentario</button>
          </a>
          <div class="flex-row flex-around">
            {response.data.map((char, id) => (
              <a href={`/${char.name}`}>
                <User
                key={id} 
                name= {char.name}
                age= {char.age}
                sex= {char.sex}
                description= {char.description}
                hobbies= {char.hobbies}
                photo= {char.photo}
                comments= {char.comments}
                />
                </a>
            ))} 
         </div>
        </div>
      );
    } else {
      return <div>Error: No se encontraron datos de usuarios</div>;
    }
  } catch (error) {
    return <div>Error: {error.message}</div>;
  }
};

export default menu;

