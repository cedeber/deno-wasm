/** @jsx h */
import { h } from "preact";
import { PageProps } from "$fresh/server.ts";
import { Handlers } from "$fresh/server.ts";

interface User {
  login: string;
  name: string;
  avatar_url: string;
}

export const handler: Handlers<User | null> = {
  async GET(_req, ctx) {
    const { name } = ctx.params;
    const resp = await fetch(`https://api.github.com/users/${name}`);
    if (resp.status === 404) {
      return ctx.render(null);
    }
    const user: User = await resp.json();
    return ctx.render(user);
  },
};

export default function Greet(props: PageProps<User | null>) {
  if (props.data) {
    return (
      <div>
        <img src={props.data.avatar_url} width={64} height={64} />
        <h1>{props.data.name}</h1>
        <p>{props.data.login}</p>
      </div>
    );
  }
  return <div>Hello {props.params.name}</div>;
}
