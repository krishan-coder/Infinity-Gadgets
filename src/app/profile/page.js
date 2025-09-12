'use client';
import { signOut } from "next-auth/react";
import { getSession } from "next-auth/react";
import { useEffect } from "react";
import { Bars3Icon, UserCircleIcon, IdentificationIcon, EnvelopeIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';
import { useState } from "react";
import Image from "next/image";



export default function ProfilePage() {
    const router = useRouter();
    const [user, setUser] = useState({
        id: "1234567890abcdef",
        name: "John Doe",
        email: "john.doe@example.com",
    });

    const handleLogout = () => {
        signOut({redirect: false});
        router.push('/');
    };


    useEffect(() => {
        const fetchSession = async () => {
            try {
                const session = await getSession()
                if (session && session.user) {
                    setUser(session.user);
                } else {
                    await signOut({ redirect: false });
                    router.push('/auth?mode=login');
                }
            } catch (error) {
                await signOut({ redirect: false });
                router.push('/auth?mode=login');
            }
        };
        fetchSession();
    }, [router]);
    
    return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden max-w-sm w-full p-8 border-t-8 border-green-500">

        <div className="flex flex-col items-center text-center">
          <Image
            src={`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=4ade80&color=ffffff&size=128&rounded=true`}
            width={128}
            height={128}
            alt={`${user.name}'s profile picture`}
            className="w-32 h-32 rounded-full border-4 border-green-200 shadow-lg mb-4 object-cover"
          />
          <h1 className="text-3xl font-bold text-gray-800 mb-1 leading-snug">{user.name}</h1>
          <p className="text-green-500 font-medium">{"User Profile"}</p>
        </div>

        <div className="mt-8 space-y-4">
          <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl">
            <IdentificationIcon className="w-6 h-6 text-green-500" />
            <div>
              <p className="text-xs font-semibold text-gray-400">{"User ID"}</p>
              <p className="font-medium text-gray-700 break-all">{user.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4 bg-gray-50 p-4 rounded-xl">
            <EnvelopeIcon className="w-6 h-6 text-green-500" />
            <div>
              <p className="text-xs font-semibold text-gray-400">{"Email Address"}</p>
              <p className="font-medium text-gray-700 break-all">{user.email}</p>
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleLogout}
            className="w-full px-6 py-3 bg-red-500 text-white font-medium rounded-xl shadow-lg hover:bg-red-600 transition duration-300"
          >
            Sign Out
          </button>
        </div>
      </div>
    </div>
  );
}
