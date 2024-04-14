import { FreshContext, Handlers, PageProps } from "$fresh/server.ts";
import SearchUser from "../components/SearchUser.tsx";
import axios from "npm:axios";

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

type Data = {
  name?: string;
  age?: number;
  sex?: string;
  hobbies?: string;
  users?: User[];
}

export const handler: Handlers = {
    GET: async (req: Request, ctx: FreshContext<unknown, Data>)=>{
      const url = new URL(req.url);
      const name = url.searchParams.get("name") || undefined;
      const age = url.searchParams.get("age") || undefined;
      const sex = url.searchParams.get("sex") || undefined;
      const hobbies = url.searchParams.get("hobbies") || undefined;
  
      let users: User[] = [];
      if (name || age || sex || hobbies) {
        try {
          const response = await axios.get('https://lovers.deno.dev/');
          users = response.data;
          users = users.filter((user: User) =>
            (name === undefined || user.name.includes(name)) &&
            (age === undefined || user.age.toString().includes(age)) &&
            (sex === undefined || user.sex.includes(sex)) &&
            (hobbies === undefined || user.hobbies.includes(hobbies))
          );
        } catch (error) {
          console.error('Error', error);
          return new Response('Error al buscar usuarios', { status: 500 });
        }
      }
      return ctx.render({ users });
    }
  }
 
  

const Page = (props: PageProps<Data>) => {
  return (
    <div>
      <SearchUser users={props.data.users}/>
    </div>
  );
};

export default Page;
