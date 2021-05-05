import { Menu, Transition } from "@headlessui/react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { Fragment, VFC } from "react";
import { GiRoundStar } from "react-icons/gi";
import { AiOutlineLink } from "react-icons/ai";
import { HiExternalLink } from "react-icons/hi";
import { FaRegUser } from "react-icons/fa";

type ListInfo = {
  account: string | null;
  document: string | null;
  link?: string | null;
};

export const ListItems: VFC<ListInfo> = ({ account, document, link }) => {
  return (
    <Menu as="div" className="relative inline-block text-left">
      {({ open }) => (
        <>
          <div>
            <Menu.Button className="rounded-full hover:bg-teal-100 transition duration-200 p-1 focus:outline-none">
              <BsThreeDotsVertical className="text-xl text-teal-600" />
            </Menu.Button>
          </div>
          <Transition
            show={open}
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items
              static
              className="absolute flex flex-col right-0 w-40 p-2 origin-top-right bg-white divide-y divide-gray-100 rounded-md border-2 border-teal-400 shadow-lg focus:outline-none"
            >
              <Menu.Item>
                {({ active }) => (
                  <div className="py-1">
                    <a
                      className={`flex items-center ${
                        active && "text-teal-500"
                      }`}
                      href={account}
                    >
                      <FaRegUser className="mr-2 text-lg" />
                      Account
                    </a>
                  </div>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <div className="py-1">
                    <a
                      className={`flex items-center ${
                        active && "text-teal-500"
                      }`}
                      href={document}
                    >
                      <HiExternalLink className="mr-2 text-lg" />
                      Document
                    </a>
                  </div>
                )}
              </Menu.Item>
              {link ? (
                <Menu.Item>
                  {({ active }) => (
                    <div className="py-1">
                      <a
                        className={`flex items-center ${
                          active && "text-teal-500"
                        }`}
                        href={link}
                      >
                        <AiOutlineLink className="mr-2 text-lg" />
                        Link
                      </a>
                    </div>
                  )}
                </Menu.Item>
              ) : null}
            </Menu.Items>
          </Transition>
        </>
      )}
    </Menu>
  );
};
