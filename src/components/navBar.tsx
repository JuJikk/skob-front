import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";
import React from "react";
import ModalButton from "@/components/Modal/ModalButton";
import {auth} from "@clerk/nextjs/server";

export const NavBar = () => {
    const { userId } = auth();
  return (
      <div className="flex m-2 justify-between">
          <h1 className="ml-4 font-extrabold text-red-600 text-2xl">Skob</h1>
          {userId && <ModalButton/>}
          <div>
              <SignedOut>
                  {" "}
                  <SignInButton />{" "}
              </SignedOut>{" "}
              <SignedIn>
                  {" "}
                  <UserButton />{" "}
              </SignedIn>
          </div>
      </div>
  );
};
