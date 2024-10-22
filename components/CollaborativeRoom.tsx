'use client';

import { ClientSideSuspense, RoomProvider } from '@liveblocks/react/suspense';
import { Editor } from '@/components/ui/editor/Editor';
import { SignInButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs';
import Header from '@/components/Header';
import ActiveCollaborators from './ActiveCollaborators';
import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Input } from './ui/input';
import Image from 'next/image';
import { updateDocument } from '@/lib/actions/room.actions';
import Loader from './Loader';

const CollaborativeRoom = ({
  roomId,
  roomMetadata,
  currentUserType
}: CollaborativeRoomProps) => {
  const [editing, isEditing] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [documentTitle, setDocumentTitle] = useState<string>(
    roomMetadata.title
  );

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  async function updateTitleHandler(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      setIsLoading(true);
      try {
        if (documentTitle !== roomMetadata.title) {
          const updatedDocument = await updateDocument(roomId, documentTitle);
          if (updatedDocument) {
            setDocumentTitle(updatedDocument.metadata.title);
            setIsLoading(false);
          }
        }
      } catch (error) {
        console.error(error);
      }
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        isEditing(false);
        updateDocument(roomId, documentTitle);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [documentTitle, roomId]);

  useEffect(() => {
    if (editing) {
      inputRef.current?.focus();
    }
  }, [editing]);
  return (
    <RoomProvider id={roomId}>
      <ClientSideSuspense fallback={<Loader />}>
        <div className="collaborative-room">
          <Header>
            <div
              ref={containerRef}
              className="flex w-fit items-center justify-center gap-2"
            >
              {editing && !isLoading ? (
                <Input
                  type="text"
                  value={documentTitle}
                  ref={inputRef}
                  placeholder="Enter title"
                  onChange={(e) => setDocumentTitle(e.target.value)}
                  onKeyDown={updateTitleHandler}
                  disabled={!editing}
                  className="document-title-input"
                />
              ) : (
                <>
                  <p>{documentTitle}</p>
                </>
              )}
              {currentUserType === 'editor' && !editing ? (
                <Image
                  src="/assets/icons/edit.svg"
                  alt="edit"
                  width={24}
                  height={24}
                  onClick={() => isEditing(true)}
                  className="pointer"
                />
              ) : (
                <p className="view-only-tag">View only</p>
              )}

              {isLoading && <p className="text-sm text-gray-400">saving...</p>}
              <p className="document-title">share</p>
            </div>
            <div className="flex w-full flex-1 justify-end gap-2 sm:gap-3">
              <ActiveCollaborators />
              <SignedOut>
                <SignInButton />
              </SignedOut>
              <SignedIn>
                <UserButton />
              </SignedIn>
            </div>
          </Header>
          <Editor />
        </div>
      </ClientSideSuspense>
    </RoomProvider>
  );
};

export default CollaborativeRoom;
