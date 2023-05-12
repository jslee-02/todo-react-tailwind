import React from "react";
import TodoList from "../components/TodoList";

import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import { getSession } from "next-auth/react";

export default function Home({ isAdmin, user }) {
  const router = useRouter();
  const { data } = useSession({
    required: true,
    onUnauthenticated() {
      router.replace("/auth/signin");
    },
  });

  if (isAdmin) {
    return (
      <div>
        <h1 className="flex max-w-[600px] mx-auto mt-[5px] justify-center text-[18px] font-medium">
          Welcome, {user.name}(Admin)!
        </h1>
        <div className="flex max-w-[600px] mx-auto my-1 justify-end">
          <button
            className={`w-30 mr-2 justify-self-end
                        text-sm underline underline-offset-4
                        hover:font-semibold`}
            onClick={() => router.push("/admin")}
          >
            Go to Admin Page
          </button>
          <button
            className={`w-30 mr-1 ml-0.5 justify-self-start
                        text-sm text-red-500 underline underline-offset-4 decoration-red-500
                        hover:font-semibold hover:ml-0`}
            onClick={() => confirmSignOut()}
          >
            Sign Out
          </button>
        </div>
        <TodoList />
      </div>
    );
  }

  if (user) {
    return (
      <div>
        <h1 className="flex max-w-[600px] mx-auto mt-[5px] justify-center text-[18px] font-medium">
          Welcome, {user.name}!
        </h1>
        <div className="flex max-w-[600px] mx-auto my-1 justify-end">
          <button
            className={`w-30 mr-1 justify-self-start
                        text-sm text-red-500 underline underline-offset-4 decoration-red-500
                        hover:font-semibold`}
            onClick={() => confirmSignOut()}
          >
            Sign Out
          </button>
        </div>
        <TodoList />
      </div>
    );
  }
}

const confirmSignOut = () => {
  if (confirm("Are you sure want to sign out?")) {
    signOut();
  }
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session || session.user.id !== process.env.ADMIN_USERID) {
    return {
      props: {
        isAdmin: false,
        user: session ? session.user : null
      }
    };
  }
  return {
    props: {
      isAdmin: true,
      user: session.user
    }
  };
}