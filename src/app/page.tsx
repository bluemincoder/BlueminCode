import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/nextjs";

export default function Home() {
    return (
        <div>
            <SignedOut>
                <SignUpButton />
            </SignedOut>
            <SignedIn>
                <SignOutButton />
            </SignedIn>
        </div>
    );
}
