import { useAuth } from "./AuthContext"

/** Users can enter their name to receive a token from the API. */
export default function Entrance() {
  const { signup } = useAuth();

  // TODO: call signup when form is submitted
  const response = (FormData) => {
    signup(FormData.get("name"));
  };

  return (
    <>
      <h1>Cave Entrance</h1>
      <p>Your journey has brought you to the base of a rocky mountain.</p>
      <p>
        The quickest path forward is through the mountain&apos;s winding tunnels, but
        a sturdy metal gate sits closed before you.
      </p>
      <p>
        Two giant badgers stand guard on either side of the gate, their eyes
        fixed on you. The one on the left opens its mouth, and with a deep,
        rumbling voice, it asks, &quot;Who approaches? Speak your name.&quot;
      </p>
      <form action={response}>
        <label>
          Name
          <input name="name" />
        </label>
        <button>Respond</button>
      </form>
    </>
  );
}
