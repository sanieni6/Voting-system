'use client'
import { Typography } from "@material-tailwind/react";
 
export function Footer() {
  return (
    <footer className="w-full bg-zinc-900 p-8 relative bottom-0">
      <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 bg-zinc-900 text-center md:justify-between">
        {/* <img src="/img/logo-ct-dark.png" alt="logo-ct" className="w-10" /> */}
        <h3 className="text-white">Chiang</h3>
        <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 text-white"
            >
              About Us
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 text-white"
            >
              License
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 text-white"
            >
              Contribute
            </Typography>
          </li>
          <li>
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              className="font-normal transition-colors hover:text-blue-500 focus:text-blue-500 text-white"
            >
              Contact Us
            </Typography>
          </li>
        </ul>
      </div>
      <hr className="my-8 border-blue-gray-50" />
      <Typography color="blue-gray" className="text-center font-normal text-white">
        &copy; 2023 Chiang, Rigths Reserved
      </Typography>
    </footer>
  );
}