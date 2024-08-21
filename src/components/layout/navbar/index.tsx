import ModalButton from "../../modal/modal-button";

export const NavBar = () => {
    // const { userId } = auth();
  return (
      <div className="flex m-2 justify-between">
          <h1 className="ml-4 font-extrabold text-red-600 text-2xl">Skob</h1>
          {/*{userId && */}
              <ModalButton />
          {/*}*/}
          {/*<div>*/}
          {/*    <SignedOut>*/}
          {/*        {" "}*/}
          {/*        <SignInButton />{" "}*/}
          {/*    </SignedOut>{" "}*/}
          {/*    <SignedIn>*/}
          {/*        {" "}*/}
          {/*        <UserButton />{" "}*/}
          {/*    </SignedIn>*/}
          {/*</div>*/}
      </div>
  );
};
