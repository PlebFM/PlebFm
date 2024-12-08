import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Song } from '../../models/Song';

const getUserProfileFromLocal = () => {
  const userProfileJSON = localStorage.getItem('userProfile');
  if (userProfileJSON) {
    return JSON.parse(userProfileJSON);
  }
};

export const usePayment = (
  song: Song,
  totalBid: number,
  onPaid: () => void,
) => {
  const [loading, setLoading] = useState(false);
  const [bolt11, setBolt11] = useState({ hash: '', paymentRequest: '' });
  const [isPolling, setIsPolling] = useState(false);
  const pathname = usePathname();

  const getPaidStatus = useCallback(async () => {
    const hostId = pathname?.substring(1); // /atl -> atl
    const user = getUserProfileFromLocal();
    const url = `/api/invoice?hash=${bolt11.hash}&hostId=${hostId}&songId=${song.id}&bidAmount=${totalBid}&userId=${user.userId}&shortName=${hostId}`;
    const response = await fetch(url);
    const data = await response.json();
    if (data.settled === true) {
      console.log('PAID');
      onPaid();
      setIsPolling(false);
    }
    return data;
  }, [bolt11.hash, onPaid, pathname, song.id, totalBid]);

  const fetchBolt11 = useCallback(async () => {
    setLoading(true);
    const hostId = pathname?.substring(1) ?? 'atl'; // /atl -> atl
    const response = await fetch('/api/invoice', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        value: totalBid,
        memo: `PlebFM - ${song.name ?? 'Bid'}`,
        shortName: hostId,
      }),
    });
    const res = await response.json();
    setBolt11({
      hash: res.payment_hash,
      paymentRequest: res.payment_request,
    });
    setLoading(false);
    setIsPolling(true);
  }, [pathname, song.name, totalBid]);

  useEffect(() => {
    fetchBolt11();
  }, [fetchBolt11]);

  useEffect(() => {
    if (!isPolling) return;

    const interval = setInterval(getPaidStatus, 2000);
    return () => clearInterval(interval);
  }, [getPaidStatus, isPolling]);

  return {
    loading,
    bolt11,
  };
};
