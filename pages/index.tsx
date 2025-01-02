import Head from 'next/head';
import Image from 'next/image';
import { GetServerSideProps } from 'next';
import bokeh2 from '../public/pfm-bokeh-2.jpg';
import Hero from '../components/Landing/Hero';
import UserSection from '../components/Landing/UserSection';
import HostSection from '../components/Landing/HostSection';
import { Host } from '../components/hooks/useHost';

interface IndexProps {
  hosts: Host[];
  error?: string;
}

export default function Index({ hosts, error }: IndexProps) {
  return (
    <div>
      <Head>
        <title>PlebFM</title>
      </Head>

      <div className="fixed w-full h-full bg-black top-0 left-0">
        <Image
          src={bokeh2}
          alt="xl"
          width="100"
          className="object-cover w-full h-full blur-2xl opacity-10"
        />
      </div>

      <div className="relative z-50 max-w-2xl mx-auto p-8 text-white">
        <Hero />
        <div className="flex flex-col md:flex-row gap-8 mt-8">
          <UserSection hosts={hosts} error={error} />
          <HostSection />
        </div>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<IndexProps> = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/hosts`,
    );
    const data = await response.json();

    if (!data.success) {
      throw new Error(data.error || 'Failed to fetch hosts');
    }

    return {
      props: {
        hosts: data.hosts,
      },
    };
  } catch (err) {
    return {
      props: {
        hosts: [],
        error: err instanceof Error ? err.message : 'Failed to fetch hosts',
      },
    };
  }
};
