"use client"; // Ensure this file runs as a client component

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getSession, getUserById } from "../db/queries";
import { motion } from "framer-motion";

const Navbar = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const session = await getSession();
        if (session) {
          const fetchedUser = await getUserById(session.user.id);
          setUser(fetchedUser);
        }
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <nav className="fixed w-full bg-gray-950 backdrop-blur-sm py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-extrabold tracking-tight">
          <motion.img
            src="/Goose.png"
            alt="GeeseTalk Logo"
            className="inline-block h-8 w-12"
            whileHover={{ scale: 1.7, rotate: 20 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
          GeeseTalk
        </Link>
        <div className="flex items-center space-x-6">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            Home
          </Link>
          <Link href="/learn" className="text-gray-300 hover:text-white transition-colors">
            Learn
          </Link>

          {user ? (
            <>
              <Link href="/profile" className="text-gray-300 hover:text-white transition-colors">
                Profile
              </Link>
              <Link href="/api/auth/signout" className="text-gray-300 hover:text-white transition-colors">
                Log out
              </Link>
            </>
          ) : (
            <Link href="/api/auth/signin" className="text-gray-300 hover:text-white transition-colors">
              Log in
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
