import { cn } from '@/lib/utils';
import ClientOnly from '@components/ClientOnly';
import { Tab } from '@headlessui/react';
import { useBonesBalance } from '@hooks/useBonesBalance';
import { formatEther } from 'ethers/lib/utils.js';
import Image from 'next/image';
import Link from 'next/link';
import { MyStakes } from './MyStakes';
import { Stake } from './Stake';

const tabs = [
  { name: 'Stake', component: (props) => <Stake {...props} /> },
  { name: 'My Stakes', component: (props) => <MyStakes {...props} /> },
];

export const DevelopmentComponent = () => {
  const { bonesBalance, bonesStaked, refetchUserStake } = useBonesBalance();

  return (
    <div className="mx-auto max-w-6xl px-4 py-6 pt-[140px] max-md:relative sm:px-8">
      <div className="relative w-full bg-black/40 p-4 pb-4 sm:p-6">
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
                    'btn w-[150px]',
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
          <div className="ml-1 pt-1 text-center text-xs tracking-tight">
            <ClientOnly fallback={<p>$BONES: ... $BONES</p>}>
              $BONES: {parseFloat(formatEther(bonesBalance ?? '0')).toFixed(0)}
            </ClientOnly>
          </div>
          <Tab.Panels className="mt-2">
            {tabs.map((tab, idx) => (
              <Tab.Panel key={idx} className="p-3 pb-0">
                {tab.component({
                  bonesBalance,
                  bonesStaked,
                  refetchUserStake,
                })}
              </Tab.Panel>
            ))}
          </Tab.Panels>
        </Tab.Group>
      </div>
    </div>
  );
};
