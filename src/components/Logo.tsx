import Image from 'next/image';
import Link from 'next/link';

export const Logo = () => (
  <Link href="/" className="relative aspect-square w-20 cursor-pointer md:w-24">
    <Image
      src="/static/images/new/logo-white-skull.png"
      alt="Smol Age Logo"
      width={300}
      height={300}
    />
  </Link>
);
