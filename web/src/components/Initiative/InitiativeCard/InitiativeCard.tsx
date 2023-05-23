import { faImage } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Link, routes } from "@redwoodjs/router"

const InitiativeCard = ({initiative, className}) => {
  return (
    <Link to={routes.showInitiative({id:initiative.id})}>
      <div className={`w-full rounded-md bg-base-200 text-base-content transition hover:bg-base-300 active:scale-95 ${className}`}>
        <div className="mr-2 w-full">
        {initiative.image
        ? <img src={ initiative.image } />
        : <div className="h-32 bg-base-300 w-full flex justify-center items-center">
          <FontAwesomeIcon icon={faImage} className="text-8xl text-base-100"/></div>}
        </div>
        <div className="p-4">
          <h1 className="text-xl mb-2">
            {initiative.title}
          </h1>
          {initiative.tags &&
            <div>
              {initiative.tags.map(tag => (<div key={tag.id} className="badge mr-1">#{tag.name}</div>))}
            </div>
          }
        </div>
      </div>
    </Link>
  )
}

export default InitiativeCard
