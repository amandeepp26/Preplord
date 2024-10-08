"use client";

import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import {
  Bars3Icon,
  XMarkIcon,
  BookOpenIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
  UserCircleIcon,
} from "@heroicons/react/20/solid";

import preplordLogo from "../../../public/logo/logo.png";
import Image from "next/image";
import Link from "next/link";
import Login from "../layouts/Login";
import { useExams } from "@/hooks/useExams";
import RightDrawer from "./Drawer";
import CartItems from "./CartItems";
import Otp from "../layouts/Otp";
import { useRecoilValue } from "recoil";
import { authState } from "@/recoil/authState";

interface examList {
  name: string;
}

const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Example() {
  const { exams, isLoading }: any = useExams();


  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [open, setopen] = useState(false);
  const [otpOpen, setotpOpen] = useState(false);

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { isAuthenticated, user } = useRecoilValue(authState);

  console.log("isAuthenticated", isAuthenticated, user);

  const handleOpenDrawer = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleOtpOpen = () => {
    setotpOpen(true);
  };

  return (
    <>
      {/* Login modal */}
      <Login open={open} setopen={setopen} hadleOtpOpen={handleOtpOpen} />
      {/* Otp modal */}
      <Otp open={otpOpen} setopen={setotpOpen} />
      {/* cart items drawer */}
      <RightDrawer isOpen={isDrawerOpen} onClose={handleCloseDrawer}>
        <CartItems />
      </RightDrawer>
      <header className="bg-white w-[100%] fixed z-40 shadow-md">
        <nav
          className="mx-auto flex items-center justify-between p-3 lg:px-8"
          aria-label="Global"
        >
          <div className="flex lg:flex-1">
            <Link href="/" className="-m-1.5 p-1.5">
              <Image
                className=""
                src={preplordLogo}
                width={180}
                alt="preplord logo"
              />
            </Link>
          </div>

          <div className="flex lg:hidden">
            <button
              type="button"
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(true)}
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <Popover.Group className="hidden lg:flex lg:gap-x-12">
            <Link
              href="/"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Home
            </Link>
            <Popover className="relative">
              <Popover.Button className="flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                <Link href={`exams/${"upsc"}`}></Link>
                Exams
                <ChevronDownIcon
                  className="h-5 w-5 flex-none text-gray-400"
                  aria-hidden="true"
                />
              </Popover.Button>

              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute -left-8 top-full z-10 mt-3 w-screen max-w-md overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-gray-900/5">
                  <div className="p-4">
                    {exams?.map((item: examList) => (
                      <div
                        key={item.name}
                        className="group relative flex items-center gap-x-6 rounded-lg p-3 text-sm leading-6 hover:bg-gray-50"
                      >
                        <div className="flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                          <BookOpenIcon
                            className="h-6 w-6 text-gray-600 group-hover:text-blue-900"
                            aria-hidden="true"
                          />
                        </div>
                        <div className="flex-auto">
                          <Link
                            href={`exams/${item.name}`}
                            className="block font-semibold text-gray-900 hover:text-blue-900"
                          >
                            {item.name}
                            <span className="absolute inset-0" />
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                    {callsToAction.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-100"
                      >
                        <item.icon
                          className="h-5 w-5 flex-none text-gray-400"
                          aria-hidden="true"
                        />
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </Popover.Panel>
              </Transition>
            </Popover>

            <Link
              href="/topper-corner"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Topper Corner
            </Link>
            <Link
              href="/previous-year-papers"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Previous Year Papers
            </Link>
            <Link
              href="/mocks"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Free Mock
            </Link>
            <Link
              href="/books"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Books
            </Link>
            <Link
              href="/job-alerts"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Job Alerts
            </Link>
            <div className="flex cursor-pointer" onClick={handleOpenDrawer}>
              {/* cart icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <circle cx="9" cy="21" r="1" />
                <circle cx="20" cy="21" r="1" />
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 1.92 1.61h10.8a2 2 0 0 0 1.92-1.61L23 6H6" />
              </svg>
            </div>
          </Popover.Group>

          <div className="hidden  lg:flex lg:flex-1 lg:justify-end">
            <a
              href="#"
              className="flex flex-row items-center justify-between text-sm bg-[#205383] font-semibold leading-6 text-white p-3 rounded-lg"
              onClick={() => setopen(true)}
            >
              <UserCircleIcon className="h-5 w-7" /> Log in{" "}
              <span aria-hidden="true"></span>
            </a>
          </div>
        </nav>
        <Dialog
          as="div"
          className="lg:hidden"
          open={mobileMenuOpen}
          onClose={setMobileMenuOpen}
        >
          <div className="fixed inset-0 z-10" />
          <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">Your Company</span>
                <img
                  className="h-8 w-auto"
                  src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                  alt=""
                />
              </a>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Disclosure as="div" className="-mx-3">
                    {({ open }) => (
                      <>
                        <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                          Product
                          <ChevronDownIcon
                            className={classNames(
                              open ? "rotate-180" : "",
                              "h-5 w-5 flex-none"
                            )}
                            aria-hidden="true"
                          />
                        </Disclosure.Button>
                        <Disclosure.Panel className="mt-2 space-y-2">
                          {[...exams, ...callsToAction].map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as="a"
                              href={item.href}
                              className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Features
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Marketplace
                  </a>
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                  >
                    Company
                  </a>
                </div>

                <div className="py-6">
                  <button
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900  hover:bg-gray-50"
                    onClick={() => alert("cliekced")}
                  >
                    Log in
                  </button>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Dialog>
      </header>
    </>
  );
}
