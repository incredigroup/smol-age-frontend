import { ContractContext } from '@context/contract-context';
import { NFTObject, Stake } from '@model/model';
import { utils } from 'ethers';
import Image from 'next/image';
import { useContext, useState } from 'react';
import BonesModal from './BonesModal';

const SchoolModal = ({ closeModal }) => {
  const { nfts } = useContext(ContractContext);
  const [bonesModalOn, setBonesModalOn] = useState(false);
  const [nft, setNft] = useState<NFTObject>();

  const getDailyRate = (stakes: Stake[]) => {
    const amount = stakes.reduce((acc: number, stake: Stake) => (acc += stake.amountStaked), 0);
    return ((amount / 1000) * 0.1).toFixed(1);
  };

  const calcCommenSenseEarned = (nft: NFTObject) => {
    const now = new Date();

    const amount = nft?.stakes?.reduce((acc: number, stake: Stake) => {
      const daysStaked = Math.round(
        (now.getTime() - stake.startTime.getTime()) / (1000 * 60 * 60 * 24),
      );
      acc += (stake.amountStaked / 1000) * 0.1 * daysStaked;
      return acc;
    }, 0);

    return utils.formatUnits(parseFloat(amount ?? 0 + nft.commonSense).toFixed(0), 9);
  };

  const renderNfts = () => {
    return nfts
      ?.filter((n) => n.staked)
      .sort((a, b) => a.amountStaked - b.amountStaked)
      .reverse()
      .map((nft: NFTObject) => (
        <div
          key={nft.id.toString()}
          className="w-1/8 m:w-48 mb-2 flex flex-col items-center p-1 font-mono"
        >
          <Image src={nft.image} width={128} height={128} alt={nft.id.toString()} />
          <p className="mb-2 mt-2 text-[10px] font-bold text-white">#{nft.id.toString()}</p>
          <p className="mb-2 mt-2 text-[10px] font-bold text-white">
            Bones Carrying: {nft.amountStaked ?? '0'}
          </p>
          <p className="mb-2 mt-2 text-[10px] font-bold text-white">
            Daily Rate: {nft.stakes ? <>{getDailyRate(nft.stakes)}</> : '0'}
          </p>
          <p className="mb-2 mt-2 text-[10px] font-bold text-white">
            Common Sense: {calcCommenSenseEarned(nft)}
          </p>
          <button
            className="yellow-background pixel-button h-16 p-2 font-mono text-xs text-white md:grow"
            onClick={() => handleOnClick(nft)}
          >
            Add/Remove $BONES
          </button>
        </div>
      ));
  };

  const handleOnClick = (nft) => {
    setBonesModalOn(true);
    setNft(nft);
  };

  return (
    <div
      aria-hidden="true"
      className="hide-scrollbars hide-scrollbars fixed z-50 h-full w-full overflow-y-auto overflow-x-hidden md:inset-0"
    >
      <div className="relative mx-auto h-full w-full p-4 md:p-20">
        <div className="border-yellow relative border-2 bg-[#24261F]/[.97] py-10">
          <div className="mt-4 flex flex-col items-center">
            <h3 className="text-l mb-2 font-mono text-sm font-semibold text-white md:text-lg">
              Common Sense School
            </h3>
            <hr />
            <button onClick={closeModal} className="yellow-text absolute right-5 top-2 text-4xl">
              X
            </button>
            <div className="border-yellow w-80 border-2" />
          </div>
          <div className="p-4 font-mono text-sm text-white md:px-20 md:pt-12">
            Add your $BONES to your staked Neandersmols to develop their Common Sense. 1000 $BONES
            paired with your Neandersmol will earn it .1 Common Sense Points per day.
          </div>
          <div className="hide-scrollbars flex max-h-56 flex-wrap justify-center overflow-scroll md:grid md:max-h-96	md:grid-cols-3 md:flex-nowrap md:px-20">
            {renderNfts()}
          </div>
        </div>
      </div>

      {bonesModalOn && <BonesModal setModalOn={setBonesModalOn} nft={nft} setNft={setNft} />}
    </div>
  );
};

export default SchoolModal;
