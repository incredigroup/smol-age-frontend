import { FaDiscord } from 'react-icons/fa';
import Twitter from './icons/twitter';

const Socials = () => (
  <div className="flex gap-3 md:px-6">
    <a
      className="flex items-center gap-2 text-white"
      href="https://discord.gg/8nsF6KbKK7"
      target="_blank"
      rel="noreferrer noopener"
    >
      <FaDiscord color="white" size="30px" className="hover:fill-gray-300" />
    </a>
    <a
      className="flex items-center gap-2 text-white"
      href="https://twitter.com/SmolAge_NFT"
      target="_blank"
      rel="noreferrer noopener"
    >
      <Twitter className="w-[34px] font-bold text-white hover:fill-gray-300" />
    </a>
  </div>
);

export default Socials;
