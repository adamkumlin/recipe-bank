"use client";
import PostAddIcon from '@mui/icons-material/PostAdd';

import Link from "next/link";

export default function Home() {

  return (
    <div className="flex flex-row justify-evenly text-center">
        <Link href="new-recipe"><PostAddIcon /><h2>New recipe</h2></Link>
        <Link href="my-recipes" className=""><h2>My recipes</h2></Link>
    </div>
  );
}