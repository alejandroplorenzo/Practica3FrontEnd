import { FunctionComponent } from "preact";
import User from "../components/User.tsx"

type UserProps = {
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
type SearchUserProps = {
  users?: UserProps[];
};

const SearchUser: FunctionComponent<SearchUserProps> = ({ users }) => {
  return (
    <div>
      <form class="searchUser" action="/search" method="get">
        <h1>BUSCAR USUARIO</h1>
        <li>Introduce los criterios de búsqueda</li>
        <input type="text" name="name" placeholder="Nombre" />
        <input type="text" name="age" placeholder="Edad" />
        <input type="text" name="sex" placeholder="Sexo" />
        <input type="text" name="hobbies" placeholder="Hobbies" />
        <button type="submit">Buscar</button>  
      </form>
      {users && users.map((user, index) => (
        <a href={`/${user.name}`} key={index}>
          <User {...user} />
        </a>
      ))}
    </div>
  );
};

export default SearchUser;

