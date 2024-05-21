import { IslandModal } from '@components/island-modal';
import { LeaderModal } from '@components/leader-modal';
// import { FirstLandingModal } from '@components/first-landing-modal';
import { Box } from '@components/speech-box';
import ThemeSongWrapper from '@components/theme-song-wrapper';
import { NextPage } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useStakedInPits } from '@hooks/useStakedInPits';
import { useState, useEffect, FormEvent } from 'react';
import { GoogleSpreadsheet } from 'google-spreadsheet';
import { auth } from 'googleapis/build/src/apis/abusiveexperiencereport';
import { JWT } from 'google-auth-library';
import { toast } from 'sonner';

// Config variables
const SPREADSHEET_ID = process.env.NEXT_PUBLIC_SPREADSHEET_ID;
const SHEET_ID = process.env.NEXT_PUBLIC_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_EMAIL;
const GOOGLE_SERVICE_PRIVATE_KEY = process.env.GOOGLE_SERVICE_PRIVATE_KEY;

const serviceAccountAuth = new JWT({
  email: GOOGLE_CLIENT_EMAIL,
  key: GOOGLE_SERVICE_PRIVATE_KEY.replace(/\\n/g, '\n'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

console.log("SPREADSHEET_ID", SPREADSHEET_ID);
console.log("SHEET_ID", SHEET_ID);
console.log("GOOGLE_CLIENT_EMAIL", GOOGLE_CLIENT_EMAIL);
console.log("GOOGLE_SERVICE_PRIVATE_KEY", GOOGLE_SERVICE_PRIVATE_KEY);

// const doc = new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth);

// console.log("doc---->>>>>", doc);

const HomePage: NextPage = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  const [showFIrstModal, setShowFirstModal] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener only on the client side
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }

    // Clean up event listener
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);

  const topPosition = windowWidth < 640 ? '2%' : '12%';

  return (
    <ThemeSongWrapper
      className={`min-h-[calc(100vh_-_80px)] w-full overflow-auto lg:min-h-[calc(100vh_-_96px)] ${
        windowWidth && windowWidth < 640
          ? "bg-[url('/static/images/new/background.png')] bg-cover"
          : "bg-[url('/static/images/new/back_walking_islands.png')] bg-[length:100%_100%] bg-center"
      } bg-no-repeat`}
    >
      {showFIrstModal && <FirstLandingModal setShowFirstModal={setShowFirstModal} />}
      <LeaderModal />
      <Link
        href="/?style=leaderboard"
        className={`absolute right-[3%] w-[50px] lg:right-[3%] lg:top-[12%] lg:w-[50px]`}
        style={{ top: topPosition }}
      >
        <Image
          src="/static/images/new/islands/leaderboard.png"
          className="shadowfilter object-contain py-3"
          alt="island boneyard"
          width={300}
          height={200}
        />
      </Link>
      <IslandModal />
      {windowWidth && windowWidth < 640 ? (
        <div className="p-6">
          <Link href="/?show=boneyard" className="grid justify-items-center">
            <Box
              className="absolute left-[14%] top-[3%] uppercase lg:top-[2.5%]"
              boxStyle="w-[70px]"
            >
              Boneyard
            </Box>
            <Image
              src="/static/images/new/islands/boneyard.gif"
              className="shadowfilter object-contain py-3"
              alt="island boneyard"
              width={300}
              height={200}
            />
            <Image
              src="/static/images/new/islands/walking-island.png"
              className="shadowfilter object-contain py-3"
              alt="walking island"
              width={50}
              height={50}
            />
          </Link>
          <Link href="/play/shop" className="grid justify-items-center">
            <Box
              className="absolute left-[14%] top-[11.5%] uppercase lg:top-[10.5%]"
              boxStyle="w-[60px]"
            >
              Shop
            </Box>
            <Image
              src="/static/images/new/islands/shop.gif"
              className="shadowfilter object-contain py-3"
              alt="island shop"
              width={300}
              height={200}
            />
            <Image
              src="/static/images/new/islands/walking-island.png"
              className="shadowfilter object-contain py-3"
              alt="walking island"
              width={50}
              height={50}
            />
          </Link>
          <Link href="/?show=school" className="grid justify-items-center">
            <Box
              className="absolute left-[14%] top-[21%] uppercase lg:top-[19.5%]"
              boxStyle="w-[60px]"
            >
              School
            </Box>
            <Image
              src="/static/images/new/islands/school.gif"
              className="shadowfilter object-contain py-3"
              alt="island school"
              width={300}
              height={200}
            />
            <Image
              src="/static/images/new/islands/walking-island.png"
              className="shadowfilter object-contain py-3"
              alt="walking island"
              width={50}
              height={50}
            />
          </Link>
          <Link href="/?show=development-grounds" className="grid justify-items-center">
            <Box
              className="absolute left-[14%] top-[30%] uppercase lg:top-[29.5%]"
              boxStyle="w-[100px]"
            >
              Development Grounds
            </Box>
            <Image
              src="/static/images/new/islands/development-grounds.gif"
              className="shadowfilter object-contain py-3"
              alt="island development-grounds"
              width={300}
              height={200}
            />
            <Image
              src="/static/images/new/islands/walking-island.png"
              className="shadowfilter object-contain py-3"
              alt="walking island"
              width={50}
              height={50}
            />
          </Link>
          <Link href="/?show=labor-grounds" className="grid justify-items-center">
            <Box
              className="absolute left-[14%] top-[41%] uppercase  lg:top-[39.5%]"
              boxStyle="w-[100px]"
            >
              Labor
              <br />
              Grounds
            </Box>
            <Image
              src="/static/images/new/islands/labor-grounds.gif"
              className="shadowfilter object-contain py-3"
              alt="island labor-grounds"
              width={300}
              height={200}
            />
            <Image
              src="/static/images/new/islands/walking-island.png"
              className="shadowfilter object-contain py-3"
              alt="walking island"
              width={50}
              height={50}
            />
          </Link>
          <Link href="/?show=caves" className="grid justify-items-center">
            <Box
              className="absolute left-[14%] top-[51.5%] uppercase lg:top-[50%]"
              boxStyle="w-[60px]"
            >
              Caves
            </Box>
            <Image
              src="/static/images/new/islands/caves.gif"
              className="shadowfilter object-contain py-3"
              alt="island caves"
              width={300}
              height={200}
            />
            <Image
              src="/static/images/new/islands/walking-island.png"
              className="shadowfilter object-contain py-3"
              alt="walking island"
              width={50}
              height={50}
            />
          </Link>
          <Link href="/?show=pits" className="grid justify-items-center">
            <Box
              className="absolute left-[14%] top-[61.5%] uppercase lg:top-[60%]"
              boxStyle="w-[60px]"
            >
              Pits
            </Box>
            <Image
              src="/static/images/new/islands/pits.gif"
              className="shadowfilter object-contain py-3"
              alt="island pits"
              width={300}
              height={200}
            />
            <Image
              src="/static/images/new/islands/walking-island.png"
              className="shadowfilter object-contain py-3"
              alt="walking island"
              width={50}
              height={50}
            />
          </Link>
          <Link href="#" className="grid justify-items-center">
            <Box
              className="absolute left-[14%] top-[70.5%] uppercase tracking-tighter"
              boxStyle="w-[120px]"
            >
              Smol Age:
              <br />
              Dawn of a new age
            </Box>
            <Image
              src="/static/images/new/islands/Multiplayer.gif"
              className="shadowfilter object-contain py-3"
              alt="island multiplayer"
              width={300}
              height={200}
            />
            <Image
              src="/static/images/new/islands/walking-island.png"
              className="shadowfilter object-contain py-3"
              alt="walking island"
              width={50}
              height={50}
            />
          </Link>
          <Link href="#" className="grid justify-items-center">
            <Box
              className="absolute left-[14%] top-[80.5%] uppercase tracking-tighter"
              boxStyle="w-[100px]"
            >
              Levelling/
              <br />
              Battling
            </Box>
            <Image
              src="/static/images/new/islands/battling-levelling.gif"
              className="shadowfilter object-contain py-3"
              alt="island battling-levelling"
              width={300}
              height={200}
            />
            <Image
              src="/static/images/new/islands/walking-island.png"
              className="shadowfilter object-contain py-3"
              alt="walking island"
              width={50}
              height={50}
            />
          </Link>
          <Link href="#" className="grid justify-items-center">
            <Image
              src="/static/images/new/islands/coming-soon-island.gif"
              className="shadowfilter object-contain py-3"
              alt="island coming-soon"
              width={300}
              height={200}
            />
          </Link>
        </div>
      ) : (
        <div className="mx-auto w-[900px] lg:w-[1300px]">
          <Link
            href="/?show=boneyard"
            className="absolute left-[12%] top-[23%] w-[150px] lg:left-[15%] lg:top-[18%] lg:w-[200px]"
          >
            <Box className="uppercase" boxStyle="w-[70px]">
              Boneyard
            </Box>
            <Image
              src="/static/images/new/islands/boneyard.gif"
              className="shadowfilter object-contain py-3"
              alt="island boneyard"
              width={300}
              height={200}
            />
          </Link>
          <Link
            href="/?show=development-grounds"
            className="absolute right-[20%] top-[15%] h-[130px] w-[100px] lg:right-[22%] lg:top-[11%] lg:h-[170px] lg:w-[180px]"
          >
            <Box className="uppercase" boxStyle="w-[100px]">
              Development Grounds
            </Box>
            <Image
              src="/static/images/new/islands/development-grounds.gif"
              className="shadowfilter object-contain py-3"
              alt="island development-grounds"
              width={300}
              height={200}
            />
          </Link>
          <Link
            href="/?show=labor-grounds"
            className="absolute left-[46%] top-[30%] h-[130px] w-[100px] lg:top-[21%] lg:h-[150px] lg:w-[180px]"
          >
            <Box className="relative uppercase" boxStyle="w-[100px]">
              Labor
              <br />
              Grounds
            </Box>
            <Image
              src="/static/images/new/islands/labor-grounds.gif"
              className="shadowfilter object-contain py-3"
              alt="island labor-grounds"
              width={300}
              height={200}
            />
          </Link>
          <Link
            href="/play/shop"
            className="absolute left-[25%] top-[47%] h-[100px] w-[100px] lg:left-[26%] lg:top-[44%] lg:h-[140px] lg:w-[200px]"
          >
            <Box className="uppercase" boxStyle="w-[60px]">
              Shop
            </Box>
            <Image
              src="/static/images/new/islands/shop.gif"
              className="shadowfilter object-contain py-3"
              alt="island shop"
              width={300}
              height={200}
            />
          </Link>
          <Link
            href="#"
            className="absolute left-[3%] top-[47%] h-[130px] w-[100px] lg:top-[45%] lg:h-[170px] lg:w-[180px]"
          >
            <Box className="uppercase" boxStyle="w-[100px]">
              Levelling/
              <br />
              Battling
            </Box>
            <Image
              src="/static/images/new/islands/battling-levelling.gif"
              className="shadowfilter object-contain py-3"
              alt="island battling-levelling"
              width={300}
              height={200}
            />
          </Link>
          <Link
            href="/?show=caves"
            className="absolute left-[68%] top-[43%] h-[100px] w-[100px] lg:left-[67%] lg:top-[39%] lg:h-[150px] lg:w-[180px]"
          >
            <Box className="uppercase" boxStyle="w-[60px]">
              Caves
            </Box>
            <Image
              src="/static/images/new/islands/caves.gif"
              className="shadowfilter object-contain py-3"
              alt="island caves"
              width={300}
              height={200}
            />
          </Link>
          <Link
            href="/?show=pits"
            className="absolute left-[47%] top-[65%] h-[115px] w-[100px] lg:top-[65%] lg:h-[150px] lg:w-[180px]"
          >
            <Box className="uppercase" boxStyle="w-[60px]">
              Pits
            </Box>
            <Image
              src="/static/images/new/islands/pits.gif"
              className="shadowfilter object-contain py-3"
              alt="island pits"
              width={300}
              height={200}
            />
          </Link>
          <Link
            href="/?show=school"
            className="absolute bottom-[16%] left-[13%] h-[115px] w-[100px] lg:bottom-[12%] lg:left-[14%] lg:h-[150px] lg:w-[180px]"
          >
            <Box className="uppercase" boxStyle="w-[60px]">
              School
            </Box>
            <Image
              src="/static/images/new/islands/school.gif"
              className="shadowfilter object-contain py-3"
              alt="island school"
              width={300}
              height={200}
            />
          </Link>
          <Link
            href="#"
            className="absolute right-[10%] top-[66%] h-[150px] w-[110px] lg:right-[10%] lg:top-[68%] lg:h-[150px] lg:w-[180px]"
          >
            <Box className="uppercase tracking-tighter" boxStyle="w-[120px]">
              Smol Age:
              <br />
              Dawn of a new age
            </Box>
            <Image
              src="/static/images/new/islands/Multiplayer.gif"
              className="shadowfilter object-contain py-3"
              alt="island multiplayer"
              width={300}
              height={200}
            />
          </Link>
          <Link
            href="#"
            className="absolute right-[3%] top-[53%] h-[150px] w-[100px] lg:right-[3%] lg:top-[45%] lg:h-[150px] lg:w-[180px]"
          >
            <Image
              src="/static/images/new/islands/coming-soon-island.gif"
              className="shadowfilter object-contain py-3"
              alt="island coming-soon"
              width={300}
              height={200}
            />
          </Link>

          {/* <Image src="/static/images/new/island.gif"
          className='object-contain'
          alt='island large'
          width={2385}
          height={1500}
        /> */}
        </div>
      )}
    </ThemeSongWrapper>
  );
};

interface ModalProps {
  setShowFirstModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const FirstLandingModal: React.FC<ModalProps> = ({ setShowFirstModal }) => {
  const [windowWidth, setWindowWidth] = useState(0);

  const [doc, setDoc] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Add event listener only on the client side
    if (typeof window !== 'undefined') {
      setWindowWidth(window.innerWidth);
      window.addEventListener('resize', handleResize);
    }

    setDoc(new GoogleSpreadsheet(SPREADSHEET_ID, serviceAccountAuth));

    // Clean up event listener
    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('resize', handleResize);
      }
    };
  }, []);
  // Define your modal component JSX here

  const [form, setForm] = useState({
    userNumber: '',
    ethereumWallet: '',
    emailAddress: '',
  });

  const appendSpreadsheet = async (row) => {
    try {
      console.log("appendSpreadsheet HERE!!!");
      await doc.loadInfo();
      console.log("doc=>>>>>>>>>", doc);
      const sheet = doc.sheetsById[SHEET_ID];
      console.log("sheet!!!", sheet);

      if (!sheet) {
        toast.error(`Sheet with ID ${SHEET_ID} not found.`);
        throw new Error(`Sheet with ID ${SHEET_ID} not found.`);
      }

      const rows = await sheet.getRows();
      console.log("rows---->>>>>>", rows);


      if (!rows) {
        toast.error('Rows not loaded correctly.');
        throw new Error('Rows not loaded correctly.');
      }

      // Check if ethereumWallet and emailAddress already exist
      const existingRow = rows.find((existingRow) => existingRow._rawData[2] === row.EmailAddress);
      console.log('&&&&&&&&&', existingRow);

      if (existingRow) {
        // If exists, update the existing row
        existingRow._rawData[1] = row.EthereumWallet;
        await existingRow.save();
        toast.success('Data updated successfully!');
      } else {
        // If not exists, add a new row
        row.UserNumber = rows.length + 1; // Increment UserNumber
        await sheet.addRow(row);
        toast.success('Data added successfully!');
      }
      setShowFirstModal(false);
    } catch (e) {
      console.error('Error: ', e);
    }
  };

  const submitForm = async (e) => {
    e.preventDefault();

    if (form.ethereumWallet !== '' && form.emailAddress !== '') {
      // Data add for append
      const newRow = {
        UserNumber: form.userNumber,
        EthereumWallet: form.ethereumWallet,
        EmailAddress: form.emailAddress,
      };
      await appendSpreadsheet(newRow);
    } else {
      toast.info('Please ensure that all fields are filled out.');
    }
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div
      className="fixed left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-black bg-opacity-50"
      onClick={() => setShowFirstModal(false)}
    >
      {windowWidth && windowWidth < 640 ? (
        <div
          className="w-[70%] rounded object-contain shadow-none"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src="/static/images/new/email-signup-page.png"
            width={100}
            height={100}
            alt="leader"
            className="aspect-auto w-full rounded-t-lg"
          />
          <div className="top-[26%] z-10 w-full bg-[#a5c5ea] p-3 text-center">
            <span className="text-[30px] font-semibold uppercase text-black">
              Get a free skin & 1000 $bones
            </span>
            <p className="text-black">
              Sign up with your wallet and/or email to receive a free in-game skin. Wallets will
              receive 1000 $bones to begin their journey through Neanderra!
            </p>
            <div className="flex w-full">
              <div className="relative mt-2 w-full rounded-lg">
                <form className="space-y-4 py-4" onSubmit={submitForm}>
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Wallet Address"
                      name="ethereumWallet"
                      id="ethereumWallet"
                      onChange={handleChange}
                      className="block w-full rounded-lg border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></input>
                    <div className="absolute inset-y-0 end-2 flex items-center">
                      <Image
                        src="/static/images/new/metamask.svg"
                        width={30}
                        height={30}
                        alt="metamask"
                        className="inline aspect-auto border-l-2 pl-2"
                      />
                    </div>
                  </div>
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Email Address"
                      name="emailAddress"
                      id="emailAddress"
                      onChange={handleChange}
                      className="block w-full rounded-lg border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></input>
                    <div className="absolute inset-y-0 end-2 flex items-center">
                      <Image
                        src="/static/images/new/gmail.svg"
                        width={30}
                        height={30}
                        alt="gmail"
                        className="inline aspect-auto border-l-2 pl-2"
                      />
                    </div>
                  </div>
                  <div className="relative w-full">
                    <button
                      type="submit"
                      className="rounded-xl bg-background-light px-4 py-1 text-lg text-white"
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="flex w-full space-x-8 rounded-b-lg bg-[#a5c5ea] object-contain p-20 text-center">
            <Image
              src="/static/images/new/Free-Skin.png"
              width={100}
              height={100}
              alt="leader"
              className="shadowicon aspect-auto w-[20%] flex-1 rounded-t-lg"
            />
            <Image
              src="/static/images/new/Bones.png"
              width={100}
              height={100}
              alt="leader"
              className="shadowicon aspect-auto h-[10%] w-[20%] flex-1 self-center rounded-t-lg"
            />
          </div>
        </div>
      ) : (
        <div
          className="h-[600px] rounded object-contain shadow-none lg:w-[800px]"
          onClick={(e) => e.stopPropagation()}
        >
          <Image
            src="/static/images/new/Popup.png"
            width={100}
            height={100}
            alt="leader"
            className="aspect-auto h-full w-full rounded-lg"
          />
          <div className="absolute left-[42%] top-[26%] z-10 w-[400px] text-center md:left-[45%] lg:left-[47.5%]">
            <span className="text-[30px] font-semibold uppercase text-black lg:text-[40px]">
              Get a free skin & 1000 $bones
            </span>
            <p className="text-black">
              Sign up with your wallet and/or email to receive a free in-game skin. Wallets will
              receive 1000 $bones to begin their journey through Neanderra!
            </p>
            <div className="flex w-full">
              <div className="relative mt-2 w-full rounded-lg">
                <form className="space-y-4 py-4" onSubmit={submitForm}>
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Wallet Address"
                      name="ethereumWallet"
                      id="ethereumWallet"
                      onChange={handleChange}
                      className="block w-full rounded-lg border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></input>
                    <div className="absolute inset-y-0 end-2 flex items-center">
                      <Image
                        src="/static/images/new/metamask.svg"
                        width={30}
                        height={30}
                        alt="metamask"
                        className="inline aspect-auto border-l-2 pl-2"
                      />
                    </div>
                  </div>
                  <div className="relative w-full">
                    <input
                      type="text"
                      placeholder="Email Address"
                      name="emailAddress"
                      id="emailAddress"
                      onChange={handleChange}
                      className="block w-full rounded-lg border-0 py-1.5 pl-2 pr-2 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    ></input>
                    <div className="absolute inset-y-0 end-2 flex items-center">
                      <Image
                        src="/static/images/new/gmail.svg"
                        width={30}
                        height={30}
                        alt="gmail"
                        className="inline aspect-auto border-l-2 pl-2"
                      />
                    </div>
                  </div>
                  <div className="relative w-full">
                    <button
                      type="submit"
                      className="rounded-xl bg-background-light px-4 py-1 text-lg text-white"
                    >
                      SUBMIT
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
          <div className="absolute left-[55%] top-[65%] z-10 flex w-[220px] space-x-12 text-center md:left-[55%] lg:left-[52.5%]">
            <Image
              src="/static/images/new/Free-Skin.png"
              width={100}
              height={100}
              alt="leader"
              className="shadowicon aspect-auto w-[20%] flex-1 rounded-t-lg"
            />
            <Image
              src="/static/images/new/Bones.png"
              width={100}
              height={100}
              alt="leader"
              className="shadowicon aspect-auto h-[10%] w-[20%] flex-1 self-center rounded-t-lg"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
