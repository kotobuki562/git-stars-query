import React, { Fragment, VFC } from "react";
import { FaCheck } from "react-icons/fa";
import { HiSelector } from "react-icons/hi";
import { Listbox, Transition } from "@headlessui/react";

type SelectInfo = {
  value: {
    id: number;
    name: string;
    unavailable: boolean;
  };
  onChange: any;
  languages: any[];
};

export const Select: VFC<SelectInfo> = ({ value, onChange, languages }) => {
  return (
    <Listbox value={value} onChange={onChange}>
      {({ open }) => (
        <div className="relative mt-1">
          <Listbox.Button className="relative w-full py-2 pl-3 pr-10 text-left bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
            <span className="block truncate">{value.name}</span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <HiSelector
                className="w-5 h-5 text-gray-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              static
              className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
            >
              {languages.map((person, personIdx) => (
                <Listbox.Option
                  key={personIdx}
                  className={({ active }) =>
                    `${
                      active
                        ? `text-${person.name} bg-amber-100`
                        : `text-${person.name}`
                    }
                          cursor-default select-none relative py-2 pl-10 pr-4`
                  }
                  value={person}
                >
                  {({ selected, active }) => (
                    <>
                      <span
                        className={`${
                          selected
                            ? `font-medium text-${person.name}`
                            : `font-normal text-${person.name}`
                        } block truncate`}
                      >
                        {person.name}
                      </span>
                      {selected ? (
                        <span
                          className={`${
                            active
                              ? `text-${person.name}`
                              : `text-${person.name}`
                          }
                                absolute inset-y-0 left-0 flex items-center pl-3`}
                        >
                          <FaCheck className="w-5 h-5" aria-hidden="true" />
                        </span>
                      ) : null}
                    </>
                  )}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};
