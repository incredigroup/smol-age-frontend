import { cn } from '@/lib/utils';
import { Tab } from '@headlessui/react';
import Image from 'next/image';
import Link from 'next/link';
import { MyStakes } from './MyStakes';
import { Stake } from './Stake';

const tabs = [
  { name: 'Stake', component: <Stake /> },
  { name: 'My Stakes', component: <MyStakes /> },
];

export const CavesComponent = () => {
  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-6 pt-[140px] max-md:relative sm:px-8">
      <div className="relative w-full rounded-2xl bg-black/40 p-4 pb-4 sm:p-6">
        <Link href="/phase2">
          <Image
            src="/static/images/back.png"
            height={200}
            width={200}
            alt="Back Button"
            className="absolute left-[-20px] top-1/2 w-[60px] -translate-y-1/2"
          />
        </Link>
        <Tab.Group>
          <Tab.List className="flex justify-center space-x-6 p-1">
            {tabs.map((tab) => (
              <Tab
                key={tab.name}
                className={({ selected }) =>
                  cn(
                    'btn w-[150px] rounded-xl',
                    selected
                      ? 'border-smol-brown bg-smol-brown-alternative outline-none'
                      : 'bg-smol-brown',
                  )
                }
              >
                {tab.name}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panels className="mt-2">
            {tabs.map((tab, idx) => (
              <Tab.Panel key={idx} className="p-3 pb-0">
                {tab.component}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};
