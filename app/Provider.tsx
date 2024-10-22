'use client';

import Loader from '@/components/Loader';
import { getClerkUsers } from '@/lib/actions/user.actions';
import {
  LiveblocksProvider,
  ClientSideSuspense
} from '@liveblocks/react/suspense';
const Provider = ({ children }: { children: React.ReactNode }) => {
  return (
    <LiveblocksProvider
      authEndpoint="/api/liveblocks-auth"
      resolveUsers={async ({ userIds }) => {
        return await getClerkUsers({ userIds });
      }}
    >
      <ClientSideSuspense fallback={<Loader />}>{children}</ClientSideSuspense>
    </LiveblocksProvider>
  );
};

export default Provider;
