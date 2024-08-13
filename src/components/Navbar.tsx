"use client";

import { ArrowUp, LogInIcon, LogOutIcon } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { useClerk, useUser } from "@clerk/nextjs";

const Navbar = () => {
  const { signOut } = useClerk();
  const { isSignedIn } = useUser();

  return (
    <div className="w-full px-5 md:px-8 py-4 bg-background flex justify-between">
      <Link href="/">
        <svg
          width="156"
          height="32"
          viewBox="0 0 156 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M33.7831 29V9.74311H30.3129V5.96H42.3449V9.74311H38.9031V29H33.7831ZM50.3236 29.3413C48.5979 29.3413 47.2326 29.0379 46.2276 28.4311C45.2225 27.8243 44.5019 26.952 44.0658 25.8142C43.6296 24.6764 43.4116 23.3206 43.4116 21.7467V13.1849C43.4116 11.592 43.6296 10.2361 44.0658 9.11733C44.5019 7.99852 45.2225 7.14518 46.2276 6.55733C47.2326 5.95052 48.5979 5.64711 50.3236 5.64711C52.0682 5.64711 53.443 5.95052 54.448 6.55733C55.472 7.14518 56.2021 7.99852 56.6382 9.11733C57.0744 10.2361 57.2924 11.592 57.2924 13.1849V21.7467C57.2924 23.3206 57.0744 24.6764 56.6382 25.8142C56.2021 26.952 55.472 27.8243 54.448 28.4311C53.443 29.0379 52.0682 29.3413 50.3236 29.3413ZM50.3236 25.7289C50.8545 25.7289 51.2433 25.5961 51.4898 25.3307C51.7363 25.0652 51.8975 24.7239 51.9733 24.3067C52.0492 23.8895 52.0871 23.4628 52.0871 23.0267V11.9333C52.0871 11.4782 52.0492 11.0516 51.9733 10.6533C51.8975 10.2361 51.7363 9.89481 51.4898 9.62933C51.2433 9.36385 50.8545 9.23111 50.3236 9.23111C49.8305 9.23111 49.4607 9.36385 49.2142 9.62933C48.9677 9.89481 48.8065 10.2361 48.7307 10.6533C48.6548 11.0516 48.6169 11.4782 48.6169 11.9333V23.0267C48.6169 23.4628 48.6453 23.8895 48.7022 24.3067C48.7781 24.7239 48.9298 25.0652 49.1573 25.3307C49.4039 25.5961 49.7926 25.7289 50.3236 25.7289ZM66.8156 29V5.96H72.6467C74.6567 5.96 76.2212 6.216 77.34 6.728C78.4588 7.22103 79.2458 8.008 79.7009 9.08889C80.156 10.1508 80.3836 11.5351 80.3836 13.2418V21.6044C80.3836 23.3301 80.156 24.7428 79.7009 25.8427C79.2458 26.9236 78.4588 27.72 77.34 28.232C76.2402 28.744 74.6947 29 72.7036 29H66.8156ZM71.9071 25.4729H72.7036C73.481 25.4729 74.0404 25.3591 74.3818 25.1316C74.7231 24.904 74.9317 24.5627 75.0076 24.1076C75.1024 23.6524 75.1498 23.0836 75.1498 22.4009V12.36C75.1498 11.6773 75.0929 11.1274 74.9791 10.7102C74.8843 10.293 74.6662 9.98963 74.3249 9.8C73.9836 9.61037 73.4336 9.51555 72.6751 9.51555H71.9071V25.4729ZM89.6547 29.3413C87.929 29.3413 86.5637 29.0379 85.5587 28.4311C84.5536 27.8243 83.833 26.952 83.3969 25.8142C82.9607 24.6764 82.7427 23.3206 82.7427 21.7467V13.1849C82.7427 11.592 82.9607 10.2361 83.3969 9.11733C83.833 7.99852 84.5536 7.14518 85.5587 6.55733C86.5637 5.95052 87.929 5.64711 89.6547 5.64711C91.3993 5.64711 92.7741 5.95052 93.7791 6.55733C94.8031 7.14518 95.5332 7.99852 95.9693 9.11733C96.4055 10.2361 96.6236 11.592 96.6236 13.1849V21.7467C96.6236 23.3206 96.4055 24.6764 95.9693 25.8142C95.5332 26.952 94.8031 27.8243 93.7791 28.4311C92.7741 29.0379 91.3993 29.3413 89.6547 29.3413ZM89.6547 25.7289C90.1856 25.7289 90.5744 25.5961 90.8209 25.3307C91.0674 25.0652 91.2286 24.7239 91.3044 24.3067C91.3803 23.8895 91.4182 23.4628 91.4182 23.0267V11.9333C91.4182 11.4782 91.3803 11.0516 91.3044 10.6533C91.2286 10.2361 91.0674 9.89481 90.8209 9.62933C90.5744 9.36385 90.1856 9.23111 89.6547 9.23111C89.1616 9.23111 88.7919 9.36385 88.5453 9.62933C88.2988 9.89481 88.1376 10.2361 88.0618 10.6533C87.9859 11.0516 87.948 11.4782 87.948 11.9333V23.0267C87.948 23.4628 87.9764 23.8895 88.0333 24.3067C88.1092 24.7239 88.2609 25.0652 88.4884 25.3307C88.735 25.5961 89.1237 25.7289 89.6547 25.7289ZM106.147 29V5.96H111.238V25.5582H116.529V29H106.147ZM118.36 29V5.96H123.451V29H118.36ZM132.576 29.3413C131.134 29.3413 129.93 29.0853 128.963 28.5733C127.996 28.0613 127.266 27.2744 126.773 26.2124C126.28 25.1316 126.005 23.7378 125.948 22.0311L130.3 21.3769C130.319 22.363 130.404 23.1594 130.556 23.7662C130.727 24.373 130.954 24.8092 131.239 25.0747C131.542 25.3401 131.902 25.4729 132.32 25.4729C132.851 25.4729 133.192 25.2927 133.344 24.9324C133.514 24.5721 133.6 24.1929 133.6 23.7947C133.6 22.8465 133.372 22.0501 132.917 21.4053C132.462 20.7416 131.845 20.0779 131.068 19.4142L129.077 17.6791C128.205 16.9396 127.465 16.1052 126.858 15.176C126.27 14.2279 125.976 13.0616 125.976 11.6773C125.976 9.72415 126.555 8.23555 127.712 7.21155C128.868 6.16859 130.442 5.64711 132.433 5.64711C133.666 5.64711 134.652 5.8557 135.392 6.27289C136.15 6.69007 136.719 7.24 137.098 7.92266C137.496 8.58637 137.762 9.29748 137.895 10.056C138.046 10.7956 138.132 11.5067 138.151 12.1893L133.77 12.7298C133.751 12.0471 133.704 11.4593 133.628 10.9662C133.571 10.4542 133.438 10.0655 133.23 9.8C133.021 9.51555 132.699 9.37333 132.263 9.37333C131.789 9.37333 131.438 9.57244 131.21 9.97066C131.002 10.3689 130.897 10.7671 130.897 11.1653C130.897 12.0187 131.096 12.7203 131.495 13.2702C131.912 13.8012 132.452 14.3606 133.116 14.9484L135.022 16.6267C136.027 17.48 136.871 18.4471 137.553 19.528C138.255 20.6089 138.606 21.9458 138.606 23.5387C138.606 24.6196 138.359 25.6056 137.866 26.4969C137.373 27.3692 136.672 28.0613 135.761 28.5733C134.87 29.0853 133.808 29.3413 132.576 29.3413ZM142.721 29V9.74311H139.251V5.96H151.283V9.74311H147.841V29H142.721Z"
            fill="#1E293B"
          />
          <path
            d="M0 2.96289H16.8888L23.9999 10.074H7.11109L0 2.96289Z"
            fill="#A5F3FC"
          />
          <path
            d="M7.11133 26.9629L7.11133 10.074L0.000239372 2.96293L0.000239372 19.8518L7.11133 26.9629Z"
            fill="#CFFAFE"
          />
          <path
            d="M24 26.9629L7.11116 26.9629L7.38502e-05 19.8518L16.8889 19.8518L24 26.9629Z"
            fill="#155E75"
          />
          <path
            d="M16.8887 2.96289L16.8887 19.8517L23.9998 26.9628L23.9998 10.074L16.8887 2.96289Z"
            fill="#0891B2"
          />
        </svg>
      </Link>
      {isSignedIn ? (
        <Button
          onClick={() => signOut()}
          className={buttonVariants({ variant: "default" })}
        >
          <LogOutIcon className="pr-2" />
          Logout
        </Button>
      ) : (
        <div className="flex flex-col gap-4 md:flex-row">
          <Link
            href="/signup"
            className={buttonVariants({ variant: "defaultOutline" })}
          >
            <ArrowUp className="pr-2" />
            Sign up
          </Link>
          <Link
            href="/login"
            className={buttonVariants({ variant: "default" })}
          >
            <LogInIcon className="pr-2" />
            Log in
          </Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
