
import { Link, routes, navigate } from '@redwoodjs/router'
import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { useTranslation } from "react-i18next"

import { useAuth } from "@redwoodjs/auth"
import type { DeleteInitiativeMutationVariables, FindCompleteInitiativeById } from 'types/graphql'
import i18next, { init } from "i18next"
import Map from "src/components/Map/Map"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleNodes, faFile } from "@fortawesome/free-solid-svg-icons"
import { useEffect, useState } from "react"
import UserCard from "src/components/User/UserCard/UserCard"
import InitiativeCard from "src/components/Initiative/InitiativeCard/InitiativeCard"

const DELETE_INITIATIVE_MUTATION = gql`
  mutation DeleteInitiativeMutation($id: Int!) {
    deleteInitiative(id: $id) {
      id
    }
  }
`

interface Props {
  initiative: NonNullable<FindCompleteInitiativeById['initiative']>
}

const TABS = [
  "resourcesMD",
  "conditionsMD",
  "evaluationMD",
  "strengthsMD",
  "transferabilityMD"
]

const Initiative = ({ initiative, similarInitiatives }: Props) => {
  const { t } = useTranslation()
  const { isAuthenticated } = useAuth();
  const [selectedTab, setSelectedTab] = useState("resourcesMD");
  const [activeTabs, setActiveTabs] = useState(TABS);
  useEffect(()=> {
    const activeTabs = TABS.filter(tab => initiative[tab])
    setSelectedTab(activeTabs[0]);
    setActiveTabs(activeTabs);
  }, [initiative])

  const [deleteInitiative] = useMutation(DELETE_INITIATIVE_MUTATION, {
    onCompleted: () => {
      toast.success('Initiative deleted')
      navigate(routes.adminInitiatives())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onDeleteClick = (id: DeleteInitiativeMutationVariables['id']) => {
    if (confirm('Are you sure you want to delete initiative ' + id + '?')) {
      deleteInitiative({ variables: { id } })
    }
  }

  return (
    <div className="container mx-auto grid min-h-screen grid-cols-6 gap-3">
      <main className="col-span-4 my-4">
        <section className="w-full rounded-md bg-base-100 text-base-content shadow-xl">
          <div className="avatar mr-2 w-full">
              <img src={ initiative.image } />
          </div>
          <div className="p-2">
            <h1 className="text-4xl mb-2">
              {initiative.title}
            </h1>
            {initiative.tags &&
              <div>
                {initiative.tags.map(tag => (<div key={tag.id} className="badge mr-1">#{tag.name}</div>))}
              </div>
            }

          </div>
          <div className="p-4">
            <p className="whitespace-pre-wrap">{initiative.descriptionMD}</p>
          </div>
          {!!initiative.resources?.length && (
          <div className="flex gap-2 p-4">
            {initiative.resources.map(resource => (
              <a key={resource.id} href={resource.url} target={`${resource.id}`}>
                <div className="text-center">
                  <FontAwesomeIcon icon={faFile} className="text-6xl"/>
                  <h3>{resource.name || resource.filename}</h3>
                </div>
              </a>
            ))}
          </div>
          )}

          {!!initiative.practices?.length && (
            <div className="p-4">
              <h2 className="mb-2 text-xl">{t('practices')}</h2>
              <div>
                {initiative.practices.map((practice) => (
                  <div className="badge-outline badge badge-lg mr-2" key={practice.id}>
                    {practice.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        <section className="mt-4 grid grid-cols-3 gap-3">

        {initiative.competences &&
          <div className="rounded-md bg-base-100  p-4 shadow-xl">
            <h1 className="text-2xl mb-4"> {t('competences')} </h1>
            <div>
              {initiative.competences.map(item => (<div key={item.id} className="">{item.name}</div>))}
            </div>
          </div>
          }

          {initiative.levels &&
          <div className="rounded-md bg-base-100  p-4 shadow-xl">
            <h1 className="text-2xl mb-4"> {t('level',{count: initiative.levels.length})} </h1>
            <div>
              {initiative.levels.map(item => (<div key={item.id} className="">{item.name}</div>))}
            </div>
          </div>
          }

          {initiative.subjects &&
          <div className="rounded-md bg-base-100  p-4 shadow-xl">
            <h1 className="text-2xl mb-4"> {t('subjects')} </h1>
            <div>
              {initiative.subjects.map(item => (<div key={item.id} className="">{item.name}</div>))}
            </div>
          </div>
          }
        </section>
        <section className="mt-4 rounded-md bg-base-100  p-4 shadow-xl">
          <h1 className="text-2xl mb-2">
            {t('more-informations')}
          </h1>



          <div className="tabs">
            {activeTabs.map(tab => (
              <a key={tab} className={`tab tab-lg tab-bordered ${tab == selectedTab && "tab-active"}`} onClick={()=> setSelectedTab(tab)}>{t(tab)}</a>
            ))}
          </div>
          <div className="p-4">
            <p className="whitespace-pre-wrap">{initiative[selectedTab]}</p>
          </div>
        </section>

        <section className="mt-4 rounded-md bg-base-100  p-4 shadow-xl">
          <h1 className="text-2xl mb-2"> {t('team')} </h1>

          <div>
            <h2 className="text-xl mb-2 font-bold"> {t('team-members')} </h2>
            <div className="grid grid-cols-2">
              <UserCard user={initiative.author} className="max-w-xl"/>
              {initiative.users.map(user => (
                <UserCard user={user} key={user.id} className="max-w-xl"/>
              ))}
            </div>
          </div>
          {initiative.outsideUsers &&
          <div>
            <h2 className="text-xl mb-2 font-bold"> {t('contacts')} </h2>
            <p className="whitespace-pre-wrap">{initiative.outsideUsers}</p>
          </div>
          }
          {!!initiative.networks?.length &&
          <div>
            <h2 className="text-xl mb-2 font-bold"> {t('network', {count: 2})} </h2>
            {initiative.networks.map(network => (
            <Link key={network.id} to={network.url}>
              <div className="text-center">
                {network.logo ? <img src={network.logo} className="w-24"/> : <FontAwesomeIcon icon={faCircleNodes} className="text-6xl"/>}
                <h3>{network.name}</h3>
              </div>
            </Link>
            ))}
          </div>
          }
        </section>

        {!!initiative.sponsors?.length &&
          <section className="mt-4 rounded-md bg-base-100  p-4 shadow-xl">
            <h1 className="text-2xl mb-2"> {t('team')} </h1>
            <div>
              <h2 className="text-xl mb-2 font-bold"> {t('sponsor', {count: 2})} </h2>
              {initiative.sponsors.map(sponsor => (
              <Link key={sponsor.id} to={sponsor.url}>
                <div className="text-center">
                {sponsor.logo ? <img src={sponsor.logo} className="w-24"/> : <FontAwesomeIcon icon={faCircleNodes} className="text-6xl"/>}
                  <h3>{sponsor.name}</h3>
                </div>
              </Link>
              ))}
            </div>
          </section>
        }
      </main>
      <aside className="col-span-2 my-4  rounded-md bg-base-100 p-4 shadow-xl">

        {isAuthenticated && (
          <section className="mb-2">
            <h1 className="mb-2 text-xl">{t('my')} {i18next.format(t('profile'), "lowercase")}</h1>
            <Link
              to={routes.adminEditInitiative({ id: initiative.id })}
              className="rw-button rw-button-blue"
            >
              Edit
            </Link>
            <button
              type="button"
              className="rw-button rw-button-red"
              onClick={() => onDeleteClick(initiative.id)}
            >
              Delete
            </button>
          </section>
        )}
        <section className="mb-2">
          <h1 className="mb-2 text-xl">{t('about-this-user')}</h1>
          <p className="text-sm">
            {t('updated-at')} {initiative.updatedAt}
          </p>
          <p className="text-sm mb-2">XX {t('views')}</p>
          <div className="btn-primary btn">{t('download')}</div>
        </section>
        <section>
          <h1 className="mb-2 text-xl">{t('initiative-shared-by')}</h1>
          <UserCard user={initiative.author} />
          {initiative.author.organization.name}
          {initiative.author.organization.logo && (
            <img src={initiative.author.organization.logo} className="mb-2 aspect-auto" />
          )}
          <Map
            markers={[initiative.author.organization]}
            zoomLevel={7}
            centerOnMarkers={true}
            className="mb-2 h-32"
          />
        </section>
        <section>
          <h1 className="mb-2 text-xl">{t('initiatives')} {t('similar')}</h1>
          {similarInitiatives?.map(initiative => (<InitiativeCard initiative={initiative} className="mb-4"/>))}
        </section>
      </aside>
    </div>
  )
}

export default Initiative
