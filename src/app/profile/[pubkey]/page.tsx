import { Avatar } from '@/components/avatar'
import { Header } from '@/components/header'
import { TabbedContentSwitcher } from '@/components/tabbed-content-switcher'
import { ToolsBoxProfile } from '@/components/tools-box-profile'
import { getEventsFromUser } from '@/functions/get-events-from-user'
import { getProfile } from '@/functions/get-profile'

export default async function Page({ params }: { params: { pubkey: string } }) {
  const { pubkey } = params

  const profile = await getProfile(pubkey)
  const eventsFromCurrentUser = await getEventsFromUser(pubkey)

  return (
    <div className="w-full min-h-screen">
      <Header title="Profile" />
      <div className="flex-1 max-w-5xl mx-auto">
        <div
          className={`w-full h-48 bg-center bg-no-repeat bg-cover`}
          style={{
            backgroundImage: `url(${profile?.banner ?? ''})`,
          }}
        ></div>
        <div className="flex items-center justify-between px-4 pt-4">
          <div className="-mt-24 w-max min-w-max">
            <Avatar alt="profile" src={profile?.picture} size="xl" />
          </div>

          <ToolsBoxProfile pubkey={pubkey} />
        </div>

        <div className="px-4 mt-2">
          <h1 className="text-gray-200 font-medium text-2xl">
            {profile?.name ?? profile?.display_name ?? 'Unknown'}
          </h1>

          <div className="flex items-center text-gray-500 text-sm">
            <span>0 seguidores</span>
            <span className="mx-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-3 w-3 text-gray-600"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 12a2 2 0 100-4 2 2 0 000 4z"
                  clipRule="evenodd"
                />
              </svg>
            </span>

            <span>0 seguindo</span>
          </div>

          <div className="mt-2">
            <p className="text-gray-200 text-sm">{profile?.about ?? ''}</p>
          </div>
        </div>

        <TabbedContentSwitcher
          totalPublications={eventsFromCurrentUser.length}
          events={eventsFromCurrentUser}
        />
      </div>

      {/* <Sidebar /> */}
    </div>
  )
}
