import { cn } from '@/lib/utils';
import { LoadingButton } from '@components/LoadingButton';
import { ContractContext } from '@context/contract-context';
import { useBonesInDevGrounds } from '@hooks/useBonesInDevGrounds';
import { DevGroundFeInfoStructOutput } from '@typechain/DevelopmentGrounds';
import { BigNumber } from 'ethers';
import { formatEther, parseEther } from 'ethers/lib/utils.js';
import { useContext } from 'react';
import { NumberInput } from './InputNumber';

interface BonesInfo {
  balance: BigNumber;
  timeStaked: BigNumber;
}

interface StakeDetailProps {
  token: DevGroundFeInfoStructOutput;
  balance: BigNumber;
  refresh: () => void;
}

export const StakeDetail: React.FC<StakeDetailProps> = ({ token, balance, refresh }) => {
  const { stakeBonesDevelopmentGrounds, unstakeSingleBonesDevelopmentGrounds, isLoading } =
    useContext(ContractContext);
  const { data, refetch: refetchBones } = useBonesInDevGrounds(token.stakedSmols);

  const unstake = async (tokenId: BigNumber, position: number) => {
    unstakeSingleBonesDevelopmentGrounds(tokenId, position).then(() => {
      refetchBones();
      refresh();
    });
  };

  const stake = async (value: number) => {
    await stakeBonesDevelopmentGrounds([token.stakedSmols], [parseEther(String(value))]);
    refetchBones();
    refresh();
    return true;
  };

  return (
    <>
      {data?.length > 0 ? (
        <>
          {data?.map((bonesInfo: BonesInfo, idx: number) => {
            const timeLeft =
              30 -
              Math.floor((Date.now() / 1000 - bonesInfo.timeStaked.toNumber()) / (60 * 60 * 24));
            const position = idx + 1;
            return (
              <tr className="border-none" key={idx}>
                <th />
                <td>
                  {idx === 0 && (
                    <div className="col-span-1 flex justify-center self-center">
                      <NumberInput
                        loading={isLoading === 'stakeBonesDevelopmentGrounds'}
                        min={0}
                        max={+parseFloat(formatEther(balance ?? '0')).toFixed(0)}
                        step={1000}
                        onClick={stake}
                      />
                    </div>
                  )}
                </td>
                <td className="whitespace-nowrap text-center text-xs">
                  LEVEL:
                  {parseFloat(formatEther(token.skillLevel).toString()).toFixed(0)}
                </td>
                <td className="whitespace-nowrap text-center text-xs">
                  {parseFloat(formatEther(bonesInfo.balance ?? '0').toString()).toFixed(0)}
                </td>
                <td className="whitespace-nowrap text-center text-xs">
                  {timeLeft > 0 ? timeLeft : 0} days
                </td>
                <td>
                  <LoadingButton
                    loading={isLoading === 'unstakeSingleBonesDevelopmentGrounds'}
                    onClick={() => unstake(token.stakedSmols, position)}
                    className={cn(
                      timeLeft > 0
                        ? 'my-1 border-black bg-red-500 opacity-0'
                        : 'border-[4px] border-smol-brown-light bg-smol-brown',
                      'btn max-w-[120px] font-bold text-white',
                    )}
                    text="Unstake"
                    disabled={timeLeft > 0}
                  >
                    Button
                  </LoadingButton>
                </td>
              </tr>
            );
          })}
        </>
      ) : (
        <tr className="border-none">
          <th />
          <td>
            <div className="col-span-1 flex justify-center self-center">
              <NumberInput
                loading={isLoading === 'stakeBonesDevelopmentGrounds'}
                min={0}
                max={+parseFloat(formatEther(balance ?? '0')).toFixed(0)}
                step={1000}
                onClick={stake}
              />
            </div>
          </td>
          <td className="whitespace-nowrap text-center text-xs">
            LEVEL:
            {parseFloat(formatEther(token.skillLevel).toString()).toFixed(0)}
          </td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      )}
    </>
  );
};
