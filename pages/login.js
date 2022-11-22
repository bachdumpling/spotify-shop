import { getProviders, signIn } from "next-auth/react";

function Login({ providers }) {
  return (
    <div className="bg-white min-h-screen flex flex-col w-full justify-center items-center">
      <img
        className="h-52"
        src="https://www.pngmart.com/files/22/Spotify-Logo-PNG-Transparent.png"
      />
      {Object.values(providers).map((provider) => {
        return (
          <div className="text-white bg-green-500 rounded-full p-4" key={provider.name}>
            <button
            onClick={() => signIn(provider.id, { callbackUrl: "/"})}
            >
              Log in with {provider.name}
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Login;

export async function getServerSideProps() {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
}
