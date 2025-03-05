'use client'

import { useUser } from "@/app/hooks/useUser";
import { ChevronRight, LogOut } from "lucide-react";
import Image from "next/image"; // Import the Image component from Next.js
import { Button } from "./button";
import logOut from "@/app/hooks/useLogOut";
import { useRouter } from "next/navigation";
import Link from "next/link";

function Header1() {
    const { userInfo } = useUser();
    const router = useRouter();

    const navigationItems = [
        { title: "INTRA", href: "/" },
        { title: "ROUEN", href: "/" },
        { title: "PROFILE", href: "/" },
    ];


    async function handleLogOut(e: React.FormEvent) {
        e.preventDefault();
        try {
            await logOut();
            router.push("/login");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <header className="w-full z-40 fixed top-0 left-0">
            <div className="container relative mx-auto min-h-20 flex gap-4 flex-row lg:grid lg:grid-cols-3 items-center">
                <div className="justify-start items-center gap-10 lg:flex hidden flex-row">
                    <Image
                        src="https://zone01normandie.org/assets/img/logo.png"
                        alt="Logo" // Add meaningful alt text here
                        width={100} // Set the width of the image
                        height={40} // Set the height of the image
                    />
                    {navigationItems.map((item) => (
                        <div key={item.title} className="justify-start items-center gap-4 lg:flex hidden flex-row">
                            {item.href && (
                                <div className="font-medium text-base flex gap-2 items-center">
                                    {item.title}
                                    <ChevronRight size={20} />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
                <div className="flex lg:justify-center"></div>
                <div className="flex justify-end w-full gap-4 items-center">
                    <svg role="img" width="25px" viewBox="0 0 24 23" aria-label="icon"><path fill="#e8e1f0" stroke="none" d="M12.8086 8.81991L15.1181 11.1295C14.9692 11.4907 14.9484 11.8922 15.0595 
      12.2669C15.1705 12.6416 15.4065 12.9669 15.7283 13.1887C16.05 13.4105 
      16.4381 13.5154 16.8277 13.4859C17.2174 13.4563 17.5852 13.2942 17.8699 
      13.0264C18.1545 12.7587 18.3389 12.4015 18.3921 12.0143C18.4454 11.6272 
      18.3645 11.2334 18.1627 10.8987C17.961 10.564 17.6507 10.3086 17.2835 
      10.1748C16.9163 10.0411 16.5143 10.0373 16.1446 10.1639L13.6615 
      7.68822C13.7655 7.38656 13.783 7.06182 13.712 6.75074C13.641 6.43965 
      13.4844 6.15465 13.2598 5.92797C13.0352 5.7013 12.7517 5.54199 12.4413 
      5.46808C12.1309 5.39417 11.806 5.40861 11.5034 5.50976L8.93353 
      2.94545L10.9643 0.914683C11.2341 0.646369 11.5992 0.495758 11.9797 
      0.495758C12.3602 0.495758 12.7253 0.646369 12.9951 0.914683L22.7483 
      10.6679C23.0161 10.9382 23.1661 11.3035 23.1654 11.6841C23.1647 12.0646 
      23.0134 12.4294 22.7446 12.6987L13.0357 22.4076C12.7659 22.6759 12.4008 
      22.8265 12.0203 22.8265C11.6398 22.8265 11.2747 22.6759 11.0049 
      22.4076L1.25169 12.6544C0.983375 12.3846 0.832764 12.0195 0.832764 
      11.639C0.832764 11.2585 0.983375 10.8934 1.25169 10.6236L7.93846 
      3.93499L10.4788 6.46791C10.348 6.78143 10.3133 7.12672 10.379 7.46C10.4448 
      7.79328 10.608 8.09953 10.848 8.33991C11.0062 8.49858 11.1945 8.62411 11.4018 
      8.70914V14.8513C11.0615 14.9912 10.7753 15.237 10.5855 15.5523C10.3957 
      15.8675 10.3125 16.2355 10.3482 16.6018C10.3838 16.968 10.5364 17.313 
      10.7834 17.5858C11.0304 17.8586 11.3587 18.0445 11.7196 18.1162C12.0805 
      18.1879 12.4549 18.1415 12.7874 17.9838C13.1199 17.8262 13.3928 17.5656 
      13.5657 17.2408C13.7386 16.916 13.8023 16.5441 13.7474 16.1803C13.6925 
      15.8164 13.5219 15.4799 13.2609 15.2205C13.1285 15.0893 12.9757 14.9802 
      12.8086 14.8975V8.81991ZM13.7317 11.0484V14.4029C13.7937 14.4541 13.8534 
      14.5081 13.9107 14.5649L13.9116 14.5657C14.3132 14.9648 14.5757 15.4827 
      14.6602 16.0426C14.7446 16.6025 14.6466 17.1747 14.3805 17.6745C14.1145 
      18.1744 13.6946 18.5753 13.1829 18.8179C12.6713 19.0605 12.0952 19.1319 
      11.5398 19.0216C10.9844 18.9113 10.4793 18.6251 10.0992 18.2054C9.71913 
      17.7857 9.48429 17.2548 9.42944 16.6912C9.37459 16.1276 9.50265 15.5614 
      9.79466 15.0762C9.97253 14.7807 10.2055 14.5249 10.4788 
      14.3214V9.23842C10.3785 9.16343 10.2836 9.08115 10.1948 8.99212C9.82558 
      8.62235 9.57451 8.15127 9.47339 7.63863C9.41513 7.34322 9.40817 7.04168 
      9.45122 6.74689L7.9395 5.23956L1.90622 11.2745C1.90602 11.2747 1.90582 
      11.2749 1.90561 11.2751C1.80968 11.3719 1.75584 11.5027 1.75584 
      11.639C1.75584 11.7753 1.80966 11.906 1.90557 12.0028C1.90579 12.003 
      1.90601 12.0033 1.90622 12.0035L11.6558 21.7531C11.656 21.7533 11.6563 
      21.7535 11.6565 21.7537C11.7533 21.8496 11.884 21.9035 12.0203 
      21.9035C12.1566 21.9035 12.2873 21.8496 12.3841 21.7537C12.3844 
      21.7535 12.3846 21.7533 12.3848 21.7531L22.0913 12.0466C22.0914 
      12.0465 22.0916 12.0463 22.0917 12.0462C22.1879 11.9495 22.2421 
      11.8188 22.2423 11.6824C22.2426 11.5463 22.1891 11.4156 22.0937 
      11.3187C22.0933 11.3183 22.093 11.318 22.0926 11.3176L12.3442 1.56922C12.344 
      1.569 12.3437 1.56878 12.3435 1.56856C12.2467 1.47266 12.116 1.41883 11.9797 
      1.41883C11.8434 1.41883 11.7126 1.47266 11.6159 1.56856C11.6156 1.56878 
      11.6154 1.569 11.6152 1.56922L10.2397 2.94475L11.8076 4.50927C12.0902 4.48364 
      12.3764 4.50376 12.6551 4.57011C13.1331 4.68393 13.5697 4.92925 
      13.9156 5.27832C14.2614 5.6274 14.5026 6.06629 14.6119 6.54534C14.6751 
      6.82211 14.6928 7.1059 14.6656 7.3858L16.4458 9.16075C16.8339 9.12333 17.2281 
      9.17233 17.5993 9.30748C18.1648 9.51338 18.6427 9.90682 18.9533 10.4222C19.264 
      10.9377 19.3887 11.544 19.3066 12.1402C19.2245 12.7364 18.9407 13.2865 18.5023 
      13.6988C18.064 14.1111 17.4976 14.3608 16.8975 14.4063C16.2974 14.4518 15.6998
      14.2903 15.2044 13.9487C14.7089 13.6071 14.3454 13.1061 14.1744 
      12.5291C14.0661 12.1635 14.0392 11.7815 14.0924 11.4091L13.7317 11.0484Z"></path></svg>
                    <Link href={`https://zone01normandie.org/git/${userInfo?.login}`}>
                        Gitea
                    </Link>
                    <div className="border-r hidden md:inline"></div>
                    <svg role="img" width="20px" viewBox="0 0 130 130" aria-label="icon"><g fill="none" stroke="#e8e1f0" strokeWidth="9px"><circle cx="64" cy="42" r="34"></circle><path d="M81 72c18 6 32 27 32 50H17c0-23 13-43 31-50"></path></g></svg>
                    <Link href={"/dashboard"}>
                        {userInfo?.login}
                    </Link>

                    <form onSubmit={handleLogOut}>
                        <Button variant="ghost" type="submit" className="hidden md:inline">
                            <LogOut />
                        </Button>

                    </form>

                </div>
                <div className="flex w-12 shrink lg:hidden items-end justify-end">
                    <form onSubmit={handleLogOut}>
                        <Button variant="ghost" type="submit" className="hidden md:inline">
                            <LogOut />
                        </Button>
                    </form>
                </div>
            </div>
        </header>
    );
}

export { Header1 };
