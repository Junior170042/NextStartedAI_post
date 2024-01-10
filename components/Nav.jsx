"use client"
import Link from "next/link";
import Image from "next/image";
import { signIn, signOut, useSession, getProviders } from "next-auth/react"
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
const Nav = () => {

    const { data: session } = useSession()
    const router = useRouter()
    const [providers, setProviders] = useState(null)
    const [toggleMenu, setToggleMenu] = useState(false)

    const logUserOut = () => {
        signOut()

        router.push('/')
    }

    useEffect(() => {
        (async () => {
            const res = await getProviders();
            setProviders(res);
        })();
    }, []);

    return (
        <nav className=' flex flex-between w-full mb-16 pt-3'>
            <Link href="/" className="flex gap-2 flex-center" >
                <Image src="assets/images/logo.svg" alt="logoImage" width={30} height={30} className="object-contain" />
                <p className="logo_text">Post shared</p>
            </Link>

            {/* desktop navigation */}

            <div className="sm:flex hidden">
                {session?.user ? <div className="flex gap-3 sm:gap-5">
                    <Link href="/create-post" className="orange_btn">Create Post</Link>

                    <button type="button" onClick={() => logUserOut()} className="outline_btn">Sign Out</button>

                    <Link href="/profile">
                        <Image className="rounded-full" src={session?.user.image} alt="userImage" width={40} height={40} /></Link>
                </div>
                    :
                    <>
                        {providers && Object.values(providers).map(provider =>
                            <button className="blue_btn" type="button" key={provider.name} onClick={() => signIn(provider.id)}>
                                Sign In with {provider.name}
                            </button>
                        )}
                    </>
                }
            </div>


            {/* mobile navigation */}

            <div className="sm:hidden flex relative">
                {session?.user ? <div className="flex">
                    <Image className="rounded-full" src={session?.user.image} alt="userImage" width={40} height={40} onClick={() => setToggleMenu((prev) => !prev)} />

                    {toggleMenu && (<div className="dropdown">
                        <Link className="dropdown_link" href="/profile" onClick={() => setToggleMenu(false)}>
                            My Profile
                        </Link>
                        <Link className="dropdown_link" href="/create-post" onClick={() => setToggleMenu(false)}>
                            Create Post
                        </Link>

                        <button className=" mt-5 w-full black_btn" type="button" onClick={() => {
                            setToggleMenu(false)
                            logUserOut();
                        }}>
                            Sign Out
                        </button>
                    </div>)}

                </div> :
                    <>
                        {providers && Object.values(providers).map(provider =>
                            <button className="blue_btn" type="button" key={provider.name} onClick={() => signIn(provider.id)}>
                                Sign In with {provider.name}
                            </button>
                        )}
                    </>
                }
            </div>

        </nav>
    );
}

export default Nav;
