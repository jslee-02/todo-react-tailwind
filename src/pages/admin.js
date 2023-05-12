import { getSession } from "next-auth/react";
import { useRouter } from "next/router";
import AdminPanel from "../components/AdminPanel";

export default function AdminPage({ user, message }) {
  const router = useRouter();
  if (message) {
    return (
      <div className="flex flex-col justify-center h-screen items-center gap-y-4">
        <p className="text-center">{message}</p>
        <button
          className={`w-48 justify-self-center p-1
                      bg-blue-500 text-white
                      border border-blue-500 rounded
                      hover:bg-white hover:text-blue-500`}
          onClick={() => window.history.back()}
        >
          Back to Previous Page
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="flex max-w-[600px] mx-auto mt-[5px] justify-center text-[18px] font-medium">
        Admin Page
      </h1>
      <div className="flex max-w-[600px] mx-auto my-1 justify-end">
        <button
          className={`w-30 mr-1 justify-self-end
                      text-sm underline underline-offset-4
                      hover:font-semibold`}
          onClick={() => router.push("/")}
        >
          Go to Home Page
        </button>
      </div>
      <AdminPanel />
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);
  if (!session || session.user.id !== process.env.ADMIN_USERID) {
    return {
      props: {
        message: "You do not have permission to access this page.",
      }
    };
  }
  return {
    props: {
      user: session.user,
    }
  };
}
